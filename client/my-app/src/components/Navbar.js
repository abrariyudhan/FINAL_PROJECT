"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiHome, HiChartPie, HiGlobeAlt, HiLogout } from "react-icons/hi";

export default function Navbar() {
  const pathname = usePathname();

  // Dummy data user
  const user = { name: "Alex" };

  const navItems = [
    { name: "Beranda", href: "/", icon: <HiHome className="w-5 h-5" /> },
    { name: "Dashboard", href: "/dashboard", icon: <HiChartPie className="w-5 h-5" /> },
    { name: "Explore Group", href: "/dashboard/explore", icon: <HiGlobeAlt className="w-5 h-5" /> },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md fixed w-full z-30 top-0 start-0 border-b border-gray-200">
      {/* Menggunakan px-6 dan menghilangkan max-w-screen agar benar-benar ke ujung */}
      <div className="flex items-center justify-between mx-auto p-4 px-6">
        
        {/* SISI KIRI: LOGO & NAMA USER (Pojok Kiri) */}
        <div className="flex items-center space-x-4 flex-1">
          <Link href="/" className="flex items-center">
            <img
              src="https://i.ibb.co.com/1tJPNJP7/Sub-Track8-cropped-removebg.png"
              className="h-10 w-auto"
              alt="SubTrack8 Logo"
            />
          </Link>
          <div className="h-6 w-[1px] bg-gray-300"></div>
          <div className="flex flex-col -space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Logged in as</span>
            <span className="text-sm font-bold text-gray-700">{user.name}</span>
          </div>
        </div>

        {/* SISI TENGAH: NAVIGASI (Tetap di Tengah) */}
        <div className="hidden md:flex items-center justify-center">
          <ul className="flex flex-row space-x-2 bg-gray-100/80 p-1.5 rounded-full border border-gray-200 shadow-inner">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                      isActive
                        ? "bg-white text-blue-600 shadow-md transform scale-105"
                        : "text-gray-500 hover:text-blue-600 hover:bg-white/50"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* SISI KANAN: LOGOUT (Pojok Kanan) */}
        <div className="flex flex-1 justify-end">
          <button
            onClick={() => console.log("Logout action")}
            className="group flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-full hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-200 active:scale-95"
          >
            <HiLogout className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}