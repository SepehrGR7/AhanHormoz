'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import Footer from '@/components/footer'
import FloatingOrderButton from '@/components/floating-order-button'

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  if (isAdminRoute) {
    // Admin pages: no navbar, footer, or floating button
    return <>{children}</>
  }

  // Regular pages: show navbar, footer, and floating button
  return (
    <div className='relative flex flex-col'>
      <Navbar />
      <main className='container flex-grow mx-auto max-w-8xl md:px-6'>
        {children}
      </main>
      <Footer />
      {/* <FloatingOrderButton /> */}
    </div>
  )
}
