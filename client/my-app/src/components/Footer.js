"use client";

import { Footer, FooterCopyright, FooterIcon, FooterLink, FooterLinkGroup, FooterTitle } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitterX } from "react-icons/bs";

export function AppFooter() {
  return (
    // Kita tambahkan bg-gray-900 agar kontras dengan body yang terang
    <Footer className="bg-gray-900 rounded-none">
      <div className="w-full">
        {/* Section Atas: Links */}
        <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4 container mx-auto">
          <div>
            <FooterTitle title="Company" className="text-white" />
            <FooterLinkGroup col className="text-gray-400">
              <FooterLink href="/">About</FooterLink>
              <FooterLink href="/">Careers</FooterLink>
              <FooterLink href="/">Brand Center</FooterLink>
              <FooterLink href="/">Blog</FooterLink>
            </FooterLinkGroup>
          </div>
          <div>
            <FooterTitle title="help center" className="text-white" />
            <FooterLinkGroup col className="text-gray-400">
              <FooterLink href="/">Discord Server</FooterLink>
              <FooterLink href="/">Twitter</FooterLink>
              <FooterLink href="/">Facebook</FooterLink>
              <FooterLink href="/">Contact Us</FooterLink>
            </FooterLinkGroup>
          </div>
          <div>
            <FooterTitle title="legal" className="text-white" />
            <FooterLinkGroup col className="text-gray-400">
              <FooterLink href="/">Privacy Policy</FooterLink>
              <FooterLink href="/">Licensing</FooterLink>
              <FooterLink href="/">Terms &amp; Conditions</FooterLink>
            </FooterLinkGroup>
          </div>
          <div>
            <FooterTitle title="download" className="text-white" />
            <FooterLinkGroup col className="text-gray-400">
              <FooterLink href="/">iOS</FooterLink>
              <FooterLink href="/">Android</FooterLink>
              <FooterLink href="/">Windows</FooterLink>
              <FooterLink href="/">MacOS</FooterLink>
            </FooterLinkGroup>
          </div>
        </div>

        {/* Section Bawah: Copyright & Socials */}
        {/* Kita tambahkan container dan mx-auto supaya tidak terlalu ke pinggir */}
        <div className="w-full bg-gray-800 px-4 py-6">
          <div className="container mx-auto sm:flex sm:items-center sm:justify-between">
            <FooterCopyright 
              href="/" 
              by="SubTrack8" 
              year={2026} 
              className="text-gray-300 font-medium" 
            />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <FooterIcon href="https://www.facebook.com/" icon={BsFacebook} className="text-gray-400 hover:text-white" />
              <FooterIcon href="https://www.instagram.com/" icon={BsInstagram} className="text-gray-400 hover:text-white" />
              <FooterIcon href="https://x.com/" icon={BsTwitterX} className="text-gray-400 hover:text-white" />
              <FooterIcon href="https://github.com/" icon={BsGithub} className="text-gray-400 hover:text-white" />
              <FooterIcon href="https://dribbble.com/" icon={BsDribbble} className="text-gray-400 hover:text-white" />
            </div>
          </div>
        </div>
      </div>
    </Footer>
  );
}