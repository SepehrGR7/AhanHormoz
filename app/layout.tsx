import '@/styles/globals.css'
import '@/styles/icomoon.css'
import 'leaflet/dist/leaflet.css'
import { Metadata, Viewport } from 'next'
import clsx from 'clsx'

import { Providers } from './providers'

import { siteConfig } from '@/config/site'
import { IranYekan } from '@/config/fonts'
import { Navbar } from '@/components/navbar'
import Footer from '@/components/footer'
import FloatingOrderButton from '@/components/floating-order-button'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang='en'>
      <head />
      <body
        dir='rtl'
        className={clsx(
          'min-h-screen text-foreground bg-background antialiased',
          IranYekan.className,
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <div className='relative flex flex-col'>
            <Navbar />
            <main className='container flex-grow mx-auto max-w-8xl md:px-6'>
              {children}
            </main>
            <Footer />
            {/* <FloatingOrderButton /> */}
          </div>
        </Providers>
      </body>
    </html>
  )
}
