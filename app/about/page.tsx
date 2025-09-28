import Image from 'next/image';
import Link from 'next/link';
import { Building2, Users2, Phone, Clock, Shield, Truck } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="relative">
      {/* Hero Section with Background */}
      <div className="relative h-[300px] md:h-[400px] bg-gradient-to-r from-blue-900 to-blue-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="container mx-auto px-6 h-full flex items-center justify-start relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              درباره آهن هرمز
            </h1>
            <p className="text-lg text-white/90">
              پیشگام در تامین آهن‌آلات صنعتی و ساختمانی با بیش از یک دهه تجربه
              درخشان
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-24 relative z-20">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
              +۱۵۰
            </h3>
            <p className="text-slate-600 dark:text-slate-400">پروژه موفق</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
              <Users2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
              +۲۰۰۰
            </h3>
            <p className="text-slate-600 dark:text-slate-400">مشتری راضی</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
              ۱۰+
            </h3>
            <p className="text-slate-600 dark:text-slate-400">سال تجربه</p>
          </div>
        </div>

        {/* About Content */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6">
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
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/Vector.svg"
              alt="تصویر شرکت"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-12 text-center">
            چرا آهن هرمز را انتخاب کنید؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3">
                تضمین کیفیت
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                ارائه گواهی کیفیت و تست متریال برای تمامی محصولات
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3">
                مشاوره تخصصی
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                ارائه مشاوره فنی توسط کارشناسان مجرب در تمام مراحل
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3">
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
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl p-12 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  آماده همکاری با شما هستیم
                </h3>
                <p className="text-white/90">
                  برای دریافت مشاوره رایگان و استعلام قیمت با ما در تماس باشید
                </p>
              </div>
              <div className="flex gap-4">
                <Link
                  href="/contact"
                  className="relative group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-white hover:scale-105 hover:shadow-lg hover:shadow-white/20"
                >
                  <span className="relative z-10 group-hover:text-blue-600 transition-colors duration-300">
                    تماس با ما
                  </span>
                </Link>
                <Link
                  href="/pricing"
                  className="relative group bg-white/5 backdrop-blur-sm border border-white/10 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-lg hover:shadow-white/20"
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
