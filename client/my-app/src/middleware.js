import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Unauthorized } from "./server/helpers/customErrors";
import { verifyToken } from "./server/helpers/jwt";
import User from "./server/models/User";
import { errorHandler } from "./server/helpers/errorHandler";

export async function middleware(req) {
  try {
    const isApi = req.nextUrl.pathname.startsWith("/api")
    if (isApi) {
      const protectedPathnames = ["/api/auth/google"]
      const pathname = req.nextUrl.pathname

      if (protectedPathnames.includes(pathname)) {
        return NextResponse.next()
      }
    }

    const protectedRoutes = ["/dashboard"]
    const pathname = req.nextUrl.pathname

    const isProtected = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    )

    if (isProtected) {
      const cookieStore = await cookies()
      const token = cookieStore.get("access_token")

      if (!token) throw new Unauthorized("Unauthorized")

      const payload = verifyToken(token.value)
      const user = await User.getUserById(payload.userId.toString())

      if (!user) throw new Unauthorized("Unauthorized")

      const newHeaders = new Headers(req.headers)
      newHeaders.set("x-user-id", user._id.toString())
      newHeaders.set("x-user-email", user.email)
      newHeaders.set("x-user-name", user.name)

      const res = NextResponse.next({
        request: {
          headers: newHeaders,
        },
      })

      return res
    }

    return NextResponse.next()
  } catch (err) {
    const { message, statusCode } = errorHandler(err)

    // If it's a page request (not API), redirect to register
    if (!req.nextUrl.pathname.startsWith("/api")) {
      return NextResponse.redirect(new URL("/register", req.url))
    }

    return NextResponse.json({ message }, { status: statusCode })
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
}
