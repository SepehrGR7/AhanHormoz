'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PRODUCT_CATEGORIES, PRODUCT_ROUTES } from '@/types/products';
import { ArrowLeft } from 'lucide-react';

export default function ProductsPage() {
  // آیکون‌های مناسب برای هر دسته محصول
  const getCategoryIcon = (categoryId: string) => {
    const iconMap: { [key: string]: string } = {
      rebar: 'icon-milgerd',
      profile: 'icon-profil',
      sheet: 'icon-varagh',
      angle: 'icon-Corners',
      beam: 'icon-girder',
      pipe: 'icon-pipe',
      wire: 'icon-wire',
      mesh: 'icon-grating',
      shamsh: 'icon-bullion',
    };
    return iconMap[categoryId] || 'icon-Equipment';
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="relative overflow-hidden text-white bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 translate-x-20 -translate-y-20 rounded-full w-96 h-96 bg-white/5"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 -translate-x-20 translate-y-20 rounded-full bg-white/5"></div>

        <div className="container relative px-6 py-16 mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mx-auto mb-6 border-2 rounded-full shadow-2xl bg-white/20 backdrop-blur-md border-white/30">
              <i className="text-3xl text-white icon-warehouse drop-shadow-lg"></i>
            </div>
            <h1 className="mb-6 text-5xl font-bold text-white drop-shadow-2xl">
              محصولات آهن هرمز
            </h1>
            <p className="max-w-3xl mx-auto text-xl font-medium leading-relaxed text-white/95 drop-shadow-lg">
              مجموعه کاملی از محصولات فولادی با کیفیت برتر، قیمت مناسب و تضمین
              اصالت
            </p>
            <div className="flex items-center justify-center gap-6 mt-8 text-sm">
              <div className="flex items-center gap-2 px-3 py-2 border rounded-full bg-white/10 backdrop-blur-sm border-white/20">
                <i className="text-white icon-Check-mark drop-shadow-md"></i>
                <span className="font-medium text-white drop-shadow-sm">
                  بیش از ۱۵ سال تجربه
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 border rounded-full bg-white/10 backdrop-blur-sm border-white/20">
                <i className="text-white icon-star drop-shadow-md"></i>
                <span className="font-medium text-white drop-shadow-sm">
                  کیفیت تضمینی
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 border rounded-full bg-white/10 backdrop-blur-sm border-white/20">
                <i className="text-white icon-CAR drop-shadow-md"></i>
                <span className="font-medium text-white drop-shadow-sm">
                  تحویل سریع
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Categories Section */}
      <div className="container px-6 py-16 mx-auto">
        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCT_CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/products/category/${category.id}`}
              className="block group"
            >
              <div className="relative p-8 overflow-hidden transition-all duration-300 border shadow-2xl bg-white/80 dark:bg-slate-900/80 border-gray-200/60 dark:border-gray-700/50 rounded-3xl backdrop-blur-md hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-700 hover:-translate-y-2">
                <div className="relative">
                  <div className="flex items-center justify-center w-16 h-16 mb-4 transition-all duration-300 bg-white border-2 border-gray-300 rounded-full shadow-lg dark:bg-slate-900 group-hover:border-blue-400 group-hover:shadow-2xl">
                    <i
                      className={`text-2xl text-blue-600 dark:text-blue-400 ${getCategoryIcon(category.id)}`}
                    ></i>
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {category.name}
                  </h3>

                  <p className="mb-4 leading-relaxed text-gray-600 dark:text-gray-300">
                    {category.subcategories.length} زیرمجموعه موجود
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      مشاهده جزئیات
                    </span>
                    <ArrowLeft className="w-5 h-5 text-blue-600 transition-all dark:text-blue-400 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container px-6 py-16 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-800 dark:text-slate-100">
              چرا آهن هرمز؟
            </h2>
            <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
              ما با بیش از 15 سال تجربه، بهترین محصولات را با کیفیت تضمینی ارائه
              می‌دهیم
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center group">
              <div className="p-6 transition-all duration-300 bg-white border shadow-lg dark:bg-slate-800 rounded-2xl hover:shadow-xl border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-transform duration-300 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl group-hover:scale-110">
                  <i className="text-2xl text-white icon-category"></i>
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-800 dark:text-slate-100">
                  تنوع محصولات
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  بیش از 50 نوع محصول فولادی در دسته‌بندی‌های مختلف
                </p>
              </div>
            </div>

            <div className="text-center group">
              <div className="p-6 transition-all duration-300 bg-white border shadow-lg dark:bg-slate-800 rounded-2xl hover:shadow-xl border-slate-200 dark:border-slate-700 hover:border-green-300 dark:hover:border-green-500">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-transform duration-300 shadow-lg bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl group-hover:scale-110">
                  <i className="text-2xl text-white icon-Check-mark"></i>
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-800 dark:text-slate-100">
                  کیفیت تضمینی
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  گواهینامه استاندارد بین‌المللی و پشتیبانی کامل
                </p>
              </div>
            </div>

            <div className="text-center group">
              <div className="p-6 transition-all duration-300 bg-white border shadow-lg dark:bg-slate-800 rounded-2xl hover:shadow-xl border-slate-200 dark:border-slate-700 hover:border-orange-300 dark:hover:border-orange-500">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-transform duration-300 shadow-lg bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl group-hover:scale-110">
                  <i className="text-2xl text-white icon-CAR"></i>
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-800 dark:text-slate-100">
                  تحویل سریع
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  ارسال سریع و ایمن به سراسر کشور
                </p>
              </div>
            </div>

            <div className="text-center group">
              <div className="p-6 transition-all duration-300 bg-white border shadow-lg dark:bg-slate-800 rounded-2xl hover:shadow-xl border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-500">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-transform duration-300 shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl group-hover:scale-110">
                  <i className="text-2xl text-white icon-Support"></i>
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-800 dark:text-slate-100">
                  مشاوره تخصصی
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  مشاوره رایگان از کارشناسان مجرب
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden text-white bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 rounded-full w-72 h-72 bg-white/5 -translate-y-36 -translate-x-36"></div>
        <div className="absolute bottom-0 right-0 translate-x-48 translate-y-48 rounded-full w-96 h-96 bg-white/5"></div>

        <div className="container relative px-6 py-16 mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-white/10 backdrop-blur-sm">
            <i className="text-2xl text-white icon-Support"></i>
          </div>

          <h2 className="mb-4 text-3xl font-bold">نیاز به مشاوره دارید؟</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg opacity-90">
            کارشناسان مجرب ما آماده ارائه مشاوره رایگان و انتخاب بهترین محصول
            برای پروژه شما هستند
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact">
              <Button
                size="lg"
                className="px-8 py-3 text-lg font-bold text-blue-700 transition-all duration-300 bg-white shadow-lg hover:bg-blue-50 hover:shadow-xl group"
              >
                <i className="ml-3 transition-transform icon-phone-call-3 group-hover:scale-110"></i>
                تماس با کارشناس
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <i className="text-lg icon-the-watch"></i>
              <span>پاسخگویی 24 ساعته</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="text-lg icon-Check-mark"></i>
              <span>مشاوره رایگان</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
