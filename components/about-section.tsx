'use client'

import Link from 'next/link'
import {
  ShoppingCart,
  TrendingUp,
  Award,
  Headphones,
  ChartNoAxesCombined,
} from 'lucide-react'

export default function AboutSection() {
  return (
    <section className="py-4">
      <div className="container px-4 mx-auto">
        {/* CTA Section */}
        <div className="relative p-12 mb-4 overflow-hidden text-center rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-600">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 -translate-x-32 -translate-y-32 bg-white rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 translate-x-32 translate-y-32 bg-white rounded-full"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h3 className="mb-1 text-3xl font-bold text-white md:text-4xl">
              آماده شروع همکاری هستید؟
            </h3>
            <p className="max-w-2xl mx-auto mb-8 text-lg text-blue-100">
              با آهن هرمز، خرید محصولات فولادی را با اطمینان و به بهترین قیمت
              تجربه کنید
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 border-2 border-white rounded-xl hover:bg-white hover:text-blue-600"
              >
                <ShoppingCart className="w-5 h-5 ml-2" />
                مشاهده محصولات
              </Link>
              <Link
                href="/moment-news"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 border-2 border-white rounded-xl hover:bg-white hover:text-blue-600"
              >
                <ChartNoAxesCombined className="w-5 h-5 ml-2" />
                قیمت لحظه ای
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 border-2 border-white rounded-xl hover:bg-white hover:text-blue-600"
              >
                <Headphones className="w-5 h-5 ml-2" />
                تماس با ما
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
