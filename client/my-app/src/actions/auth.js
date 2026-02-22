"use server"

import User from "@/server/models/User"
import { comparePassword } from "@/server/helpers/bcrypt"
import { signToken } from "@/server/helpers/jwt"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function registerUser({ fullname, username, email, password, phoneNumber }) {
  try {

    await User.register({ fullname, username, email, password, phoneNumber })

    return { success: true, message: "Registration successful! Please login." }
  } catch (error) {
    return { error: error.message || "Registration failed" }
  }
}

export async function loginUser({ email, password }) {
  try {
    if (!email || !email.trim()) {
      throw new Error("Email is required")
    }

    if (!password || password.length < 5) {
      throw new Error("Password must be at least 5 characters")
    }

    const user = await User.findByEmail(email)
    if (!user) {
      throw new Error("Invalid email or password")
    }

    if (!user.password) {
      throw new Error("This account uses Google login. Please sign in with Google.")
    }

    const isValid = comparePassword(password, user.password)
    if (!isValid) {
      throw new Error("Invalid email or password")
    }

    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      fullname: user.fullname,
    })

    const cookieStore = await cookies()
    cookieStore.set("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })

    return { success: true }
  } catch (error) {
    return { error: error.message || "Login failed" }
  }
}

export async function logoutUser() {
  const cookieStore = await cookies()
  cookieStore.delete("access_token")
  redirect("/register")
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("access_token")
    
    if (!token) return null

    const { verifyToken } = await import("@/server/helpers/jwt")
    const decoded = verifyToken(token.value)
    return decoded
  } catch {
    return null
  }
}
