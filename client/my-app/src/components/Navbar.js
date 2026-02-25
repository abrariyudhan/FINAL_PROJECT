"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiChartPie, HiGlobeAlt, HiLogout, HiChat } from "react-icons/hi";
import LogoutButton from "./LogoutButton";

export default function Navbar({ user }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <HiChartPie className="w-5 h-5" /> },
    { name: "Explore Group", href: "/dashboard/explore", icon: <HiGlobeAlt className="w-5 h-5" /> },
    { name: "Chat", href: "/chat", icon: <HiChat className="w-5 h-5" /> },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md fixed w-full z-30 top-0 start-0 border-b border-gray-200">
      <div className="max-w-8xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        
        {/* SISI KIRI: LOGO */}
        <div className="flex items-center space-x-4 flex-1">
          <Link href="/" className="flex items-center">
            <img
              src="https://i.ibb.co.com/1tJPNJP7/Sub-Track8-cropped-removebg.png"
              className="h-11 w-auto brightness-100 invert-0 opacity-100 drop-shadow-[0_4px_12px_rgba(14,165,233,0.25)] hover:drop-shadow-[0_8px_20px_rgba(14,165,233,0.4)] hover:-translate-y-0.5 hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer"
              alt="SubTrack8 Logo"
            />
          </Link>
        </div>

        {/* SISI TENGAH: NAVIGASI */}
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
                        ? "bg-white text-[#0099FF] shadow-md transform scale-105"
                        : "text-gray-500 hover:text-[#0099FF] hover:bg-white/50"
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

        {/* SISI KANAN: USER INFO & LOGOUT */}
        <div className="flex flex-1 justify-end items-center gap-4">
          <div className="flex flex-col -space-y-1 items-end">
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Logged in as</span>
            <span className="text-sm font-bold text-gray-700">
              {user?.fullname || user?.username || "Guest"}
            </span>
          </div>
          
          <div className="h-6 w-[1px] bg-gray-300"></div>

          <div className="text-xs font-black hover:text-red-500 transition-colors cursor-pointer uppercase tracking-widest border-b-2 border-transparent hover:border-red-500 pb-1">
            <LogoutButton />
          </div>
        </div>
      </div>
    </nav>
  );
}