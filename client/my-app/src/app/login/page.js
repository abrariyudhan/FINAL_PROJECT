"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { loginUser } from "@/actions/auth"
import Swal from "sweetalert2"
import Link from "next/link"
import FloatingLines from "@/components/FloatingLines"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://accounts.google.com/gsi/client"
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
          callback: handleGoogleCallback,
        })
        window.google.accounts.id.renderButton(
          document.getElementById("google-btn"),
          {
            theme: "outline",
            size: "large",
            width: "100%",
            text: "signin_with",
            shape: "pill",
          }
        )
      }
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  async function handleGoogleCallback(response) {
    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential }),
      })

      const data = await res.json()

      if (data.success) {
        await Swal.fire({
          icon: "success",
          title: "Welcome!",
          text: "Google login successful!",
          timer: 1500,
          showConfirmButton: false,
        })
        router.push("/dashboard")
      } else {
        Swal.fire({
          icon: "error",
          title: "Google Login Failed",
          text: data.error || "Something went wrong",
        })
      }
    } catch (error) {
      console.error("Google login error:", error)
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to connect to Google",
      })
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

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

    const result = await loginUser({ email, password })

    if (result.error) {
      setLoading(false)
      return Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: result.error,
      })
    }

    await Swal.fire({
      icon: "success",
      title: "Welcome Back!",
      text: "Login successful!",
      timer: 1500,
      showConfirmButton: false,
    })

    router.push("/dashboard")
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

      <div className="relative z-10 w-full max-w-[400px]">
        
        {/* WELCOME TEXT (Top) */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black text-white tracking-tighter">
            Welcome <span className="text-sky-500">Back</span>
          </h1>
        </div>

        {/* COMPACT CARD */}
        <div className="backdrop-blur-3xl bg-white/[0.02] rounded-[2.5rem] border border-white/10 shadow-2xl p-8">
          
          {/* HUGE LOGO SECTION */}
          <div className="flex justify-center mb-10">
            <div className="relative group">
              <div className="absolute inset-0 transition-all duration-500"></div>
              <img 
                src="white.png" 
                alt="Sub Track8 Logo" 
                className="relative h-15 w-auto scale-125 drop-shadow-[0_0_15px_rgba(14,165,233,0.4)] transition-transform duration-500 group-hover:scale-[1.35]" 
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-5 py-3.5 rounded-xl border border-white/10 bg-white/[0.04] text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-5 py-3.5 rounded-xl border border-white/10 bg-white/[0.04] text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all placeholder:text-slate-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-500 hover:bg-sky-400 text-white py-3.5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg shadow-sky-500/20 active:scale-[0.98] disabled:opacity-50 mt-4"
            >
              {loading ? "Verifying..." : "Sign In to Account"}
            </button>
          </form>

          <div className="relative flex items-center my-6">
            <div className="flex-1 border-t border-white/5"></div>
            <span className="px-3 text-[8px] font-bold text-slate-700 uppercase tracking-widest">Or Secure Login With</span>
            <div className="flex-1 border-t border-white/5"></div>
          </div>

          {/* GOOGLE BUTTON - Menyesuaikan Lebar Form */}
          <div className="flex justify-center transition-transform hover:scale-[1.02]">
            <div id="google-btn"></div>
          </div>

          <p className="text-center text-[11px] text-slate-500 mt-8">
            Don't have an account?{" "}
            <Link href="/register" className="text-sky-400 font-bold hover:text-white transition-colors">
              Sign Up
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
