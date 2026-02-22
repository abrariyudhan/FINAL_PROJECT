"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { registerUser } from "@/actions/auth"
import Swal from "sweetalert2"
import Link from "next/link"

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
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md">
      
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            Create <span className="text-sky-500">Account.</span>
          </h1>
          <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.2em] mt-2">
            Join us and manage your subscriptions
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
       
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm font-medium placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm font-medium placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
              />
            </div>

           
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
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
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 5 characters"
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm font-medium placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="08xxxxxxxxxx"
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm font-medium placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
              />
            </div>

         
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-sky-500 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        
          <p className="text-center text-sm text-slate-400 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-sky-500 font-bold hover:text-sky-600 transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
