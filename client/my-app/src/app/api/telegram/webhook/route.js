import Member from "@/server/models/Member";
import User from "@/server/models/User";

export async function POST(req) {
  try {
    const body = await req.json()
    const message = body.message

    // Menangani perintah /start MEMBER_ID
    if (message && message.text?.startsWith("/start")) {
      const chatId = message.chat.id
      const payload = message.text.split(" ")[1]

      if (payload) {
        // Coba update di koleksi Members
        const result = await Member.updateTelegramId(payload, chatId)
        
        // Jika tidak ketemu di members, mungkin itu adalah User/Owner
        // Kamu bisa menambahkan fungsi serupa di model User jika perlu     
        await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: "✅ <b>SubTrack8: Notifikasi Aktif!</b>\n\nTerima kasih! Sekarang Anda akan menerima pengingat iuran otomatis langsung di Telegram ini.",
            parse_mode: "HTML"
          }),
        })
      }
    }
    return Response.json({ ok: true })
  } catch (error) {
    console.error("Telegram Webhook Error:", error)
    return Response.json({ error: "Internal Server Error" }, { status: 500 })
  }
}