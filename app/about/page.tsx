import Image from 'next/image'
import Link from 'next/link'
import { Building2, Users2, Phone, Clock, Shield, Truck } from 'lucide-react'
import { Logo } from '@/components/icons'

export default function AboutPage() {
  return (
    <main className='relative'>
      {/* Hero Section with Background */}
      <div className='relative h-[300px] md:h-[400px] bg-gradient-to-r from-blue-900 to-blue-700 overflow-hidden'>
        <div className='absolute inset-0 bg-black/30' />
        <div className='container relative z-10 flex items-center justify-start h-full px-6 mx-auto'>
          <div className='max-w-2xl'>
            <h1 className='mb-4 text-4xl font-extrabold text-white md:text-5xl'>
              درباره آهن هرمز
            </h1>
            <p className='text-lg text-white/90'>
              پیشگام در تامین آهن‌آلات صنعتی و ساختمانی با بیش از یک دهه تجربه درخشان
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className='container px-6 py-16 mx-auto'>
        <div className='relative z-20 grid grid-cols-1 gap-8 -mt-24 md:grid-cols-3'>
          <div className='p-8 bg-white shadow-lg dark:bg-slate-800 rounded-xl'>
            <div className='flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-full dark:bg-blue-900/30'>
              <Building2 className='w-6 h-6 text-blue-600 dark:text-blue-400' />
            </div>
            <h3 className='mb-2 text-2xl font-bold text-slate-800 dark:text-slate-200'>
              +۱۵۰
            </h3>
            <p className='text-slate-600 dark:text-slate-400'>پروژه موفق</p>
          </div>
          <div className='p-8 bg-white shadow-lg dark:bg-slate-800 rounded-xl'>
            <div className='flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-full dark:bg-blue-900/30'>
              <Users2 className='w-6 h-6 text-blue-600 dark:text-blue-400' />
            </div>
            <h3 className='mb-2 text-2xl font-bold text-slate-800 dark:text-slate-200'>
              +۲۰۰۰
            </h3>
            <p className='text-slate-600 dark:text-slate-400'>مشتری راضی</p>
          </div>
          <div className='p-8 bg-white shadow-lg dark:bg-slate-800 rounded-xl'>
            <div className='flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-full dark:bg-blue-900/30'>
              <Clock className='w-6 h-6 text-blue-600 dark:text-blue-400' />
            </div>
            <h3 className='mb-2 text-2xl font-bold text-slate-800 dark:text-slate-200'>
              ۱۰+
            </h3>
            <p className='text-slate-600 dark:text-slate-400'>سال تجربه</p>
          </div>
        </div>

        {/* About Content */}
        <div className='grid items-center grid-cols-1 gap-12 mt-24 md:grid-cols-2'>
          <div>
            <h2 className='mb-6 text-3xl font-bold text-slate-800 dark:text-slate-200'>
              درباره شرکت آهن هرمز
            </h2>
            <div className='space-y-4 text-slate-600 dark:text-slate-400'>
              <p className='leading-relaxed'>
                شرکت آهن هرمز با بیش از یک دهه تجربه در زمینه تامین و توزیع آهن‌آلات
                صنعتی و ساختمانی، به عنوان یکی از معتبرترین شرکت‌های فعال در این حوزه
                شناخته می‌شود.
              </p>
              <p className='leading-relaxed'>
                ما با تکیه بر دانش فنی و تجربه کارشناسان خود، همواره در تلاشیم تا
                بهترین محصولات را با مناسب‌ترین قیمت و در کوتاه‌ترین زمان ممکن به
                مشتریان عزیز ارائه دهیم.
              </p>
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <Logo className='h-[300px]' />
            {/* <Image
              src="/Vector.svg"
              alt="تصویر شرکت"
              fill
              className="object-cover"
            /> */}
          </div>
        </div>

        {/* Services Grid */}
        <div className='mt-24'>
          <h2 className='mb-12 text-3xl font-bold text-center text-slate-800 dark:text-slate-200'>
            چرا آهن هرمز را انتخاب کنید؟
          </h2>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            <div className='p-8 bg-white shadow-lg dark:bg-slate-800 rounded-xl'>
              <div className='flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-full dark:bg-blue-900/30'>
                <Shield className='w-6 h-6 text-blue-600 dark:text-blue-400' />
              </div>
              <h3 className='mb-3 text-xl font-bold text-slate-800 dark:text-slate-200'>
                تضمین کیفیت
              </h3>
              <p className='text-slate-600 dark:text-slate-400'>
                ارائه گواهی کیفیت و تست متریال برای تمامی محصولات
              </p>
            </div>
            <div className='p-8 bg-white shadow-lg dark:bg-slate-800 rounded-xl'>
              <div className='flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-full dark:bg-blue-900/30'>
                <Phone className='w-6 h-6 text-blue-600 dark:text-blue-400' />
              </div>
              <h3 className='mb-3 text-xl font-bold text-slate-800 dark:text-slate-200'>
                مشاوره تخصصی
              </h3>
              <p className='text-slate-600 dark:text-slate-400'>
                ارائه مشاوره فنی توسط کارشناسان مجرب در تمام مراحل
              </p>
            </div>
            <div className='p-8 bg-white shadow-lg dark:bg-slate-800 rounded-xl'>
              <div className='flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-full dark:bg-blue-900/30'>
                <Truck className='w-6 h-6 text-blue-600 dark:text-blue-400' />
              </div>
              <h3 className='mb-3 text-xl font-bold text-slate-800 dark:text-slate-200'>
                ارسال سریع
              </h3>
              <p className='text-slate-600 dark:text-slate-400'>
                حمل و نقل سریع و مطمئن به تمام نقاط کشور
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className='mt-24'>
          <div className='p-12 text-white bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl'>
            <div className='flex flex-col gap-8 md:flex-row md:items-center md:justify-between'>
              <div>
                <h3 className='mb-2 text-2xl font-bold'>
                  آماده همکاری با شما هستیم
                </h3>
                <p className='text-white/90'>
                  برای دریافت مشاوره رایگان و استعلام قیمت با ما در تماس باشید
                </p>
              </div>
              <div className='flex gap-4'>
                <Link
                  href='/contact'
                  className='relative px-8 py-3 font-semibold text-white transition-all duration-300 border group bg-white/10 backdrop-blur-sm border-white/20 rounded-xl hover:bg-white hover:scale-105 hover:shadow-lg hover:shadow-white/20'
                >
                  <span className='relative z-10 transition-colors duration-300 group-hover:text-blue-600'>
                    تماس با ما
                  </span>
                </Link>
                <Link
                  href='/pricing'
                  className='relative px-8 py-3 font-semibold text-white transition-all duration-300 border group bg-white/5 backdrop-blur-sm border-white/10 rounded-xl hover:bg-white/20 hover:scale-105 hover:shadow-lg hover:shadow-white/20'
                >
                  <span className='relative z-10 transition-colors duration-300'>
                    لیست قیمت
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
