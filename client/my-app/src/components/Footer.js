"use client";

import Link from "next/link";
import { BsGithub, BsTwitterX, BsLinkedin } from "react-icons/bs";
import { FiMail, FiMapPin } from "react-icons/fi";

export function AppFooter() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          
          {/* Brand Section */}
<div className="lg:col-span-2">
  <div className="flex items-center mb-4">
    <img 
      src="/logo_white.png" 
      alt="SubTrack8 Logo" 
      className="h-10 w-auto object-contain brightness-110"
    />
  </div>
  <p className="text-slate-400 text-sm leading-relaxed max-w-md mb-6">
    Your ultimate subscription management platform. Track, monitor, and optimize your monthly spending across all your favorite services.
  </p>
  <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
    <FiMail className="w-4 h-4 text-sky-400" />
    <a href="mailto:hello@subtrack8.com" className="hover:text-sky-400 transition-colors">
      hello@subtrack8.kurleb.web.id
    </a>
  </div>
  <div className="flex items-center gap-2 text-slate-400 text-sm">
    <FiMapPin className="w-4 h-4 text-sky-400" />
    <span>Jakarta, Indonesia</span>
  </div>
</div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/dashboard" className="text-slate-400 text-sm hover:text-sky-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/explore" className="text-slate-400 text-sm hover:text-sky-400 transition-colors">
                  Explore Services
                </Link>
              </li>
              <li>
                <Link href="/dashboard/add-subscription" className="text-slate-400 text-sm hover:text-sky-400 transition-colors">
                  Add Subscription
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-slate-400 text-sm hover:text-sky-400 transition-colors">
                  Group Chats
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/#intro" className="text-slate-400 text-sm hover:text-sky-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#features" className="text-slate-400 text-sm hover:text-sky-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#stats" className="text-slate-400 text-sm hover:text-sky-400 transition-colors">
                  Our Impact
                </Link>
              </li>
              <li>
                <a href="#" className="text-slate-400 text-sm hover:text-sky-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-500 font-bold">SubTrack8</span>. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-gradient-to-br hover:from-sky-500 hover:to-cyan-600 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 group"
            >
              <BsGithub className="w-4 h-4" />
            </a>
            <a 
              href="https://twitter.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-gradient-to-br hover:from-sky-500 hover:to-cyan-600 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 group"
            >
              <BsTwitterX className="w-4 h-4" />
            </a>
            <a 
              href="https://linkedin.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-gradient-to-br hover:from-sky-500 hover:to-cyan-600 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 group"
            >
              <BsLinkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}