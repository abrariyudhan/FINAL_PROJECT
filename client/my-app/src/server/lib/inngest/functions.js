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

// 1. FUNGSI PENGINGAT SUBSCRIPTION (RECURRING)
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
      const s = await Subscription.getById(subId)
      return JSON.parse(JSON.stringify(s))
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

      // Gabungkan Owner + Member
      const allRecipients = [
        {
          id: user._id.toString(),
          name: user.fullname || user.username,
          email: user.email,
          isOwner: true,
          telegramChatId: user.telegramChatId
        },
        ...members.map(m => ({
          id: m._id.toString(),
          name: m.name,
          email: m.email,
          isOwner: false,
          telegramChatId: m.telegramChatId
        }))
      ]

      const results = []
      for (const recipient of allRecipients) {
        // --- KIRIM KE TELEGRAM ---
        if (recipient.telegramChatId) {
          const teleText = `🔔 <b>Halo ${recipient.name}!</b>

📋 <b>Subscription:</b> ${sub.serviceName}
💰 <b>Total Billing:</b> Rp ${sub.pricePaid.toLocaleString('id-ID')}
${isFamily ? `💳 <b>Your Share:</b> Rp ${pricePerPerson.toLocaleString('id-ID')} (${totalPeople} members)` : ''}
📅 <b>Billing Date:</b> ${new Date(sub.billingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}

${recipient.isOwner ? '💡 Jangan lupa kumpulkan iuran dari member!' : '⚠️ Siapkan iuran Anda sebelum tanggal billing!'}

🔗 <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/dashboard/${sub._id}">Lihat Detail</a>`

          await sendTelegram(recipient.telegramChatId, teleText)
        }

        // --- TEMPLATE EMAIL ---
        const telegramBtn = !recipient.telegramChatId
          ? `
            <!-- Telegram CTA -->
            <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 32px; border-radius: 16px; text-align: center; border: 2px solid #bae6fd; margin-bottom: 32px;">
              <div style="background: white; width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                <span style="font-size: 30px;">📱</span>
              </div>
              <h3 style="margin: 0 0 12px 0; color: #0369a1; font-size: 18px; font-weight: 700;">Get Instant Reminders on Telegram</h3>
              <p style="margin: 0 0 24px 0; color: #0c4a6e; font-size: 14px; line-height: 1.5;">Never miss a payment! Connect your Telegram account to receive timely notifications.</p>
              <a href="https://t.me/SubTrack8_bot?start=${recipient.id}" 
                 style="display: inline-block; background: linear-gradient(135deg, #0088cc 0%, #006699 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 15px; box-shadow: 0 4px 6px -1px rgba(0, 136, 204, 0.3);">
                🚀 Connect Telegram
              </a>
            </div>
          `
          : ""

        const membersListHtml = isFamily && members.length > 0
          ? `
            <!-- Members Contribution Breakdown -->
            <div style="margin-top: 24px; padding-top: 24px; border-top: 2px dashed #e2e8f0;">
              <h3 style="margin: 0 0 16px 0; color: #475569; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">👥 Member Contributions</h3>
              <div style="background: #ffffff; border-radius: 12px; border: 2px solid #e2e8f0; overflow: hidden;">
                ${members.map((m, idx) => `
                  <div style="padding: 16px 20px; border-bottom: ${idx === members.length - 1 ? 'none' : '1px solid #f1f5f9'};">
                    <table style="width: 100%;">
                      <tr>
                        <td style="font-size: 14px; color: #1e293b; font-weight: 500; text-align: left;">
                          <span style="display: inline-block; width: 8px; height: 8px; background: #0ea5e9; border-radius: 50%; margin-right: 8px;"></span>
                          ${m.name}
                        </td>
                        <td style="font-size: 15px; color: #0ea5e9; font-weight: 700; text-align: right;">
                          Rp ${pricePerPerson.toLocaleString('id-ID')}
                        </td>
                      </tr>
                    </table>
                  </div>
                `).join('')}
                <div style="padding: 16px 20px; background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);">
                  <table style="width: 100%;">
                    <tr>
                      <td style="font-size: 14px; color: #1e293b; font-weight: 700; text-align: left;">
                        <span style="display: inline-block; width: 8px; height: 8px; background: #db2777; border-radius: 50%; margin-right: 8px;"></span>
                        ${user.fullname || user.username} (Owner)
                      </td>
                      <td style="font-size: 15px; color: #db2777; font-weight: 700; text-align: right;">
                        Rp ${pricePerPerson.toLocaleString('id-ID')}
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              <p style="margin: 16px 0 0 0; color: #64748b; font-size: 12px; text-align: center;">
                <strong>Total:</strong> ${totalPeople} members • <strong>Rp ${sub.pricePaid.toLocaleString('id-ID')}</strong>
              </p>
            </div>
          `
          : ""

        // Dashboard CTA - for all recipients
        const dashboardCTA = `
          <!-- Dashboard CTA -->
          <div style="background: linear-gradient(135deg, #fef3f2 0%, #fee2e2 100%); padding: 24px; border-radius: 16px; text-align: center; border: 2px solid #fecaca; margin-bottom: 32px;">
            <h3 style="margin: 0 0 12px 0; color: #dc2626; font-size: 18px; font-weight: 700;">📊 View Subscription Details</h3>
            <p style="margin: 0 0 24px 0; color: #991b1b; font-size: 14px; line-height: 1.5;">Check full details, payment history, and manage your subscription.</p>
            <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/dashboard/${subId}" 
               style="display: inline-block; background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 15px; box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.3);">
              🚀 Open Dashboard
            </a>
          </div>
        `

        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SubTrack8 Payment Reminder</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    
    <!-- Header with Logo -->
    <div style="background: #ffffff; padding: 40px 20px; text-align: center; border-bottom: 3px solid #0ea5e9;">
      <img src="https://i.ibb.co.com/MDPRRXHc/Sub-Track8-cropped.png" alt="SubTrack8" style="height: 50px; margin-bottom: 0;" />
    </div>

    <!-- Accent Bar -->
    <div style="background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%); height: 6px;"></div>

    <!-- Main Content -->
    <div style="padding: 40px 30px;">
      
      <!-- Alert Icon -->
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(251, 191, 36, 0.3);">
          <span style="font-size: 40px;">🔔</span>
        </div>
      </div>

      <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 24px; font-weight: 700; text-align: center;">
        Payment Reminder
      </h2>
      
      <p style="margin: 0 0 24px 0; color: #64748b; font-size: 16px; line-height: 1.6; text-align: center;">
        Hi <strong style="color: #1e293b;">${recipient.name}</strong>,
      </p>

      <p style="margin: 0 0 32px 0; color: #64748b; font-size: 15px; line-height: 1.6; text-align: center;">
        This is a reminder that your subscription for <strong style="color: #1e293b;">${sub.serviceName}</strong> will be billed soon.
      </p>

      <!-- Subscription Details Card -->
      <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 24px; margin-bottom: 32px;">
        <h3 style="margin: 0 0 16px 0; color: #475569; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">💳 Billing Information</h3>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">Service</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-weight: 600; text-align: right; font-size: 14px;">${sub.serviceName}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">Billing Date</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-weight: 600; text-align: right; font-size: 14px;">${new Date(sub.billingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; ${isFamily ? 'border-bottom: 1px solid #e2e8f0;' : ''} color: #64748b; font-size: 14px;">Total Amount</td>
            <td style="padding: 12px 0; ${isFamily ? 'border-bottom: 1px solid #e2e8f0;' : ''} color: #0ea5e9; font-weight: 700; text-align: right; font-size: 20px;">Rp ${sub.pricePaid.toLocaleString('id-ID')}</td>
          </tr>
          ${isFamily ? `
          <tr>
            <td style="padding: 12px 0; color: #64748b; font-size: 14px;">Your Share</td>
            <td style="padding: 12px 0; color: #db2777; font-weight: 700; text-align: right; font-size: 20px;">Rp ${pricePerPerson.toLocaleString('id-ID')}</td>
          </tr>
          ` : ''}
        </table>

        ${membersListHtml}
      </div>

      <!-- Action Required Notice -->
      <div style="background: ${isFamily ? 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)' : 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'}; padding: 24px; border-radius: 16px; border-left: 4px solid ${isFamily ? '#8b5cf6' : '#0ea5e9'}; margin-bottom: 32px;">
        <table style="width: 100%;">
          <tr>
            <td style="width: 40px; vertical-align: top; padding-top: 2px;">
              <span style="font-size: 24px;">${recipient.isOwner ? '💰' : '💳'}</span>
            </td>
            <td>
              <p style="margin: 0; color: ${isFamily ? '#6b21a8' : '#0c4a6e'}; font-size: 14px; line-height: 1.6;">
                <strong style="display: block; margin-bottom: 8px; font-size: 15px;">
                  ${recipient.isOwner ? 'Owner Reminder' : 'Your Contribution'}
                </strong>
                ${recipient.isOwner
            ? `Please ensure you have <strong>Rp ${pricePerPerson.toLocaleString('id-ID')}</strong> ready for the upcoming billing date. ${isFamily ? 'Don\'t forget to collect contributions from members!' : ''}`
            : `Please prepare your contribution of <strong>Rp ${pricePerPerson.toLocaleString('id-ID')}</strong> before the billing date.`
          }
              </p>
            </td>
          </tr>
        </table>
      </div>

      ${dashboardCTA}

      ${telegramBtn}

    </div>

    <!-- Footer -->
    <div style="background: #f8fafc; padding: 32px 30px; border-top: 1px solid #e2e8f0; text-align: center;">
      <p style="margin: 0 0 12px 0; color: #94a3b8; font-size: 13px;">
        You received this email because you're part of a SubTrack8 subscription group.
      </p>
      <p style="margin: 0; color: #cbd5e1; font-size: 12px;">
        © ${new Date().getFullYear()} SubTrack8. All rights reserved.
      </p>
      <div style="margin-top: 20px;">
        <a href="https://muhammaddheovani.web.id" style="color: #0ea5e9; text-decoration: none; font-size: 13px; margin: 0 12px;">Visit Website</a>
        <span style="color: #cbd5e1;">•</span>
        <a href="#" style="color: #0ea5e9; text-decoration: none; font-size: 13px; margin: 0 12px;">Help Center</a>
        <span style="color: #cbd5e1;">•</span>
        <a href="#" style="color: #0ea5e9; text-decoration: none; font-size: 13px; margin: 0 12px;">Privacy Policy</a>
      </div>
    </div>

  </div>
</body>
</html>
`

        if (recipient.email) {
          const res = await resend.emails.send({
            from: 'SubTrack8 <notifications@muhammaddheovani.web.id>',
            to: recipient.email,
            subject: `🔔 Payment Reminder: ${sub.serviceName} - Rp ${sub.pricePaid.toLocaleString('id-ID')}`,
            html: htmlContent
          })
          results.push(res)
        }
      }
      return results
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

// 2. FUNGSI WELCOME / INVITATION (SAAT DIBUAT)
export const sendWelcomeInvitation = inngest.createFunction(
  { id: "send-welcome-invitation" },
  { event: "app/subscription.created" },
  async ({ event, step }) => {
    const { subId, specificMemberId } = event.data;

    const data = await step.run("fetch-all-data", async () => {
      const s = await Subscription.getById(subId);
      const u = await User.getUserById(s.userId);
      const m = await Member.getBySubscriptionId(subId);
      return JSON.parse(JSON.stringify({ sub: s, user: u, members: m }));
    });

    const { sub, user, members } = data;
    const isFamily = sub.type === "Family";
    const totalPeople = 1 + (members?.length || 0);
    const pricePerPerson = Math.round(sub.pricePaid / totalPeople);

    await step.run("send-invitation-emails", async () => {
      let allToInvite = [
        { id: user._id.toString(), name: user.fullname || user.username, email: user.email, role: 'Owner' },
        ...members.map(m => ({ id: m._id.toString(), name: m.name, email: m.email, role: 'Member' }))
      ];

      if (specificMemberId) {
        allToInvite = allToInvite.filter(p => p.id === specificMemberId.toString());
      }

      const invitations = allToInvite.map(async (person) => {
        if (!person.email) return;

        // Member breakdown - only show if Family
        const membersListHtml = isFamily && members.length > 0
          ? `
            <!-- Members Contribution Breakdown -->
            <div style="margin-top: 24px; padding-top: 24px; border-top: 2px dashed #e2e8f0;">
              <h3 style="margin: 0 0 16px 0; color: #475569; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">👥 Member Contributions</h3>
              <div style="background: #ffffff; border-radius: 12px; border: 2px solid #e2e8f0; overflow: hidden;">
                ${members.map((m, idx) => `
                  <div style="padding: 16px 20px; border-bottom: ${idx === members.length - 1 ? 'none' : '1px solid #f1f5f9'};">
                    <table style="width: 100%;">
                      <tr>
                        <td style="font-size: 14px; color: #1e293b; font-weight: 500; text-align: left;">
                          <span style="display: inline-block; width: 8px; height: 8px; background: #0ea5e9; border-radius: 50%; margin-right: 8px;"></span>
                          ${m.name}
                        </td>
                        <td style="font-size: 15px; color: #0ea5e9; font-weight: 700; text-align: right;">
                          Rp ${pricePerPerson.toLocaleString('id-ID')}
                        </td>
                      </tr>
                    </table>
                  </div>
                `).join('')}
                <div style="padding: 16px 20px; background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);">
                  <table style="width: 100%;">
                    <tr>
                      <td style="font-size: 14px; color: #1e293b; font-weight: 700; text-align: left;">
                        <span style="display: inline-block; width: 8px; height: 8px; background: #db2777; border-radius: 50%; margin-right: 8px;"></span>
                        ${user.fullname || user.username} (Owner)
                      </td>
                      <td style="font-size: 15px; color: #db2777; font-weight: 700; text-align: right;">
                        Rp ${pricePerPerson.toLocaleString('id-ID')}
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              <p style="margin: 16px 0 0 0; color: #64748b; font-size: 12px; text-align: center;">
                <strong>Total:</strong> ${totalPeople} members • <strong>Rp ${sub.pricePaid.toLocaleString('id-ID')}</strong>
              </p>
            </div>
          `
          : "";

        // Visit Dashboard CTA - Only for Members (not Owner)
        const dashboardCTA = person.role === 'Member'
          ? `
            <!-- Dashboard CTA -->
            <div style="background: linear-gradient(135deg, #fef3f2 0%, #fee2e2 100%); padding: 24px; border-radius: 16px; text-align: center; border: 2px solid #fecaca; margin-bottom: 32px;">
              <h3 style="margin: 0 0 12px 0; color: #dc2626; font-size: 18px; font-weight: 700;">📊 View Full Details</h3>
              <p style="margin: 0 0 24px 0; color: #991b1b; font-size: 14px; line-height: 1.5;">Check payment history, billing schedule, and manage your contribution.</p>
              <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://subtrack8.com'}/dashboard/${subId}" 
                 style="display: inline-block; background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 15px; box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.3);">
                🚀 Open Dashboard
              </a>
            </div>
          `
          : "";

        // Di dalam sendWelcomeInvitation function, update bagian Subscription Details Card:

        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SubTrack8 ${person.role === 'Owner' ? 'Reminder Activated!' : 'Invitation'}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    
    <!-- Header with Logo -->
    <div style="background: #ffffff; padding: 40px 20px; text-align: center; border-bottom: 3px solid #0ea5e9;">
      <img src="https://i.ibb.co.com/MDPRRXHc/Sub-Track8-cropped.png" alt="SubTrack8" style="height: 50px; margin-bottom: 0;" />
    </div>

    <!-- Accent Bar -->
    <div style="background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%); height: 6px;"></div>

    <!-- Main Content -->
    <div style="padding: 40px 30px;">
      
      <!-- Success Icon -->
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="background: linear-gradient(135deg, ${person.role === 'Owner' ? '#dcfce7' : '#dbeafe'} 0%, ${person.role === 'Owner' ? '#bbf7d0' : '#bfdbfe'} 100%); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <span style="font-size: 40px;">${person.role === 'Owner' ? '🎉' : '👋'}</span>
        </div>
      </div>

      <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 24px; font-weight: 700; text-align: center;">
        ${person.role === 'Owner' ? 'Subscription Reminder Activated!' : '👋 You\'ve Been Invited!'}
      </h2>
      
      <p style="margin: 0 0 24px 0; color: #64748b; font-size: 16px; line-height: 1.6; text-align: center;">
        Hi <strong style="color: #1e293b;">${person.name}</strong>,
      </p>

      <p style="margin: 0 0 32px 0; color: #64748b; font-size: 15px; line-height: 1.6; text-align: center;">
        ${person.role === 'Owner'
            ? `Your subscription reminder for <strong style="color: #1e293b;">${sub.serviceName}</strong> has been successfully created and is now active.`
            : `<strong style="color: #1e293b;">${user.fullname || user.username}</strong> has invited you to join their subscription group for <strong style="color: #1e293b;">${sub.serviceName}</strong>.`}
      </p>

      <!-- Subscription Details Card -->
      <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 24px; margin-bottom: 32px;">
        <h3 style="margin: 0 0 16px 0; color: #475569; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">📋 Subscription Details</h3>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">Service</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-weight: 600; text-align: right; font-size: 14px;">${sub.serviceName}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">Type</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
              <span style="background: ${sub.type === 'Family' ? '#f0f9ff' : '#fef3f2'}; color: ${sub.type === 'Family' ? '#0369a1' : '#dc2626'}; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">${sub.type}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">Billing Cycle</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-weight: 600; text-align: right; font-size: 14px;">${sub.billingCycle} ${sub.billingCycle === 1 ? 'Month' : 'Months'}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">Billing Date</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-weight: 600; text-align: right; font-size: 14px;">${new Date(sub.billingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
          </tr>
          ${sub.isReminderActive ? `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">Reminder Date</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
              <span style="background: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">
                🔔 ${new Date(sub.reminderDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 12px 0; ${isFamily ? 'border-bottom: 1px solid #e2e8f0;' : ''} color: #64748b; font-size: 14px;">Total Cost</td>
            <td style="padding: 12px 0; ${isFamily ? 'border-bottom: 1px solid #e2e8f0;' : ''} color: #0ea5e9; font-weight: 700; text-align: right; font-size: 18px;">Rp ${sub.pricePaid.toLocaleString('id-ID')}</td>
          </tr>
          ${isFamily ? `
          <tr>
            <td style="padding: 12px 0; color: #64748b; font-size: 14px;">Your Share</td>
            <td style="padding: 12px 0; color: #db2777; font-weight: 700; text-align: right; font-size: 18px;">Rp ${pricePerPerson.toLocaleString('id-ID')}</td>
          </tr>
          ` : ''}
        </table>

        ${membersListHtml}
      </div>

      ${dashboardCTA}

      <!-- Telegram CTA -->
      <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 32px; border-radius: 16px; text-align: center; border: 2px solid #bae6fd; margin-bottom: 32px;">
        <div style="background: white; width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <span style="font-size: 30px;">📱</span>
        </div>
        <h3 style="margin: 0 0 12px 0; color: #0369a1; font-size: 18px; font-weight: 700;">Get Instant Reminders on Telegram</h3>
        <p style="margin: 0 0 24px 0; color: #0c4a6e; font-size: 14px; line-height: 1.5;">Never miss a payment! Connect your Telegram account to receive timely notifications.</p>
        <a href="https://t.me/SubTrack8_bot?start=${person.id}" 
           style="display: inline-block; background: linear-gradient(135deg, #0088cc 0%, #006699 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 15px; box-shadow: 0 4px 6px -1px rgba(0, 136, 204, 0.3);">
          🚀 Connect Telegram
        </a>
      </div>

      <!-- Tips Section -->
      ${person.role === 'Owner' ? `
      <div style="background: #fef3f2; border-left: 4px solid #dc2626; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
        <p style="margin: 0; color: #991b1b; font-size: 14px; line-height: 1.6;">
          <strong>💡 Pro Tip:</strong> ${isFamily ? `Make sure to collect Rp ${pricePerPerson.toLocaleString('id-ID')} from each member before the billing date!` : 'You\'ll receive a reminder email on the scheduled reminder date. Make sure to check your inbox!'}
        </p>
      </div>
      ` : `
      <div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
        <p style="margin: 0; color: #166534; font-size: 14px; line-height: 1.6;">
          <strong>ℹ️ What's Next:</strong> You'll receive reminders before each billing date. Make sure to prepare your share of <strong>Rp ${pricePerPerson.toLocaleString('id-ID')}</strong> on time!
        </p>
      </div>
      `}

    </div>

    <!-- Footer -->
    <div style="background: #f8fafc; padding: 32px 30px; border-top: 1px solid #e2e8f0; text-align: center;">
      <p style="margin: 0 0 12px 0; color: #94a3b8; font-size: 13px;">
        You received this email because you're part of a SubTrack8 subscription group.
      </p>
      <p style="margin: 0; color: #cbd5e1; font-size: 12px;">
        © ${new Date().getFullYear()} SubTrack8. All rights reserved.
      </p>
      <div style="margin-top: 20px;">
        <a href="https://subtrack8.com" style="color: #0ea5e9; text-decoration: none; font-size: 13px; margin: 0 12px;">Visit Website</a>
        <span style="color: #cbd5e1;">•</span>
        <a href="#" style="color: #0ea5e9; text-decoration: none; font-size: 13px; margin: 0 12px;">Help Center</a>
        <span style="color: #cbd5e1;">•</span>
        <a href="#" style="color: #0ea5e9; text-decoration: none; font-size: 13px; margin: 0 12px;">Privacy Policy</a>
      </div>
    </div>

  </div>
</body>
</html>
`;

        return resend.emails.send({
          from: 'SubTrack8 <notifications@muhammaddheovani.web.id>',
          to: person.email,
          subject: person.role === 'Owner'
            ? `SubTrack8 Reminder Created: ${sub.serviceName}`
            : `You're Invited to ${sub.serviceName} SubTrack8's Reminder`,
          html: htmlContent
        });
      });

      return await Promise.all(invitations);
    });
  }
);

// 3. FUNGSI PEMBATALAN REMINDER
export const cancelSubscriptionReminder = inngest.createFunction(
  { id: "cancel-reminder" },
  { event: "app/subscription.reminder.cancel" },
  async ({ event }) => {
    const { subId } = event.data
    console.log(`Canceling reminder for subscription: ${subId}`)
    return { message: "Reminder cancellation triggered", subId }
  }
)