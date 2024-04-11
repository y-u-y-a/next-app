import { NextResponse } from "next/server"

/**
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware
 * @see https://next-auth.js.org/configuration/nextjs#middleware
 * */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}

export async function middleware() {
  return NextResponse.next()
}
