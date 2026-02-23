import { inngest } from "./client";
import { Resend } from "resend";
import Subscription from "@/server/models/Subscription";
import User from "@/server/models/User";
import Member from "@/server/models/Member";

const resend = new Resend(process.env.RESEND_API_KEY)

// Helper untuk kirim Telegram
async function sendTelegram(chatId, text) {
  if (!chatId) return
  const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    })
  } catch (err) {
    console.error("Telegram send error:", err)
  }
}

export const sendSubscriptionReminder = inngest.createFunction(
  {
    id: "send-reminder-email",
    cancelOn: [
      {
        event: "app/subscription.reminder.cancel",
        match: "data.subId",
      },
    ],
  },
  { event: "app/subscription.reminder" },
  async ({ event, step }) => {
    const { subId, reminderDate } = event.data

    // 1. Tunggu sampai hari H
    await step.sleepUntil("wait-for-reminder-date", reminderDate)

    // 2. Ambil data langganan
    const sub = await step.run("fetch-subscription", async () => {
      return await Subscription.getById(subId)
    })

    if (!sub || !sub.isReminderActive) return { message: "Reminder dibatalkan oleh user" }

    // 3. Kirim Email Personalisasi (Looping)
    const emailResults = await step.run("send-email-via-resend", async () => {
      const user = await User.getUserById(sub.userId)
      const members = await Member.getBySubscriptionId(subId)
      const isFamily = sub.type === "Family"

      // Logika Biaya
      const totalPeople = 1 + (members?.length || 0)
      const pricePerPerson = Math.round(sub.pricePaid / totalPeople)

      // Gabungkan Owner + Member ke dalam satu list penerima dengan ID mereka
      const allRecipients = [
        { 
          id: user._id, 
          name: user.fullname || user.username, 
          email: user.email, 
          isOwner: true, 
          telegramChatId: user.telegramChatId 
        },
        ...members.map(m => ({ 
          id: m._id, 
          name: m.name, 
          email: m.email, 
          isOwner: false, 
          telegramChatId: m.telegramChatId 
        }))
      ]

      // Kirim email satu per satu agar sapaan "Halo" sesuai nama masing-masing
      const sendPromises = allRecipients.map(async (recipient) => {

        // --- KIRIM KE TELEGRAM JIKA CHAT ID ADA ---
        if (recipient.telegramChatId) {
          const teleText = `🔔 <b>Halo ${recipient.name}!</b>\nTagihan <b>${sub.serviceName}</b> sebesar <b>Rp ${sub.pricePaid.toLocaleString('id-ID')}</b> akan segera jatuh tempo.\n\n${recipient.isOwner ? 'Jangan lupa kumpulkan iuran!' : 'Siapkan iuran Anda!'}`
          await sendTelegram(recipient.telegramChatId, teleText)
        }

        // --- TEMPLATE EMAIL ---        
        // Tombol Telegram (Hanya muncul jika telegramChatId kosong)
        const telegramBtn = !recipient.telegramChatId 
          ? `<div style="margin-top: 20px; padding: 15px; background: #f0f9ff; border-radius: 12px; border: 1px dashed #0ea5e9; text-align: center;">
               <p style="font-size: 12px; color: #64748b; margin: 0 0 10px 0;">Ingin terima pengingat via Telegram?</p>
               <a href="https://t.me/SubTrack8_bot?start=${recipient.id}" style="background: #0088cc; color: white; padding: 8px 16px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 12px; display: inline-block;">Aktifkan Telegram</a>
             </div>` 
          : ""

        // Template List Anggota
        const membersListHtml = isFamily && members.length > 0
          ? `
          <div style="margin-top: 15px; border-top: 1px dashed #e2e8f0; padding-top: 15px;">
            <p style="margin: 0 0 10px 0; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: bold;">Anggota & Estimasi Iuran:</p>
            <div style="background: #ffffff; border-radius: 8px; border: 1px solid #f1f5f9;">
              ${members.map(m => `
                <div style="padding: 10px; border-bottom: 1px solid #f1f5f9;">
                  <table style="width: 100%;">
                    <tr>
                      <td style="font-size: 14px; color: #1e293b; text-align: left;">${m.name}</td>
                      <td style="font-size: 13px; color: #0ea5e9; font-weight: bold; text-align: right;">Rp ${pricePerPerson.toLocaleString('id-ID')}</td>
                    </tr>
                  </table>
                </div>
              `).join('')}
              <div style="padding: 10px; background: #fdf2f8; border-radius: 0 0 8px 8px;">
                <table style="width: 100%;">
                  <tr>
                    <td style="font-size: 14px; color: #1e293b; font-weight: bold; text-align: left;">${user.fullname || user.username} (Owner)</td>
                    <td style="font-size: 13px; color: #db2777; font-weight: bold; text-align: right;">Rp ${pricePerPerson.toLocaleString('id-ID')}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>`
          : ""

        const htmlContent = `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 24px; color: #1e293b;">
            
            <div style="text-align: center; margin-bottom: 24px;">
              <img src="https://muhammaddheovani.web.id/logo/logo.png" alt="SubTrack8 Logo" style="height: 40px; margin-bottom: 8px;" />
              <h1 style="font-size: 20px; margin: 0; color: #1e293b;">SubTrack8</h1>
            </div>

            <div style="text-align: center; margin-bottom: 24px;">
              <span style="background: ${isFamily ? '#8b5cf6' : '#0ea5e9'}; color: white; padding: 6px 16px; border-radius: 100px; font-size: 11px; font-weight: 800; text-transform: uppercase;">
                ${isFamily ? '👨‍👩‍👧‍👦 Family Plan' : '👤 Individual Plan'}
              </span>
            </div>

            <h2 style="color: #1e293b; text-align: center;">Halo, ${recipient.name}!</h2>
            <p style="text-align: center; color: #64748b;">Pengingat untuk langganan <strong>${sub.serviceName}</strong>.</p>
            
            <div style="background: #f8fafc; padding: 24px; border-radius: 16px; margin-bottom: 24px; border: 1px solid #f1f5f9;">
              <table style="width: 100%;">
                <tr>
                  <td style="color: #94a3b8; font-size: 13px;">Total Tagihan</td>
                  <td style="text-align: right; font-weight: 800; color: #1e293b;">Rp ${sub.pricePaid.toLocaleString('id-ID')}</td>
                </tr>
                <tr>
                  <td style="color: #94a3b8; font-size: 13px;">Jatuh Tempo</td>
                  <td style="text-align: right; font-weight: bold; color: #64748b;">${sub.billingDate}</td>
                </tr>
              </table>
              ${membersListHtml}
            </div>

            <div style="background: ${isFamily ? '#f5f3ff' : '#f0f9ff'}; padding: 16px; border-radius: 12px; border-left: 4px solid ${isFamily ? '#8b5cf6' : '#0ea5e9'};">
              <p style="font-size: 14px; margin: 0;">
                <strong>Info:</strong> ${recipient.isOwner
                  ? `Jangan lupa kumpulkan iuran dari anggota sebesar <b>Rp ${pricePerPerson.toLocaleString('id-ID')}</b>.`
                  : `Silahkan siapkan iuran Anda sebesar <b>Rp ${pricePerPerson.toLocaleString('id-ID')}</b> untuk diberikan kepada ${user.fullname || user.username}.`
                }
              </p>
            </div>

            ${telegramBtn}

            <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #f1f5f9;">
              <p style="font-size: 11px; color: #94a3b8; margin: 0;">
                Email ini dikirim secara otomatis dari website <a href="https://subtrack8.com" style="color: #0ea5e9; text-decoration: none;">subtrack8.com</a>.
              </p>
            </div>
          </div>`

        if (recipient.email) {
          return resend.emails.send({
            from: 'SubTrack8 <notifications@muhammaddheovani.web.id>',
            to: recipient.email,
            subject: `🔔 Tagihan ${sub.serviceName} - Rp ${sub.pricePaid.toLocaleString('id-ID')}`,
            html: htmlContent
          })
        }
      })

      return await Promise.all(sendPromises)
    })

    // 4. JADWALKAN UNTUK BULAN BERIKUTNYA
    await step.run("schedule-next-month", async () => {
      const current = new Date(reminderDate)
      const cycle = sub.billingCycle || 1
      const nextMonth = new Date(current.setMonth(current.getMonth() + cycle))
      const nextDateStr = nextMonth.toISOString().split('T')[0]

      await Subscription.update(subId, sub.userId, { reminderDate: nextDateStr })

      await inngest.send({
        name: "app/subscription.reminder",
        data: { subId, reminderDate: nextDateStr }
      })
    })

    return { success: true, count: emailResults.length }
  }
)

// Fungsi pembatalan
export const cancelSubscriptionReminder = inngest.createFunction(
  { id: "cancel-reminder" },
  { event: "app/subscription.reminder.cancel" },
  async ({ event }) => {
    const { subId } = event.data
    console.log(`Canceling reminder for subscription: ${subId}`)
    return { message: "Reminder cancellation triggered", subId }
  }
)