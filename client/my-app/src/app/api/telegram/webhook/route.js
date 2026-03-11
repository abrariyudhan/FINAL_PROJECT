import Member from "@/server/models/Member";
import User from "@/server/models/User";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const body = await req.json()
    const message = body.message

    console.log("📱 [TELEGRAM WEBHOOK] Received:", JSON.stringify(body, null, 2))

    if (message && message.text?.startsWith("/start")) {
      const chatId = message.chat.id
      const payload = message.text.split(" ")[1]
      
      console.log(`🔑 [TELEGRAM] Payload: "${payload}" | ChatID: ${chatId}`)

      if (payload) {
        // Validate ObjectId
        if (!ObjectId.isValid(payload)) {
          console.error(`❌ [TELEGRAM] Invalid ObjectId: "${payload}"`)
          await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text: "❌ Invalid link. Please use the link from your email.",
              parse_mode: "HTML"
            }),
          })
          return Response.json({ ok: true })
        }

        // Coba update di koleksi Members dulu
        console.log(`🔍 [TELEGRAM] Trying to update Member with ID: ${payload}`)
        const memberResult = await Member.updateTelegramId(payload, chatId)
        console.log(`👥 [TELEGRAM] Member update result:`, memberResult)

        // Jika tidak ketemu di members (matchedCount = 0), coba di User/Owner
        if (memberResult.matchedCount === 0) {
          console.log(`🔄 [TELEGRAM] Not found in Members, trying User...`)
          const userResult = await User.updateTelegramId(payload, chatId)
          console.log(`👤 [TELEGRAM] User update result:`, userResult)
          
          if (userResult.matchedCount === 0) {
            console.error(`❌ [TELEGRAM] User not found with ID: ${payload}`)
          } else {
            console.log(`✅ [TELEGRAM] Successfully updated User ${payload} with chatId ${chatId}`)
          }
        } else {
          console.log(`✅ [TELEGRAM] Successfully updated Member ${payload} with chatId ${chatId}`)
        }

        await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: "✅ <b>SubTrack8: Notifikasi Aktif!</b>\n\nTerima kasih! Sekarang Anda akan menerima pengingat iuran otomatis langsung di Telegram ini.",
            parse_mode: "HTML"
          }),
        })
        console.log(`✉️ [TELEGRAM] Confirmation message sent to chatId: ${chatId}`)
      }
    }
    return Response.json({ ok: true })
  } catch (error) {
    console.error("❌ [TELEGRAM] Webhook Error:", error)
    console.error("Stack:", error.stack)
    return Response.json({ error: "Internal Server Error" }, { status: 500 })
  }
}