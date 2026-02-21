import { OAuth2Client } from "google-auth-library"
import User from "@/server/models/User"
import { signToken } from "@/server/helpers/jwt"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const client = new OAuth2Client(process.env.NEXT_PUBLIC_CLIENT_ID)

export async function POST(request) {
  try {
    const { credential } = await request.json()

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.NEXT_PUBLIC_CLIENT_ID,
    })

    const payload = ticket.getPayload()
    const { name, email, picture } = payload

    const user = await User.findOrCreateGoogleUser({
      name,
      email,
      avatar: picture,
    })

    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
    })

    const cookieStore = await cookies()
    cookieStore.set("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Google auth error:", error)
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 401 }
    )
  }
}
