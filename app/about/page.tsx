import Image from 'next/image';
import Link from 'next/link';
import { Building2, Users2, Phone, Clock, Shield, Truck } from 'lucide-react';
import { Logo } from '@/components/icons';

export default function AboutPage() {
  return (
    <main className="relative">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-20 -translate-x-20"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              درباره آهن هرمز
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              فروش تخصصی انواع آهن‌آلات ساختمانی و صنعتی با تضمین اصالت و قیمت
              رقابتی
            </p>
            <div className="flex items-center justify-center gap-6 mt-8 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>ضمانت اصالت کالا و بازگشت وجه</span>
              </div>
              <div className="flex items-center gap-2">
                <Users2 className="w-4 h-4 text-yellow-400" />
                <span>امکان خرید آنلاین و تلفنی</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-300" />
                <span>پیگیری لحظه‌ای وضعیت سفارش</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container px-6 py-16 mx-auto">
        <div className="relative z-20 grid grid-cols-1 gap-8 -mt-24 md:grid-cols-3">
          <div className="p-8 bg-white shadow-lg dark:bg-slate-800 rounded-xl">
            <div className="flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-full dark:bg-blue-900/30">
              <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="mb-2 text-2xl font-bold text-slate-800 dark:text-slate-200">
              +۱۵۰
            </h3>
            <p className="text-slate-600 dark:text-slate-400">پروژه موفق</p>
          </div>
          <div className="p-8 bg-white shadow-lg dark:bg-slate-800 rounded-xl">
            <div className="flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-full dark:bg-blue-900/30">
              <Users2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="mb-2 text-2xl font-bold text-slate-800 dark:text-slate-200">
              +۲۰۰۰
            </h3>
            <p className="text-slate-600 dark:text-slate-400">مشتری راضی</p>
          </div>
          <div className="p-8 bg-white shadow-lg dark:bg-slate-800 rounded-xl">
            <div className="flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-full dark:bg-blue-900/30">
              <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="mb-2 text-2xl font-bold text-slate-800 dark:text-slate-200">
              ۱۰+
            </h3>
            <p className="text-slate-600 dark:text-slate-400">سال تجربه</p>
          </div>
        </div>

        {/* About Content */}
        <div className="grid items-center grid-cols-1 gap-12 mt-24 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold text-slate-800 dark:text-slate-200">
              درباره شرکت آهن هرمز
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-400">
              <p className="leading-relaxed">
                شرکت آهن هرمز با بیش از یک دهه تجربه در زمینه تامین و توزیع
                آهن‌آلات صنعتی و ساختمانی، به عنوان یکی از معتبرترین شرکت‌های
                فعال در این حوزه شناخته می‌شود.
              </p>
              <p className="leading-relaxed">
                ما با تکیه بر دانش فنی و تجربه کارشناسان خود، همواره در تلاشیم
                تا بهترین محصولات را با مناسب‌ترین قیمت و در کوتاه‌ترین زمان
                ممکن به مشتریان عزیز ارائه دهیم.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Logo className="h-[300px]" />
          </div>
        </div>

        {/* Services Grid */}
        <div className="mt-24">
          <h2 className="mb-12 text-3xl font-bold text-center text-slate-800 dark:text-slate-200">
            چرا آهن هرمز را انتخاب کنید؟
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-8 bg-white shadow-lg dark:bg-slate-800 rounded-xl">
              <div className="flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-full dark:bg-blue-900/30">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-800 dark:text-slate-200">
                تضمین کیفیت
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                ارائه گواهی کیفیت و تست متریال برای تمامی محصولات
              </p>
            </div>
            <div className="p-8 bg-white shadow-lg dark:bg-slate-800 rounded-xl">
              <div className="flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-full dark:bg-blue-900/30">
                <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-800 dark:text-slate-200">
                مشاوره تخصصی
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                ارائه مشاوره فنی توسط کارشناسان مجرب در تمام مراحل
              </p>
            </div>
            <div className="p-8 bg-white shadow-lg dark:bg-slate-800 rounded-xl">
              <div className="flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-full dark:bg-blue-900/30">
                <Truck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-800 dark:text-slate-200">
                ارسال سریع
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                حمل و نقل سریع و مطمئن به تمام نقاط کشور
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24">
          <div className="p-12 text-white bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="mb-2 text-2xl font-bold">
                  آماده همکاری با شما هستیم
                </h3>
                <p className="text-white/90">
                  برای دریافت مشاوره رایگان و استعلام قیمت با ما در تماس باشید
                </p>
              </div>
              <div className="flex gap-4">
                <Link
                  href="/contact"
                  className="relative px-8 py-3 font-semibold text-white transition-all duration-300 border group bg-white/10 backdrop-blur-sm border-white/20 rounded-xl hover:bg-white hover:scale-105 hover:shadow-lg hover:shadow-white/20"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-blue-600">
                    تماس با ما
                  </span>
                </Link>
                <Link
                  href="/pricing"
                  className="relative px-8 py-3 font-semibold text-white transition-all duration-300 border group bg-white/5 backdrop-blur-sm border-white/10 rounded-xl hover:bg-white/20 hover:scale-105 hover:shadow-lg hover:shadow-white/20"
                >
                  <span className="relative z-10 transition-colors duration-300">
                    لیست قیمت
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
