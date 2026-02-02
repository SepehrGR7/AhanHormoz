/**
 * In-memory rate limiter for admin login attempts
 * Limits: 5 attempts per IP per 15 minutes
 */

interface RateLimitEntry {
  attempts: number
  resetTime: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000 // 15 minutes in milliseconds

/**
 * Clean up expired entries periodically
 */
const cleanupInterval = setInterval(() => {
  const now = Date.now()
  const entries = Array.from(rateLimitMap.entries())
  for (const [ip, entry] of entries) {
    if (entry.resetTime < now) {
      rateLimitMap.delete(ip)
    }
  }
}, 5 * 60 * 1000) // Clean up every 5 minutes

/**
 * Check if an IP address has exceeded the rate limit
 * @param ip - The IP address to check
 * @returns Object with isLimited (boolean) and remainingMinutes (number)
 */
export function checkRateLimit(ip: string): {
  isLimited: boolean
  remainingMinutes: number
} {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  // No entry exists, create a new one
  if (!entry) {
    rateLimitMap.set(ip, {
      attempts: 1,
      resetTime: now + WINDOW_MS,
    })
    return { isLimited: false, remainingMinutes: 0 }
  }

  // Entry exists but window has expired
  if (entry.resetTime < now) {
    rateLimitMap.set(ip, {
      attempts: 1,
      resetTime: now + WINDOW_MS,
    })
    return { isLimited: false, remainingMinutes: 0 }
  }

  // Entry exists and window is still active
  if (entry.attempts >= MAX_ATTEMPTS) {
    const remainingMs = entry.resetTime - now
    const remainingMinutes = Math.ceil(remainingMs / (60 * 1000))
    return { isLimited: true, remainingMinutes }
  }

  // Increment attempts
  entry.attempts++
  rateLimitMap.set(ip, entry)
  return { isLimited: false, remainingMinutes: 0 }
}

/**
 * Get the client IP address from a request
 * @param request - The request object
 * @returns The IP address string
 */
export function getClientIP(request: Request): string {
  // Try to get IP from various headers (for proxies/load balancers)
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }

  // Fallback (in serverless environments, this might not be available)
  return 'unknown'
}

/**
 * Reset rate limit for an IP (useful for testing or manual resets)
 * @param ip - The IP address to reset
 */
export function resetRateLimit(ip: string): void {
  rateLimitMap.delete(ip)
}
