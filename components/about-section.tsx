'use client';

import Link from 'next/link';
import {
  ShoppingCart,
  TrendingUp,
  Award,
  Headphones,
  Package,
  Truck,
  Shield,
  Clock,
  ArrowLeft,
  Factory,
} from 'lucide-react';

export default function AboutSection() {
  const features = [
    {
      icon: TrendingUp,
      title: 'قیمت‌های روز',
      description: 'بروزترین قیمت‌های بازار آهن و فولاد',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Package,
      title: 'تنوع محصولات',
      description: 'دسترسی به تمام انواع محصولات فولادی',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Shield,
      title: 'خرید مطمئن',
      description: 'ضمانت اصالت و کیفیت محصولات',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Truck,
      title: 'ارسال سریع',
      description: 'ارسال به سراسر کشور با بهترین قیمت',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: Headphones,
      title: 'پشتیبانی 24/7',
      description: 'همراه شما در تمام مراحل خرید',
      color: 'from-pink-500 to-pink-600',
    },
    {
      icon: Award,
      title: 'تضمین کیفیت',
      description: 'محصولات با استاندارد بالا',
      color: 'from-indigo-500 to-indigo-600',
    },
  ];

  const quickLinks = [
    { title: 'محصولات', href: '/products', icon: Package },
    { title: 'کارخانه ها', href: '/manufacturers', icon: Factory },
    { title: 'قیمت لحظه ای', href: '/moment-news', icon: TrendingUp },
    { title: 'تماس با ما', href: '/contact', icon: Headphones },
  ];

  return (
    <section className="py-10">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            <span className="text-transparent bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 bg-clip-text">
              چرا آهن هرمز؟
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            آهن هرمز، پلتفرم جامع خرید و فروش محصولات فولادی با ارائه قیمت‌های
            روز بازار، تنوع محصولات و خدمات پس از فروش برتر، همراه شما در تمام
            مراحل خرید است.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative p-6 overflow-hidden transition-all duration-300 bg-white border border-gray-200 group rounded-2xl dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Background Gradient on Hover */}
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-800/10 dark:to-blue-900/10 group-hover:opacity-100"></div>

              {/* Content */}
              <div className="relative z-10">
                <div
                  className={`inline-flex p-4 mb-4 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>

              {/* Decorative Element */}
              <div className="absolute w-40 h-40 transition-all duration-300 rounded-full opacity-0 -top-20 -right-20 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 blur-3xl group-hover:opacity-100"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="relative p-12 mb-12 overflow-hidden text-center rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-600">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 -translate-x-32 -translate-y-32 bg-white rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 translate-x-32 translate-y-32 bg-white rounded-full"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h3 className="mb-4 text-3xl font-bold text-white md:text-4xl">
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
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 border-2 border-white rounded-xl hover:bg-white hover:text-blue-600"
              >
                <Headphones className="w-5 h-5 ml-2" />
                تماس با ما
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-15 ">
          <h3 className="mb-8 text-3xl font-bold text-center text-gray-900 dark:text-white">
            دسترسی سریع
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="relative overflow-hidden transition-all duration-300 group"
              >
                <div className="p-6 bg-white border border-gray-200 rounded-2xl dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-500">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 transition-transform duration-300 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 group-hover:scale-110">
                      <link.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <ArrowLeft className="w-5 h-5 text-gray-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    {link.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
