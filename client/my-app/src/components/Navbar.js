"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HiChartPie, HiGlobeAlt, HiChat, HiMenu, HiX, HiLogout } from "react-icons/hi";
import LogoutButton from "./LogoutButton";

export default function Navbar({ user }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <HiChartPie className="w-5 h-5" /> },
    { name: "Marketplace", href: "/dashboard/explore", icon: <HiGlobeAlt className="w-5 h-5" /> },
    { name: "Chat", href: "/chat", icon: <HiChat className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* TOP NAVBAR */}
      <nav className="bg-white/80 backdrop-blur-md fixed w-full z-30 top-0 start-0 border-b border-gray-200">
        <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-12 py-3 md:py-4 flex items-center justify-between">
          
          {/* LOGO */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img
                src="https://i.ibb.co.com/1tJPNJP7/Sub-Track8-cropped-removebg.png"
                className="h-9 md:h-11 w-auto brightness-100 invert-0 opacity-100 drop-shadow-[0_4px_12px_rgba(14,165,233,0.25)] hover:drop-shadow-[0_8px_20px_rgba(14,165,233,0.4)] hover:-translate-y-0.5 hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer"
                alt="SubTrack8 Logo"
              />
            </Link>
          </div>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center justify-center">
            <ul className="flex flex-row space-x-2 bg-gray-100/80 p-1.5 rounded-full border border-gray-200 shadow-inner">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2 px-4 lg:px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                        isActive
                          ? "bg-white text-[#0099FF] shadow-md transform scale-105"
                          : "text-gray-500 hover:text-[#0099FF] hover:bg-white/50"
                      }`}
                    >
                      {item.icon}
                      <span className="hidden lg:inline">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* DESKTOP USER INFO & LOGOUT */}
          <div className="hidden md:flex items-center gap-4">
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

          {/* MOBILE HAMBURGER BUTTON */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <HiX className="w-6 h-6 text-gray-700" />
            ) : (
              <HiMenu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </nav>

      {/* MOBILE SIDEBAR MENU */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-40 top-[57px]"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="md:hidden fixed right-0 top-[57px] bottom-0 w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* User Info Section */}
              <div className="p-6 border-b border-gray-200 bg-gradient-to-br from-sky-50 to-blue-50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md">
                    {(user?.fullname || user?.username || "G").charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-wide text-gray-500 font-bold">Logged in as</p>
                    <p className="text-sm font-bold text-gray-900 truncate">
                      {user?.fullname || user?.username || "Guest"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1 px-3">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${
                            isActive
                              ? "bg-blue-50 text-[#0099FF] shadow-sm"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {item.icon}
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Logout Button */}
              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-bold text-sm transition-colors"
                >
                  <HiLogout className="w-5 h-5" />
                  <LogoutButton />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}