"use client";

import DotGrid from "@/components/DotGrid";
import TextType from "@/components/TextType";
import OrbitImages from "@/components/OrbitImages";
import ScrollReveal from "@/components/ScrollFloat";
import CountUp from "@/components/CountUp";
import Link from "next/link";
import { FiGrid, FiBell, FiTrendingUp, FiDollarSign, FiChevronDown } from "react-icons/fi";
import { useState, useEffect } from "react";

export default function Home() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate particle positions only on client-side
    setParticles(
      Array.from({ length: 8 }, () => ({
        top: 20 + Math.random() * 60,
        left: 20 + Math.random() * 60,
        duration: 4 + Math.random() * 3,
        delay: Math.random() * 2
      }))
    );
  }, []);

  const images = [
    "https://upload.wikimedia.org/wikipedia/commons/f/ff/Netflix-new-icon.png",
    "https://upload.wikimedia.org/wikipedia/commons/2/2a/Apple_Music_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
    "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    "https://upload.wikimedia.org/wikipedia/commons/1/1c/ICloud_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
  ];

  const features = [
    {
      title: "Centralized View",
      desc: "See all your active subscriptions across platforms in one single, clean dashboard.",
      Icon: FiGrid,
      gradient: "from-sky-500 to-blue-600"
    },
    {
      title: "Smart Alerts",
      desc: "Get notified before the trial ends or when a price hike is detected on your bills.",
      Icon: FiBell,
      gradient: "from-pink-500 to-rose-600"
    },
    {
      title: "Spending Analytics",
      desc: "Visualize where your money goes with monthly reports and category breakdowns.",
      Icon: FiTrendingUp,
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      title: "Cost Optimization",
      desc: "Identify unused services and get suggestions to switch to cheaper family plans.",
      Icon: FiDollarSign,
      gradient: "from-emerald-500 to-teal-600"
    }
  ];

  const stats = [
    { value: 12, suffix: '.5K+', label: 'Active Users', color: 'text-sky-600' },
    { value: 450, suffix: 'K+', label: 'Subscriptions Tracked', color: 'text-cyan-600' },
    { value: 2.4, prefix: '$', suffix: 'M', label: 'Expenses Saved', color: 'text-emerald-600' }
  ];

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <>
      {/* Keyframes */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-20px, -20px) scale(1.1); }
          }
          @keyframes slide-up {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes bounce-gentle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
        `
      }} />

      {/* HERO SECTION */}
      <div id="hero" className="relative w-full min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-sky-400 via-cyan-500 to-blue-600">
        {/* Animated blobs */}
        <div className="absolute -top-1/2 -left-1/10 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-sky-400/40 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute -bottom-1/3 -right-1/20 w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-cyan-500/50 rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite_reverse]" />

        {/* Dot Grid */}
        <div className="absolute inset-0 z-0 opacity-20">
          <DotGrid
            dotSize={3}
            gap={25}
            baseColor="#ffffff"
            activeColor="#ffffff"
            proximity={120}
            shockRadius={180}
            shockStrength={5}
            resistance={800}
            returnDuration={2.5}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto py-20 md:py-32">
          <h1 className="text-white font-black text-5xl md:text-7xl lg:text-8xl mb-6 md:mb-8 drop-shadow-2xl tracking-tight leading-tight">
            With SubTrack8
          </h1>
          <div className="text-sky-50 text-xl md:text-3xl font-medium drop-shadow-lg max-w-3xl mx-auto">
            <TextType
              text={[
                "Manage all your subscriptions in one place",
                "Track your monthly spending effortlessly",
                "Never get surprised by hidden renewals",
                "Optimize your digital lifestyle today"
              ]}
              typingSpeed={80}
              pauseDuration={1500}
              showCursor
              cursorCharacter="_"
              deletingSpeed={50}
              cursorBlinkDuration={0.5}
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => scrollToSection('intro')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 group cursor-pointer z-20"
          aria-label="Scroll to next section"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/80 text-xs font-medium uppercase tracking-wider hidden md:block">Scroll Down</span>
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 animate-[bounce-gentle_2s_ease-in-out_infinite]">
              <FiChevronDown className="w-5 h-5 text-white" />
            </div>
          </div>
        </button>
      </div>

      <main className="bg-gradient-to-b from-slate-50 via-white to-slate-100 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-[15%] right-[8%] w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-sky-500/[0.03] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-[50%] left-[5%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-cyan-500/[0.04] rounded-full blur-3xl pointer-events-none" />

        {/* INTRO SECTION - Fit in one viewport */}
        <section id="intro" className="max-w-6xl mx-auto px-6 md:px-8 py-8 md:py-12 lg:py-14 relative z-10 min-h-[calc(100vh-73px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center h-full">
            {/* Text Content */}
            <div className="text-center lg:text-left space-y-5">
{/* Logo */}
<div className="flex justify-center lg:justify-start">
  <div className="relative w-[420px] h-28 group">
    {/* Animated gradient glow background */}
    <div className="absolute inset-0 bg-gradient-to-r from-sky-500/30 via-cyan-400/30 to-blue-500/30 rounded-2xl blur-2xl group-hover:blur-3xl opacity-60 group-hover:opacity-100 transition-all duration-700 animate-pulse"></div>
    
    {/* Shimmer effect saat hover */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out rounded-2xl"></div>
    
    {/* Floating sparkles */}
    <div className="absolute top-0 left-0 w-2 h-2 bg-sky-400 rounded-full opacity-0 group-hover:opacity-100 blur-sm animate-ping"></div>
    <div className="absolute top-1/2 right-0 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 blur-sm animate-ping" style={{animationDelay: '0.3s'}}></div>
    <div className="absolute bottom-0 left-1/3 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 blur-sm animate-ping" style={{animationDelay: '0.6s'}}></div>
    
    {/* Logo tanpa background - pure image */}
    <div className="relative flex items-center justify-center pb-4 transition-all duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_25px_rgba(14,165,233,0.5)]">
      <img 
        src="/logo_v2.png" 
        alt="SubTrack8 Logo" 
        className="w-full h-full object-contain filter brightness-105 contrast-105"
      />
    </div>
    
    {/* Subtle corner rays - KANAN ATAS */}
    <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-sky-400 to-transparent"></div>
      <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-sky-400 to-transparent"></div>
    </div>
    
    {/* Subtle corner rays - KIRI BAWAH */}
    <div className="absolute bottom-0 left-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-0.5 h-full bg-gradient-to-t from-cyan-400 to-transparent"></div>
    </div>
  </div>
</div>

              {/* Heading */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1]">
                Your Subscription
                <br />
                <span className="relative inline-block mt-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600">
                    Command Center
                  </span>
                  {/* Underline decoration */}
                  <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 10C50 2 250 2 298 10" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0ea5e9" />
                        <stop offset="50%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#2563eb" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h2>

              {/* Description */}
              <div className="text-base md:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed space-y-2">
                <ScrollReveal
                  baseOpacity={0.3}
                  enableBlur
                  baseRotation={3}
                  blurStrength={2}
                >
                  <p className="font-medium">
                    SubTrack8 makes it <span className="text-sky-600 font-bold">easy to monitor</span> your monthly subscription costs for various entertainment and productivity platforms in real time.
                  </p>
                  <p className="text-sm md:text-base text-slate-500">
                    Don&apos;t let your balance get drained by forgotten bills. Take control today.
                  </p>
                </ScrollReveal>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-3">
                <Link href="/dashboard">
                  <button className="group relative px-8 py-3.5 bg-gradient-to-r from-sky-500 to-cyan-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Get Started Free
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </Link>
                <button className="px-8 py-3.5 bg-white text-slate-700 font-bold rounded-xl border-2 border-slate-200 hover:border-sky-300 hover:text-sky-600 hover:-translate-y-0.5 transition-all duration-300 shadow-sm hover:shadow-md">
                  Watch Demo
                </button>
              </div>

              {/* Social Proof - Compact */}
              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start pt-4 border-t border-slate-200">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 border-2 border-white shadow-md flex items-center justify-center text-white font-bold text-xs">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white shadow-md flex items-center justify-center text-slate-600 font-bold text-xs">
                    +12K
                  </div>
                </div>
                <div className="text-xs text-center sm:text-left">
                  <div className="flex gap-0.5 mb-1 justify-center sm:justify-start">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-slate-600 font-medium">Trusted by 12,500+ users</p>
                </div>
              </div>
            </div>

            {/* Orbit Visual - Elegant Focus on Services */}
            <div className="relative h-[300px] md:h-[400px] lg:h-[450px] flex items-center justify-center">
              {/* Glow effect background - more vibrant */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[400px] h-[400px] bg-gradient-to-r from-sky-400/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse"></div>
              </div>

              {/* Concentric rings - more subtle and elegant */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[350px] h-[350px] rounded-full border border-sky-200/20 animate-[spin_25s_linear_infinite]"></div>
                <div className="absolute w-[280px] h-[280px] rounded-full border border-cyan-200/15 animate-[spin_18s_linear_infinite_reverse]"></div>
                <div className="absolute w-[210px] h-[210px] rounded-full border border-sky-300/10 animate-[spin_12s_linear_infinite]"></div>
              </div>

              {/* Center subtle badge instead of big card */}
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <div className="px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-sky-200/50 shadow-lg">
                  <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-600 uppercase tracking-wider">
                    Popular Services
                  </span>
                </div>
              </div>

              {/* Orbit images - enhanced with better styling and explicit z-index */}
              <div className="relative z-10 w-full h-full">
                <OrbitImages
                  images={images}
                  shape="ellipse"
                  radiusX={300}
                  radiusY={300}
                  rotation={-12}
                  duration={55}
                  itemSize={80}
                  responsive={true}
                  radius={150}
                  direction="normal"
                  fill={true}
                  showPath={false}
                  paused={false}
                  baseWidth={900}
                />
              </div>

              {/* Elegant floating particles - fewer but more impactful */}
              {particles.map((particle, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-sky-400 to-cyan-500 rounded-full opacity-40 blur-[1px] pointer-events-none"
                  style={{
                    top: `${particle.top}%`,
                    left: `${particle.left}%`,
                    animation: `float ${particle.duration}s ease-in-out infinite`,
                    animationDelay: `${particle.delay}s`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <button
            onClick={() => scrollToSection('features')}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 group cursor-pointer hidden lg:flex"
            aria-label="Scroll to features"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-100 hover:bg-sky-100 border border-slate-200 hover:border-sky-300 flex items-center justify-center transition-all duration-300 animate-[bounce-gentle_2s_ease-in-out_infinite] shadow-sm hover:shadow-md">
                <FiChevronDown className="w-4 h-4 text-slate-600 group-hover:text-sky-600" />
              </div>
            </div>
          </button>
        </section>

        {/* WHY CHOOSE SECTION - Remove scroll indicator */}
        <section id="features" className="max-w-6xl mx-auto px-6 md:px-8 pb-8 md:pb-12 lg:pb-16 lg:pt-8 relative z-10">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl md:rounded-[3rem] p-8 md:p-12 lg:p-16 border border-white shadow-xl">
            {/* ... rest of features section without scroll indicator ... */}
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 text-slate-900 tracking-tight">
                Why Choose
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-600"> SubTrack8</span>?
              </h2>
              <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
                Everything you need to take control of your subscription spending
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((item, idx) => (
                <div
                  key={idx}
                  className="group p-6 md:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-sky-200 hover:-translate-y-2 transition-all duration-500"
                  style={{
                    animationDelay: `${idx * 100}ms`,
                    animation: 'slide-up 0.6s ease-out forwards'
                  }}
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <item.Icon size={26} color="#ffffff" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* NO scroll indicator here */}
        </section>

        {/* STATS SECTION - Remove scroll indicator */}
        <div id="stats" className="max-w-5xl mx-auto px-6 md:px-8 py-12 md:py-16 lg:py-20 relative z-10">
          {/* ... stats content without scroll indicator ... */}
          <div className="relative rounded-3xl bg-gradient-to-br from-sky-500 to-cyan-600 p-10 md:p-14 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl"></div>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 text-center">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col gap-2 ${idx < stats.length - 1 ? 'pb-8 border-b md:pb-0 md:border-b-0 md:border-r border-white/20' : ''}`}
                >
                  <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-lg">
                    {stat.prefix && <span>{stat.prefix}</span>}
                    <CountUp from={0} to={stat.value} duration={2 + idx * 0.5} separator="," />
                    <span>{stat.suffix}</span>
                  </div>
                  <span className="text-sm font-bold text-sky-100 uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* NO scroll indicator here */}
        </div>

        {/* CTA SECTION - Remove scroll indicator */}
        <section id="cta" className="max-w-4xl mx-auto text-center px-6 pb-10 md:pb-14 lg:pb-18 relative z-10">
          {/* ... CTA content without scroll indicator ... */}
          <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-5 md:mb-6 leading-tight">
            Ready to Take <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-600">Control</span>?
          </h3>
          <p className="text-base md:text-lg text-slate-600 mb-8 md:mb-10 max-w-2xl mx-auto">
            Join thousands of users who have already optimized their subscription spending
          </p>
          <Link href="/dashboard">
            <button className="group relative bg-gradient-to-r from-sky-500 to-cyan-600 text-white px-10 md:px-14 py-4 md:py-5 text-base md:text-lg font-bold rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-105 transition-all duration-300 overflow-hidden">
              <span className="relative z-10">Get Started Now →</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </Link>
        </section>
      </main>
    </>
  );
}