# SubsTrack8 💳🔔

SubsTrack8 adalah platform manajemen dan pelacakan biaya langganan cerdas yang dirancang untuk membantu pengguna memantau pengeluaran langganan mereka. Aplikasi ini dilengkapi dengan pengingat otomatis berbasis *event-driven workflow* serta fitur komunikasi langsung.

---

## 🌟 Fitur Utama

*   **Pelacakan Langganan:** Mencatat dan memantau siklus tagihan berbagai layanan langganan.
*   **Pengingat Otomatis (Automated Reminders):** Mengirimkan notifikasi pengingat otomatis sebelum tanggal tagihan tiba melalui email dan bot Telegram.
*   **Alur Kerja Event-Driven:** Memanfaatkan arsitektur berbasis *event* untuk memproses logika penjadwalan pengingat secara andal.
*   **Real-Time Chat:** Komunikasi interaktif secara *real-time* langsung di dalam aplikasi.
*   **Otentikasi Aman:** Pendaftaran dan masuk akun yang praktis menggunakan Google OAuth 2.0.

---

## 🛠️ Tech Stack

*   **Framework:** Next.js
*   **Database:** MongoDB
*   **Real-Time Communication:** Socket.IO
*   **Workflow Engine:** Inngest (Event-Driven Workflows)
*   **Notification APIs:** Resend Email API & Telegram Bot API
*   **Media Management:** Cloudinary
*   **Authentication:** Third-party API Google Auth

---

## 🚀 Panduan Instalasi & Menjalankan Aplikasi

Ikuti blok perintah di bawah ini di terminal Anda untuk menjalankan proyek SubsTrack8 di lingkungan lokal secara cepat:

```bash
# 1. Klon repositori dan masuk ke direktori utama proyek
git clone [https://github.com/yourusername/subtrack8.git](https://github.com/yourusername/subtrack8.git) && cd subtrack8

# 2. Instal seluruh dependensi yang dibutuhkan
npm install

# 3. Konfigurasi Environment Variables (Menyalin contoh konfigurasi otomatis)
# Jalankan perintah ini untuk membuat file .env otomatis, kemudian lengkapi nilainya nanti
echo "PORT=3000
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
RESEND_API_KEY=your_resend_api_key
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name" > .env

# 4. Jalankan perkakas pendukung alur kerja jika dibutuhkan (Inngest Dev Server)
# npx inngest-cli dev (jalankan di terminal terpisah jika menggunakan lingkungan lokal)

# 5. Jalankan server aplikasi dalam mode pengembangan (Development)
npm run dev
