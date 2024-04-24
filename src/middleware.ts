import { type NextRequest, NextResponse } from "next/server"

/**
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware
 * @see https://next-auth.js.org/configuration/nextjs#middleware
 * */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
  ],
}

export async function middleware(req: NextRequest) {
  console.log(`nextpath >>> ${req.nextUrl.pathname}`)

  return NextResponse.next()
}
