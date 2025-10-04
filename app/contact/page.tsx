import { Clock, MapPin, Mail, Phone } from 'lucide-react';
import Map from '@/components/map';

export default function ContactPage() {
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
              <Phone className="w-8 h-8 text-white drop-shadow-lg" />
            </div>
            <h1 className="mb-6 text-5xl font-bold text-white drop-shadow-2xl">
              تماس با آهن هرمز
            </h1>
            <p className="max-w-3xl mx-auto text-xl font-medium leading-relaxed text-white/95 drop-shadow-lg">
              همکاران ما در بخش پشتیبانی آماده پاسخگویی به شما هستند
            </p>
            <div className="flex items-center justify-center gap-6 mt-8 text-sm">
              <div className="flex items-center gap-2 px-3 py-2 border rounded-full bg-white/10 backdrop-blur-sm border-white/20">
                <Clock className="w-4 h-4 text-white drop-shadow-md" />
                <span className="font-medium text-white drop-shadow-sm">
                  پاسخگویی ۲۴ ساعته
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 border rounded-full bg-white/10 backdrop-blur-sm border-white/20">
                <Phone className="w-4 h-4 text-white drop-shadow-md" />
                <span className="font-medium text-white drop-shadow-sm">
                  مشاوره رایگان
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 border rounded-full bg-white/10 backdrop-blur-sm border-white/20">
                <MapPin className="w-4 h-4 text-white drop-shadow-md" />
                <span className="font-medium text-white drop-shadow-sm">
                  بندرعباس
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info & Form Section */}
      <div className="container px-6 py-16 mx-auto">
        <div className="relative z-20 grid grid-cols-1 gap-12 -mt-24 lg:grid-cols-2">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            {/* Hours Card */}
            <div className="relative p-8 overflow-hidden border shadow-2xl bg-white/80 dark:bg-slate-900/80 border-gray-200/60 dark:border-gray-700/50 rounded-3xl backdrop-blur-md">
              <div className="relative flex items-start gap-4">
                <div className="flex items-center justify-center w-16 h-16 mt-5 transition-all duration-300 bg-white border-2 border-gray-300 rounded-full shadow-lg dark:bg-slate-900 group shrink-0">
                  <Clock className="w-8 h-8 text-black transition-colors duration-300 dark:text-white" />
                </div>
                <div>
                  <h3 className="mb-3 mr-4 text-xl font-bold text-blue-900 dark:text-blue-100">
                    ساعات کاری
                  </h3>
                  <div className="space-y-2 font-bold text-gray-900 dark:text-gray-100">
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 text-gray-900 dark:text-gray-100"></span>
                      شنبه تا چهارشنبه: ۸:۰۰ الی ۱۷:۰۰
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 text-gray-900 dark:text-gray-100"></span>
                      پنجشنبه: ۸:۰۰ الی ۱۲:۰۰
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Phone Card */}
              <div className="relative p-8 overflow-hidden border shadow-2xl bg-white/80 dark:bg-slate-900/80 border-gray-200/60 dark:border-gray-700/50 rounded-3xl backdrop-blur-md">
                <div className="relative flex items-start gap-4">
                  <div className="flex items-center justify-center w-16 h-16 transition-all duration-300 bg-white border-2 border-gray-300 rounded-full shadow-lg dark:bg-slate-900 hover:border-blue-400 hover:shadow-2xl group shrink-0">
                    <Phone className="w-8 h-8 text-black transition-colors duration-300 dark:text-white group-hover:text-blue-500" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                      تلفن تماس
                    </h3>
                    <p className="font-medium text-gray-700 dark:text-gray-200 dir-ltr">
                      076-33XXX XXX
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="relative p-8 overflow-hidden border shadow-2xl bg-white/80 dark:bg-slate-900/80 border-gray-200/60 dark:border-gray-700/50 rounded-3xl backdrop-blur-md">
                <div className="relative flex items-start gap-4">
                  <div className="flex items-center justify-center w-16 h-16 transition-all duration-300 bg-white border-2 border-gray-300 rounded-full shadow-lg dark:bg-slate-900 hover:border-blue-400 hover:shadow-2xl group shrink-0">
                    <Mail className="w-8 h-8 text-black transition-colors duration-300 dark:text-white group-hover:text-blue-500" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                      ایمیل
                    </h3>
                    <p className="font-medium text-gray-700 dark:text-gray-200">
                      info@ahanhormoz.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Card */}
            <div className="relative p-8 overflow-hidden border shadow-2xl bg-white/80 dark:bg-slate-900/80 border-gray-200/60 dark:border-gray-700/50 rounded-3xl backdrop-blur-md">
              <div className="relative flex items-start gap-4 mb-6">
                <div className="flex items-center justify-center w-16 h-16 transition-all duration-300 bg-white border-2 border-gray-300 rounded-full shadow-lg dark:bg-slate-900 hover:border-blue-400 hover:shadow-2xl group shrink-0">
                  <MapPin className="w-8 h-8 text-black transition-colors duration-300 dark:text-white group-hover:text-blue-500" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                    آدرس ما
                  </h3>
                  <p className="font-medium text-gray-700 dark:text-gray-200">
                    بندرعباس، بلوار امام خمینی
                  </p>
                </div>
              </div>
              <div className="relative">
                <Map />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative p-8 overflow-hidden border shadow-2xl bg-white/80 dark:bg-slate-900/80 border-gray-200/60 dark:border-gray-700/50 rounded-3xl backdrop-blur-md">
            <div className="relative mb-6 text-center">
              <div className="inline-flex items-center gap-3 px-4 py-2 mb-4 border rounded-full bg-white/60 dark:bg-slate-800/60 border-gray-200/50 dark:border-gray-700/50">
                <Mail className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <span className="text-sm font-medium text-cyan-800 dark:text-cyan-200">
                  فرم تماس
                </span>
              </div>
            </div>
            {/* <h2 className="relative mb-6 text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
              ارسال پیام
            </h2> */}
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-slate-600 dark:text-slate-400"
                >
                  نام و نام خانوادگی
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border rounded-lg border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-slate-600 dark:text-slate-400"
                >
                  ایمیل
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border rounded-lg border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-slate-600 dark:text-slate-400"
                >
                  پیام شما
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
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
