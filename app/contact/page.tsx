import { Clock, MapPin, Mail, Phone } from 'lucide-react'
import Map from '@/components/map'

export default function ContactPage() {
  return (
    <main className='relative'>
      {/* Hero Section */}
      <div className='relative overflow-hidden text-white bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600'>
        <div className='absolute inset-0 bg-black/10'></div>
        <div className='absolute top-0 right-0 translate-x-20 -translate-y-20 rounded-full w-96 h-96 bg-white/5'></div>
        <div className='absolute bottom-0 left-0 w-64 h-64 -translate-x-20 translate-y-20 rounded-full bg-white/5'></div>

        <div className='relative px-6 py-16 mx-auto max-w-7xl'>
          <div className='text-center'>
            <div className='inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-white/10 backdrop-blur-sm'>
              <Phone className='w-8 h-8 text-white' />
            </div>
            <h1 className='mb-6 text-5xl font-bold text-transparent bg-gradient-to-r from-white to-blue-100 bg-clip-text'>
              تماس با آهن هرمز
            </h1>
            <p className='max-w-3xl mx-auto text-xl leading-relaxed opacity-90'>
              همکاران ما در بخش پشتیبانی آماده پاسخگویی به شما هستند
            </p>
            <div className='flex items-center justify-center gap-6 mt-8 text-sm'>
              <div className='flex items-center gap-2'>
                <Clock className='w-4 h-4 text-green-400' />
                <span>پاسخگویی ۲۴ ساعته</span>
              </div>
              <div className='flex items-center gap-2'>
                <Phone className='w-4 h-4 text-yellow-400' />
                <span>مشاوره رایگان</span>
              </div>
              <div className='flex items-center gap-2'>
                <MapPin className='w-4 h-4 text-blue-300' />
                <span>بندرعباس</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info & Form Section */}
      <div className='container px-6 py-16 mx-auto'>
        <div className='relative z-20 grid grid-cols-1 gap-12 -mt-24 lg:grid-cols-2'>
          {/* Contact Info Cards */}
          <div className='space-y-6'>
            {/* Hours Card */}
            <div className='p-8 bg-white shadow-lg dark:bg-slate-800 rounded-xl'>
              <div className='flex items-start gap-4'>
                <div className='flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full dark:bg-blue-900/30 shrink-0'>
                  <Clock className='w-6 h-6 text-blue-600 dark:text-blue-400' />
                </div>
                <div>
                  <h3 className='mb-2 text-xl font-bold text-slate-800 dark:text-slate-200'>
                    ساعات کاری
                  </h3>
                  <div className='space-y-2 text-slate-600 dark:text-slate-400'>
                    <p>شنبه تا چهارشنبه: ۸:۰۰ الی ۱۷:۰۰</p>
                    <p>پنجشنبه: ۸:۰۰ الی ۱۲:۰۰</p>
                    <p>جمعه: تعطیل</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Cards */}
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              {/* Phone Card */}
              <div className='p-8 bg-white shadow-lg dark:bg-slate-800 rounded-xl'>
                <div className='flex items-start gap-4'>
                  <div className='flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full dark:bg-blue-900/30 shrink-0'>
                    <Phone className='w-6 h-6 text-blue-600 dark:text-blue-400' />
                  </div>
                  <div>
                    <h3 className='mb-2 text-xl font-bold text-slate-800 dark:text-slate-200'>
                      تلفن تماس
                    </h3>
                    <p className='text-slate-600 dark:text-slate-400 dir-ltr'>
                      076-33XXX XXX
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className='p-8 bg-white shadow-lg dark:bg-slate-800 rounded-xl'>
                <div className='flex items-start gap-4'>
                  <div className='flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full dark:bg-blue-900/30 shrink-0'>
                    <Mail className='w-6 h-6 text-blue-600 dark:text-blue-400' />
                  </div>
                  <div>
                    <h3 className='mb-2 text-xl font-bold text-slate-800 dark:text-slate-200'>
                      ایمیل
                    </h3>
                    <p className='text-slate-600 dark:text-slate-400'>
                      info@ahanhormoz.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Card */}
            <div className='p-8 bg-white shadow-lg dark:bg-slate-800 rounded-xl'>
              <div className='flex items-start gap-4 mb-4'>
                <div className='flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full dark:bg-blue-900/30 shrink-0'>
                  <MapPin className='w-6 h-6 text-blue-600 dark:text-blue-400' />
                </div>
                <div>
                  <h3 className='mb-2 text-xl font-bold text-slate-800 dark:text-slate-200'>
                    آدرس ما
                  </h3>
                  <p className='text-slate-600 dark:text-slate-400'>
                    بندرعباس، بلوار امام خمینی
                  </p>
                </div>
              </div>
              <Map />
            </div>
          </div>

          {/* Contact Form */}
          <div className='p-8 bg-white shadow-lg dark:bg-slate-800 rounded-xl'>
            <h2 className='mb-6 text-2xl font-bold text-slate-800 dark:text-slate-200'>
              ارسال پیام
            </h2>
            <form className='space-y-6'>
              <div>
                <label
                  htmlFor='name'
                  className='block mb-2 text-sm font-medium text-slate-600 dark:text-slate-400'
                >
                  نام و نام خانوادگی
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  className='w-full px-4 py-2 border rounded-lg border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white'
                />
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium text-slate-600 dark:text-slate-400'
                >
                  ایمیل
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  className='w-full px-4 py-2 border rounded-lg border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white'
                />
              </div>
              <div>
                <label
                  htmlFor='message'
                  className='block mb-2 text-sm font-medium text-slate-600 dark:text-slate-400'
                >
                  پیام شما
                </label>
                <textarea
                  id='message'
                  name='message'
                  rows={4}
                  className='w-full px-4 py-2 border rounded-lg border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white'
                ></textarea>
              </div>
              <button
                type='submit'
                className='w-full px-6 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700'
              >
                ارسال پیام
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
