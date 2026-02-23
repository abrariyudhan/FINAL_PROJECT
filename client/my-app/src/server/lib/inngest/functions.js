import { inngest } from "./client";
import { Resend } from "resend";
import Subscription from "@/server/models/Subscription";
import User from "@/server/models/User";
import Member from "@/server/models/Member";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    await step.sleepUntil("wait-for-reminder-date", reminderDate)

    const sub = await step.run("fetch-subscription", async () => {
      return await Subscription.getById(subId)
    })

    if (!sub || !sub.isReminderActive) return { message: "Reminder dibatalkan oleh user" }

    const emailResult = await step.run("send-email-via-resend", async () => {
      const user = await User.getUserById(sub.userId)
      const members = await Member.getBySubscriptionId(subId)
      
      const memberEmails = members.filter(m => m.email).map(m => m.email)
      const recipients = [user.email, ...memberEmails]

      const isFamily = sub.type === "Family"
      
      const membersListHtml = isFamily && members.length > 0
        ? `
          <div style="margin-top: 15px; border-top: 1px dashed #e2e8f0; pt-15px;">
            <p style="margin: 10px 0 5px 0; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: bold;">Anggota Keluarga:</p>
            <ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 14px;">
              ${members.map(m => `<li>${m.name} ${m.email ? `<span style="color: #94a3b8; font-size: 12px;">(${m.email})</span>` : ''}</li>`).join('')}
            </ul>
          </div>
        `
        : ""

      const htmlContent = `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <span style="background: ${isFamily ? '#8b5cf6' : '#0ea5e9'}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 10px; font-weight: bold; text-transform: uppercase;">
              ${isFamily ? 'Family Plan' : 'Individual Plan'}
            </span>
          </div>

          <h2 style="color: #1e293b; text-align: center;">Halo, ${user.fullname || user.username}!</h2>
          <p style="text-align: center; color: #64748b;">Waktunya bersiap! Tagihan layanan Anda akan segera jatuh tempo.</p>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #f1f5f9;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="color: #94a3b8; font-size: 13px; padding-bottom: 5px;">Layanan</td>
                <td style="text-align: right; font-weight: bold; color: #1e293b;">${sub.serviceName}</td>
              </tr>
              <tr>
                <td style="color: #94a3b8; font-size: 13px; padding-bottom: 5px;">Total Tagihan</td>
                <td style="text-align: right; font-weight: bold; color: #0ea5e9; font-size: 18px;">Rp ${sub.pricePaid.toLocaleString('id-ID')}</td>
              </tr>
              <tr>
                <td style="color: #94a3b8; font-size: 13px;">Tanggal Billing</td>
                <td style="text-align: right; font-weight: bold; color: #1e293b;">${sub.billingDate}</td>
              </tr>
            </table>

            ${membersListHtml}
          </div>

          <p style="font-size: 14px; color: #475569; line-height: 1.6;">
            ${isFamily 
              ? "Pastikan Anda sudah mengumpulkan iuran dari anggota keluarga lainnya agar pembayaran tetap lancar tepat waktu."
              : "Pastikan saldo atau metode pembayaran Anda memiliki dana yang cukup untuk menghindari pemutusan layanan."
            }
          </p>

          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background: #1e293b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px;">Buka Dashboard</a>
          </div>

          <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 30px 0;" />
          <p style="text-align: center; color: #94a3b8; font-size: 11px;">
            Ini adalah pesan otomatis dari <strong>SubScribe App</strong>. Anda menerima ini karena mengaktifkan reminder untuk layanan ${sub.serviceName}.
          </p>
        </div>
      `

      return await resend.emails.send({
        from: 'SubScribe <notifications@muhammaddheovani.web.id>',
        to: recipients,
        subject: `${isFamily ? '[Family]' : '[Personal]'} Tagihan ${sub.serviceName} segera tiba!`,
        html: htmlContent
      })
    })

    await step.run("schedule-next-month", async () => {
      const current = new Date(reminderDate);
      const cycle = sub.billingCycle || 1
      const nextMonth = new Date(current.setMonth(current.getMonth() + cycle));
      const nextDateStr = nextMonth.toISOString().split('T')[0]

      await Subscription.update(subId, sub.userId, { reminderDate: nextDateStr })

      await inngest.send({
        name: "app/subscription.reminder",
        data: { subId, reminderDate: nextDateStr }
      })
    })

    return { success: true, emailId: emailResult.id }
  }
)

export const cancelSubscriptionReminder = inngest.createFunction(
  { id: "cancel-reminder" },
  { event: "app/subscription.reminder.cancel" },
  async ({ event }) => {
    const { subId } = event.data
    console.log(`Canceling reminder for subscription: ${subId}`)
    return { message: "Reminder cancellation triggered", subId }
  }
)