import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { env } from './lib/env'

export const middleware = async (request: NextRequest) => {
  const session = await getToken({
    req: request,
    secret: env.NEXTAUTH_SECRET,
  })

  if (request.nextUrl.pathname.endsWith('/')) {
    if (!session) {
      const url = new URL(`/login`, request.url)
      return NextResponse.redirect(url)
    }
  }

  if (request.nextUrl.pathname.startsWith('/login')) {
    if (session) {
      const url = new URL('/', request.url)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/:path', '/login'],
}
