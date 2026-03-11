"use client";

export function FooterAuth() {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 mt-auto">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-gray-400 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} <span className="font-semibold text-white">SubTrack8</span>. All rights reserved.
          </p>
          
          {/* Links - Hidden di mobile, tampil di desktop */}
          <div className="hidden md:flex gap-6 text-sm">
            <a 
              href="/about" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              About
            </a>
            <a 
              href="/privacy" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy
            </a>
            <a 
              href="/terms" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms
            </a>
            <a 
              href="/contact" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}