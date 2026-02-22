import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function proxy(req) {
  try {
    const pathname = req.nextUrl.pathname

    // Allow Google auth route to pass through without any checks
    if (pathname === "/api/auth/google") {
      return NextResponse.next()
    }

    const protectedRoutes = ["/dashboard"]

    const isProtected = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    )

    if (isProtected) {
      const cookieStore = await cookies()
      const token = cookieStore.get("access_token")

      if (!token) {
        if (!pathname.startsWith("/api")) {
          return NextResponse.redirect(new URL("/login", req.url))
        }
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
      }

      // Dynamic import to avoid Edge Runtime issues
      const { verifyToken } = await import("./server/helpers/jwt")
      const User = (await import("./server/models/User")).default

      const payload = verifyToken(token.value)
      const user = await User.getUserById(payload.userId.toString())

      if (!user) {
        if (!pathname.startsWith("/api")) {
          return NextResponse.redirect(new URL("/login", req.url))
        }
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
      }

      const newHeaders = new Headers(req.headers)
      newHeaders.set("x-user-id", user._id.toString())
      newHeaders.set("x-user-email", user.email)
      newHeaders.set("x-user-fullname", user.fullname || "")

      const res = NextResponse.next({
        request: {
          headers: newHeaders,
        },
      })

      return res
    }

    return NextResponse.next()
  } catch (err) {
    // If it's a page request (not API), redirect to login
    if (!req.nextUrl.pathname.startsWith("/api")) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
}
