import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./providers";
import { FooterWrapper } from "@/components/FooterWrapper"; // ← Tambahkan

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SubTrack8",
  description: "Your subscriptions manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <NextAuthProvider>
          <div className="flex-1">
            {children}
          </div>
          <FooterWrapper />
        </NextAuthProvider>
      </body>
    </html>
  );
}