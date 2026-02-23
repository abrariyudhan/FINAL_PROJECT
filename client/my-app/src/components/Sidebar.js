"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  // Navigation menu items with icons and badge indicators
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
        </svg>
      ),
    },
    // {
    //   name: "People",
    //   path: "/people",
    //   icon: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       className="h-5 w-5"
    //       viewBox="0 0 20 20"
    //       fill="currentColor"
    //     >
    //       <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
    //     </svg>
    //   ),
    // },
    {
      name: "Messages",
      path: "/chat",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3.293 3.293 3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      ),
      // badge: 2, // Notification count
    },
    // {
    //   name: "Groups",
    //   path: "/groups",
    //   icon: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       className="h-5 w-5"
    //       viewBox="0 0 20 20"
    //       fill="currentColor"
    //     >
    //       <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
    //     </svg>
    //   ),
    // },
    {
      name: "My Profile",
      path: "/profile",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-[90px] bg-white border-r border-slate-100 flex flex-col items-center py-6">
      {/* Brand Logo */}
      <div className="mb-12">
        <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-200">
          <span className="text-white font-black text-lg">f</span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 flex flex-col gap-6">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className="relative group"
              title={item.name}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                  isActive
                    ? "bg-sky-500 text-white shadow-lg shadow-sky-200"
                    : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {item.icon}
              </div>

              {/* Notification Badge */}
              {item.badge && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-lg">
                  {item.badge}
                </div>
              )}

              {/* Tooltip on hover */}
              <div className="absolute left-full ml-2 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                {item.name}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Menu Toggle (hamburger for mobile - optional) */}
      <button className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
