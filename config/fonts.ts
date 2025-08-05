import { Inter as FontSans } from 'next/font/google'
import localFont from 'next/font/local'

export const IranYekan = localFont({
  src: [
    {
      path: '../public/fonts/IRANYekanXFaNum-Thin.woff2',
      weight: '200',
    },
    {
      path: '../public/fonts/IRANYekanXFaNum-Light.woff2',
      weight: '300',
    },
    {
      path: '../public/fonts/IRANYekanXFaNum-Regular.woff2',
      weight: '400',
    },
    {
      path: '../public/fonts/IRANYekanXFaNum-Medium.woff2',
      weight: '500',
    },
    {
      path: '../public/fonts/IRANYekanXFaNum-DemiBold.woff2',
      weight: '600',
    },
    {
      path: '../public/fonts/IRANYekanXFaNum-Bold.woff2',
      weight: '700',
    },
    {
      path: '../public/fonts/IRANYekanXFaNum-ExtraBold.woff2',
      weight: '800',
    },
  ],
})

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})
