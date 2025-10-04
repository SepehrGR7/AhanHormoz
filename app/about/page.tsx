import Image from 'next/image';
import Link from 'next/link';
import { Building2, Users2, Phone, Clock, Shield, Truck } from 'lucide-react';
import { Logo } from '@/components/icons';

export default function AboutPage() {
  return (
    <main className="relative">
      {/* Hero Section */}
      <div className="relative overflow-hidden text-white bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 translate-x-20 -translate-y-20 rounded-full w-96 h-96 bg-white/5"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 -translate-x-20 translate-y-20 rounded-full bg-white/5"></div>

        <div className="relative px-6 py-16 mx-auto max-w-7xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 border-2 rounded-full shadow-2xl bg-white/20 backdrop-blur-md border-white/30">
              <Building2 className="w-8 h-8 text-white drop-shadow-lg" />
            </div>
            <h1 className="mb-6 text-5xl font-bold text-white drop-shadow-2xl">
              درباره آهن هرمز
            </h1>
            <p className="max-w-3xl mx-auto text-xl font-medium leading-relaxed text-white/95 drop-shadow-lg">
              فروش تخصصی انواع آهن‌آلات ساختمانی و صنعتی با تضمین اصالت و قیمت
              رقابتی
            </p>
            <div className="flex items-center justify-center gap-6 mt-8 text-sm">
              <div className="flex items-center gap-2 px-3 py-2 border rounded-full bg-white/10 backdrop-blur-sm border-white/20">
                <Shield className="w-4 h-4 text-white drop-shadow-md" />
                <span className="font-medium text-white drop-shadow-sm">
                  ضمانت اصالت کالا و بازگشت وجه
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 border rounded-full bg-white/10 backdrop-blur-sm border-white/20">
                <Users2 className="w-4 h-4 text-white drop-shadow-md" />
                <span className="font-medium text-white drop-shadow-sm">
                  امکان خرید آنلاین و تلفنی
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 border rounded-full bg-white/10 backdrop-blur-sm border-white/20">
                <Clock className="w-4 h-4 text-white drop-shadow-md" />
                <span className="font-medium text-white drop-shadow-sm">
                  پیگیری لحظه‌ای وضعیت سفارش
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container px-6 py-16 mx-auto">
        <div className="relative z-20 grid grid-cols-1 gap-8 -mt-24 md:grid-cols-3">
          <div className="relative p-8 overflow-hidden border shadow-2xl bg-white/80 dark:bg-slate-900/80 border-gray-200/60 dark:border-gray-700/50 rounded-3xl backdrop-blur-md">
            <div className="relative text-center">
              <div className="inline-flex items-center gap-3 px-4 py-2 mb-4 border rounded-full bg-white/60 dark:bg-slate-800/60 border-gray-200/50 dark:border-gray-700/50">
                <Building2 className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                <span className="text-sm font-medium text-cyan-800 dark:text-cyan-200">
                  پروژه
                </span>
              </div>
              <h3 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
                +۱۵۰
              </h3>
              <p className="font-medium text-gray-600 dark:text-gray-300">
                پروژه موفق
              </p>
            </div>
          </div>
          <div className="relative p-8 overflow-hidden border shadow-2xl bg-white/80 dark:bg-slate-900/80 border-gray-200/60 dark:border-gray-700/50 rounded-3xl backdrop-blur-md">
            <div className="relative text-center">
              <div className="inline-flex items-center gap-3 px-4 py-2 mb-4 border rounded-full bg-white/60 dark:bg-slate-800/60 border-gray-200/50 dark:border-gray-700/50">
                <Users2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  مشتری
                </span>
              </div>
              <h3 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
                +۲۰۰۰
              </h3>
              <p className="font-medium text-gray-600 dark:text-gray-300">
                مشتری راضی
              </p>
            </div>
          </div>
          <div className="relative p-8 overflow-hidden border shadow-2xl bg-white/80 dark:bg-slate-900/80 border-gray-200/60 dark:border-gray-700/50 rounded-3xl backdrop-blur-md">
            <div className="relative text-center">
              <div className="inline-flex items-center gap-3 px-4 py-2 mb-4 border rounded-full bg-white/60 dark:bg-slate-800/60 border-gray-200/50 dark:border-gray-700/50">
                <Clock className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                <span className="text-sm font-medium text-indigo-800 dark:text-indigo-200">
                  تجربه
                </span>
              </div>
              <h3 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
                ۱۰+
              </h3>
              <p className="font-medium text-gray-600 dark:text-gray-300">
                سال تجربه
              </p>
            </div>
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
            <div className="relative p-8 overflow-hidden border border-green-100 shadow-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 dark:bg-card rounded-3xl dark:border-green-800 backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-20 h-20 translate-x-10 -translate-y-10 rounded-full bg-green-100/30 dark:bg-green-900/20"></div>
              <div className="relative">
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full shadow-lg bg-gradient-to-br from-green-500 to-green-600">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-green-900 dark:text-green-100">
                  تضمین کیفیت
                </h3>
                <p className="text-green-700 dark:text-green-200">
                  ارائه گواهی کیفیت و تست متریال برای تمامی محصولات
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500/20 to-transparent"></div>
            </div>
            <div className="relative p-8 overflow-hidden border border-blue-100 shadow-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50 dark:bg-card rounded-3xl dark:border-blue-800 backdrop-blur-sm">
              <div className="absolute bottom-0 left-0 w-24 h-24 -translate-x-12 translate-y-12 rounded-full bg-blue-100/30 dark:bg-blue-900/20"></div>
              <div className="relative">
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full shadow-lg bg-gradient-to-br from-blue-500 to-blue-600">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-blue-900 dark:text-blue-100">
                  مشاوره تخصصی
                </h3>
                <p className="text-blue-700 dark:text-blue-200">
                  ارائه مشاوره فنی توسط کارشناسان مجرب در تمام مراحل
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
            </div>
            <div className="relative p-8 overflow-hidden border border-orange-100 shadow-2xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/50 dark:to-red-950/50 dark:bg-card rounded-3xl dark:border-orange-800 backdrop-blur-sm">
              <div className="absolute top-0 left-0 w-16 h-16 -translate-x-8 -translate-y-8 rounded-full bg-orange-100/30 dark:bg-orange-900/20"></div>
              <div className="relative">
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full shadow-lg bg-gradient-to-br from-orange-500 to-red-500">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-orange-900 dark:text-orange-100">
                  ارسال سریع
                </h3>
                <p className="text-orange-700 dark:text-orange-200">
                  حمل و نقل سریع و مطمئن به تمام نقاط کشور
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"></div>
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
