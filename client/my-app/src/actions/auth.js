"use server"

import User from "@/server/models/User"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function registerUser(formData) {
  try {
    const name = formData.get("name")
    const email = formData.get("email")
    const password = formData.get("password")

    await User.register({ name, email, password })

    return { success: true, message: "Registration successful! Please login." }
  } catch (error) {
    return { error: error.message || "Registration failed" }
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
