import { Clock, MapPin, Mail, Phone } from 'lucide-react';
import Map from '@/components/map';

export default function ContactPage() {
  return (
    <main className="relative">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] bg-gradient-to-r from-blue-900 to-blue-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="container mx-auto px-6 h-full flex items-center justify-start relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              تماس با آهن هرمز
            </h1>
            <p className="text-lg text-white/90">
              همکاران ما در بخش پشتیبانی آماده پاسخگویی به شما هستند
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info & Form Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 -mt-24 relative z-20">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            {/* Hours Card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                    ساعات کاری
                  </h3>
                  <div className="space-y-2 text-slate-600 dark:text-slate-400">
                    <p>شنبه تا چهارشنبه: ۸:۰۰ الی ۱۷:۰۰</p>
                    <p>پنجشنبه: ۸:۰۰ الی ۱۲:۰۰</p>
                    <p>جمعه: تعطیل</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg">
              <div className="flex gap-4 items-start mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                    آدرس ما
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    بندرعباس، بلوار امام خمینی
                  </p>
                </div>
              </div>
              <Map />
            </div>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone Card */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                      تلفن تماس
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 dir-ltr">
                      076-33XXX XXX
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                      ایمیل
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      info@ahanhormoz.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6">
              ارسال پیام
            </h2>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2"
                >
                  نام و نام خانوادگی
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2"
                >
                  ایمیل
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2"
                >
                  پیام شما
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                ارسال پیام
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
