import { google } from 'googleapis';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

const registeredServices = [
  "Netflix", "Spotify", "Disney+ Hotstar", "YouTube Premium", "Apple Music",
  "Amazon Prime Video", "Vidio", "HBO Go", "VIU", "Canva",
  "Adobe Creative Cloud", "Microsoft 365", "Zoom", "Duolingo Plus",
  "Skillshare", "ChatGPT Plus", "Google One", "iCloud+",
  "PlayStation Plus", "Nintendo Switch Online"
];

// Fungsi Helper untuk mengambil isi email
function getBody(payload) {
  let body = "";
  if (payload.parts) {
    payload.parts.forEach(part => {
      if (part.mimeType === 'text/plain') {
        body += Buffer.from(part.body.data, 'base64').toString();
      } else if (part.parts) {
        body += getBody(part);
      }
    });
  } else if (payload.body.data) {
    body = Buffer.from(payload.body.data, 'base64').toString();
  }
  return body;
}

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: session.accessToken });
  const gmail = google.gmail({ version: 'v1', auth });

  try {
    const res = await gmail.users.messages.list({
      userId: 'me',
      q: 'subject:(subscription OR receipt OR invoice OR bill OR payment)',
      maxResults: 10
    });

    const messages = res.data.messages || [];
    const detectedSubs = [];

    for (const msg of messages) {
      const detail = await gmail.users.messages.get({ userId: 'me', id: msg.id });
      const payload = detail.data.payload;
      const headers = payload.headers;

      const subject = headers.find(h => h.name === 'Subject')?.value || "";
      const from = headers.find(h => h.name === 'From')?.value || "";
      const dateHeader = headers.find(h => h.name === 'Date')?.value || "";
      const bodyText = getBody(payload);

      // 1. DETEKSI NAMA LAYANAN
      let matchedService = registeredServices.find(service =>
        from.toLowerCase().includes(service.toLowerCase().replace(/\+/g, '')) ||
        subject.toLowerCase().includes(service.toLowerCase().replace(/\+/g, ''))
      ) || from.split('<')[0].trim().replace(/"/g, '');

      // 2. DETEKSI HARGA & KONVERSI (Simple Conversion)
      const priceRegex = /(Rp|IDR|\$|USD)\s?([\d.,]+)/i;
      const priceMatch = bodyText.match(priceRegex);
      let pricePaid = 0;

      if (priceMatch) {
        let rawPrice = parseFloat(priceMatch[2].replace(/[.,](?=\d{3})/g, '').replace(',', '.'));
        let currency = priceMatch[1].toUpperCase();

        if (currency === "$" || currency === "USD") {
          pricePaid = Math.round(rawPrice * 15500); // Kurs statis USD ke IDR
        } else {
          pricePaid = Math.round(rawPrice);
        }
      }

      // 3. DETEKSI BILLING CYCLE (Monthly vs Yearly)
      let billingCycle = 1; // Default bulanan
      const fullText = (bodyText + subject).toLowerCase();

      if (/6 month|6 bulan|semi-annual|setengah tahun/i.test(fullText)) {
        // Kita cek 6 bulan dulu karena kata "Semi-Annual" mengandung kata "Annual"
        billingCycle = 6;
      } else if (/3 month|3 bulan|quarterly|triwulan/i.test(fullText)) {
        billingCycle = 3;
      } else if (/year|yearly|annual|tahun/i.test(fullText)) {
        // Jika tidak ada kata semi/6, baru cek annual
        billingCycle = 12;
      }

      // 4. DETEKSI BILLING DATE (Smart Priority)
      let billingDate = new Date(dateHeader).toISOString().split('T')[0];

      const nextBillingRegex = /(?:next billing|ditagih secara otomatis pada|tagihan berikutnya|valid until|sampai dengan)[\s\S]*?(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|Mei|Agu|Okt|Des|Sept)[a-z]*\s+\d{4})/i;

      const sanitizedBody = bodyText.replace(/\s+/g, ' ');
      const nextMatch = sanitizedBody.match(nextBillingRegex);

      if (nextMatch && nextMatch[1]) {
        try {
          let dateStr = nextMatch[1]
            .replace(/Mei/i, 'May')
            .replace(/Agu/i, 'Aug')
            .replace(/Okt/i, 'Oct')
            .replace(/Des/i, 'Dec')
            .replace(/Sept/i, 'Sep')

          const parsedDate = new Date(dateStr);
          if (!isNaN(parsedDate)) {
            billingDate = parsedDate.toISOString().split('T')[0];
          }
        } catch (e) {
          console.error("Date Parse Error:", e);
        }
      } else {
        const allDatesRegex = /(\d{1,2})\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|Mei|Agu|Okt|Des)[a-z]*\s+\d{4}/gi;
        const allMatches = bodyText.match(allDatesRegex);

        if (allMatches && allMatches.length > 1) {
          billingDate = new Date(allMatches[1]).toISOString().split('T')[0];
        } else if (allMatches && allMatches.length === 1) {
          billingDate = new Date(allMatches[0]).toISOString().split('T')[0];
        }
      }

      //5. DETEK TYPE SUBSCRIPTION
      let type = "Individual"; // Default

      const familyKeywords = /family|group|multi-user|keluarga|bersama|team|premium family/i;

      if (familyKeywords.test(bodyText + subject)) {
        type = "Family";
      }

      // PUSH SEMUA YANG TERDETEKSI KE ARRAY, CEK DUPLIKASI BERDASARKAN VENDOR
      if (!detectedSubs.some(s => s.vendor === matchedService)) {
        detectedSubs.push({
          id: msg.id,
          vendor: matchedService,
          subject: subject,
          billingDate,
          pricePaid,
          billingCycle,
          type,
          isRegistered: registeredServices.includes(matchedService)
        });
      }
    }


    return NextResponse.json({ data: detectedSubs });
  } catch (error) {
    console.error("Gmail Scan Error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}