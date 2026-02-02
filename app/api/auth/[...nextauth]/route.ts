import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'
import { checkRateLimit, getClientIP } from '@/lib/rate-limit'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const handler = NextAuth(authOptions)

// Wrap the handler to add rate limiting for sign-in requests
export async function POST(
  request: NextRequest,
  { params }: { params: { nextauth: string[] } }
) {
  // Check if this is a sign-in request by checking the pathname
  const pathname = request.nextUrl.pathname
  const isSignIn = pathname.includes('/signin')
  
  if (isSignIn) {
    const ip = getClientIP(request)
    const rateLimit = checkRateLimit(ip)
    
    if (rateLimit.isLimited) {
      // Redirect to login page with error query parameter
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('error', 'RateLimitExceeded')
      loginUrl.searchParams.set('minutes', rateLimit.remainingMinutes.toString())
      return NextResponse.redirect(loginUrl)
    }
  }

  // Clone the request to read body without consuming it
  const clonedRequest = request.clone()
  const formData = await clonedRequest.formData()
  const email = formData.get('email')?.toString()

  // Pass the original request to NextAuth (it will read the body itself)
  const response = await handler(request as any, { params } as any)
  
  // Check if response is a redirect to error page - might be AccountLocked
  if (response instanceof Response && response.status === 307) {
    const location = response.headers.get('location')
    if (location?.includes('error=CredentialsSignin') && email) {
      // Check if account is locked and get remaining minutes
      try {
        const user = await prisma.user.findUnique({
          where: { email },
          select: { lockedUntil: true },
        })
        
        if (user?.lockedUntil && user.lockedUntil > new Date()) {
          const remainingMs = user.lockedUntil.getTime() - Date.now()
          const remainingMinutes = Math.ceil(remainingMs / (60 * 1000))
          
          // Update the redirect URL to include AccountLocked error and minutes
          const loginUrl = new URL('/admin/login', request.url)
          loginUrl.searchParams.set('error', 'AccountLocked')
          loginUrl.searchParams.set('minutes', remainingMinutes.toString())
          return NextResponse.redirect(loginUrl)
        }
      } catch (error) {
        // If error querying DB, just return the original response
        console.error('Error checking account lockout:', error)
      }
    }
  }
  
  return response
}

export async function GET(
  request: NextRequest,
  { params }: { params: { nextauth: string[] } }
) {
  return handler(request as any, { params } as any)
}
