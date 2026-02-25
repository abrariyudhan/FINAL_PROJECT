"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { registerUser } from "@/actions/auth"
import Swal from "sweetalert2"
import Link from "next/link"
import FloatingLines from "@/components/FloatingLines"

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fullName, setFullName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    if (!fullName || !fullName.trim()) {
      setLoading(false)
      return Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Full name is required",
      })
    }

    if (!username || !username.trim()) {
      setLoading(false)
      return Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Username is required",
      })
    }

    if (!email || !email.trim()) {
      setLoading(false)
      return Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Email is required",
      })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setLoading(false)
      return Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please enter a valid email address",
      })
    }

    if (!password || password.length < 5) {
      setLoading(false)
      return Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Password must be at least 5 characters",
      })
    }

    if (!phoneNumber || !phoneNumber.trim()) {
      setLoading(false)
      return Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Phone number is required",
      })
    }

    const result = await registerUser({ fullname: fullName, username, email, password, phoneNumber })

    if (result.error) {
      setLoading(false)
      return Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: result.error,
      })
    }

    await Swal.fire({
      icon: "success",
      title: "Account Created!",
      text: result.message,
      timer: 2000,
      showConfirmButton: false,
    })

    router.push("/login")
    setLoading(false)
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#050505] overflow-hidden p-4">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 opacity-20">
        <FloatingLines 
          enabledWaves={["top","middle","bottom"]}
          lineCount={10}
          lineDistance={15}
          interactive={true}
        />
      </div>

      <div className="relative z-10 w-full max-w-[450px]">
        
        {/* WELCOME TEXT */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black text-white tracking-tighter">
            Create <span className="text-sky-500">Account</span>
          </h1>
        </div>

        {/* GLASS CARD */}
        <div className="backdrop-blur-3xl bg-white/[0.02] rounded-[2.5rem] border border-white/10 shadow-2xl p-8">
          
          {/* LOGO SECTION */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <img 
                src="white.png" 
                alt="Sub Track8 Logo" 
                className="relative h-10 w-auto scale-125 drop-shadow-[0_0_15px_rgba(14,165,233,0.4)] transition-transform duration-500 group-hover:scale-[1.35]" 
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="space-y-1 md:col-span-2">
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your Name"
                className="w-full px-5 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full px-5 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">Phone</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="0812..."
                className="w-full px-5 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full px-5 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">Security Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-5 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all placeholder:text-slate-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full md:col-span-2 bg-sky-500 hover:bg-sky-400 text-white py-3.5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg shadow-sky-500/20 active:scale-[0.98] disabled:opacity-50 mt-4"
            >
              {loading ? "Processing..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-[11px] text-slate-500 mt-8">
            Already have an account?{" "}
            <Link href="/login" className="text-sky-400 font-bold hover:text-white transition-colors">
              Sign In
            </Link>
          </p>
        </div>

        <p className="text-center mt-6 text-[8px] text-slate-800 font-bold uppercase tracking-[0.4em]">
          Sub-Track8 Cloud Systems &bull; 2026
        </p>
      </div>
    </div>
  )
}
