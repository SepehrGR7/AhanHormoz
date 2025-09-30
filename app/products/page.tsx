'use client';

import Link from 'next/link';
import { Accordion, AccordionItem } from '@heroui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PRODUCT_CATEGORIES, PRODUCT_ROUTES } from '@/types/products';
import { ArrowLeft, Package, Shield, Clock, Star } from 'lucide-react';

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
    <div className="w-full bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-20 -translate-x-20"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <i className="icon-warehouse text-3xl text-white"></i>
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              محصولات آهن هرمز
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              مجموعه کاملی از محصولات فولادی با کیفیت برتر، قیمت مناسب و تضمین
              اصالت
            </p>
            <div className="flex items-center justify-center gap-6 mt-8 text-sm">
              <div className="flex items-center gap-2">
                <i className="icon-Check-mark text-green-400"></i>
                <span>بیش از ۱۵ سال تجربه</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="icon-star text-yellow-400"></i>
                <span>کیفیت تضمینی</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="icon-CAR text-blue-300"></i>
                <span>تحویل سریع</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Accordion */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            دسته‌بندی محصولات
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            محصولات خود را از میان دسته‌بندی‌های زیر انتخاب کنید
          </p>
        </div>

        <Accordion
          variant="splitted"
          selectionMode="multiple"
          className="gap-4"
        >
          {PRODUCT_CATEGORIES.map((category) => (
            <AccordionItem
              key={category.id}
              aria-label={category.name}
              title={
                <div className="flex items-center gap-4 py-2">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                    <i
                      className={`${getCategoryIcon(category.id)} text-xl text-white`}
                    ></i>
                  </div>
                  <div className="flex-1">
                    <span className="text-xl font-bold text-slate-800 dark:text-slate-100">
                      {category.name}
                    </span>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {category.subcategories.length} زیرمجموعه موجود
                    </p>
                  </div>
                </div>
              }
              className="mb-4 bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
            >
              <div className="grid grid-cols-1 gap-4 p-6">
                {category.subcategories.map((subcategory) => {
                  // پیدا کردن route مربوط به این subcategory
                  const routeEntry = Object.entries(PRODUCT_ROUTES).find(
                    ([_, route]) =>
                      route.category === category.id &&
                      route.subcategory === subcategory
                  );

                  if (!routeEntry) return null;

                  const [routeKey, routeInfo] = routeEntry;

                  return (
                    <Link
                      key={subcategory}
                      href={`/products/${routeKey}`}
                      className="block group"
                    >
                      <div className="flex items-center justify-between p-5 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 rounded-xl hover:from-blue-50 hover:to-cyan-50 dark:hover:from-slate-600 dark:hover:to-slate-500 transition-all duration-300 border border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center shadow-sm">
                            <i className="icon-arrow-right text-white text-sm"></i>
                          </div>
                          <span className="font-semibold text-slate-700 dark:text-slate-200 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                            {routeInfo.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                          >
                            جدید
                          </Badge>
                          <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-blue-500 group-hover:-translate-x-1 transition-all duration-300" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-6">
              چرا آهن هرمز؟
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              ما با بیش از 15 سال تجربه در صنعت فولاد، بهترین محصولات را با
              کیفیت تضمینی و خدمات بی‌نظیر ارائه می‌دهیم
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
            <div className="group">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500">
                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <i className="icon-category text-3xl text-white"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                      تنوع محصولات
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      بیش از 50 نوع محصول فولادی در دسته‌بندی‌های مختلف شامل
                      میلگرد، پروفیل، ورق، تیرآهن و سایر محصولات صنعتی
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-green-300 dark:hover:border-green-500">
                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <i className="icon-Check-mark text-3xl text-white"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                      کیفیت تضمینی
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      تمام محصولات دارای گواهینامه استاندارد بین‌المللی و کیفیت
                      تضمینی با پشتیبانی کامل پس از فروش
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-orange-300 dark:hover:border-orange-500">
                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <i className="icon-CAR text-3xl text-white"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                      تحویل سریع
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      ارسال سریع و ایمن به سراسر کشور با بسته‌بندی مناسب و تضمین
                      رسیدن بدون آسیب
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-500">
                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <i className="icon-Support text-3xl text-white"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                      مشاوره تخصصی
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      کارشناسان مجرب ما آماده ارائه مشاوره رایگان و انتخاب
                      بهترین محصول برای پروژه شما هستند
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-y-36 -translate-x-36"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-y-48 translate-x-48"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-6">
            <i className="icon-Support text-2xl text-white"></i>
          </div>

          <h2 className="text-4xl font-bold mb-6">نیاز به مشاوره دارید؟</h2>
          <p className="text-xl opacity-90 mb-10 max-w-3xl mx-auto leading-relaxed">
            کارشناسان مجرب ما آماده ارائه مشاوره رایگان، محاسبه قیمت و انتخاب
            بهترین محصول برای پروژه شما هستند
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <i className="icon-phone-call-3 ml-3 group-hover:scale-110 transition-transform"></i>
              تماس با کارشناس
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-700 font-bold px-8 py-4 text-lg bg-transparent shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <i className="icon-price ml-3 group-hover:scale-110 transition-transform"></i>
              درخواست قیمت
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 mt-12 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <i className="icon-the-watch text-lg"></i>
              <span>پاسخگویی 24 ساعته</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="icon-Check-mark text-lg"></i>
              <span>مشاوره رایگان</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="icon-price text-lg"></i>
              <span>قیمت‌گذاری شفاف</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
