"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { loginUser } from "@/actions/auth"
import Swal from "sweetalert2"
import Link from "next/link"

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

    router.push("/")
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            Welcome <span className="text-sky-500">Back.</span>
          </h1>
          <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.2em] mt-2">
            Sign in to manage your subscriptions
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm font-medium placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm font-medium placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-sky-500 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-slate-100"></div>
            <span className="px-4 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
              Or
            </span>
            <div className="flex-1 border-t border-slate-100"></div>
          </div>

          <div className="flex justify-center">
            <div id="google-btn"></div>
          </div>

          <p className="text-center text-sm text-slate-400 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-sky-500 font-bold hover:text-sky-600 transition-colors">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
