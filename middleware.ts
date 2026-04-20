// middleware.ts
import { auth } from "@/auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isProtected =
    req.nextUrl.pathname.startsWith("/dashboard") ||
    req.nextUrl.pathname.startsWith("/roast")

  if (isProtected && !isLoggedIn) {
    return Response.redirect(new URL("/auth/signin", req.nextUrl))
  }
})

export const config = {
  matcher: ["/dashboard/:path*", "/roast/:path*"],
}
