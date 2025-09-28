'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PRODUCT_CATEGORIES, PRODUCT_ROUTES } from '@/types/products';
import { ArrowLeft, Package } from 'lucide-react';

export default function ProductsPage() {
  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <Package className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">محصولات آهن هرمز</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              مجموعه کاملی از محصولات فولادی با کیفیت برتر و قیمت مناسب
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCT_CATEGORIES.map((category) => (
            <Card key={category.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <span className="text-3xl">{category.icon}</span>
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
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
                        className="block"
                      >
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                          <span className="font-medium">{routeInfo.name}</span>
                          <ArrowLeft className="w-4 h-4 text-gray-400" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              چرا آهن هرمز؟
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              ما با بیش از 15 سال تجربه، بهترین محصولات فولادی را با کیفیت تضمینی ارائه می‌دهیم
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">تنوع محصولات</h3>
              <p className="text-slate-600 dark:text-slate-400">
                بیش از 50 نوع محصول فولادی در دسته‌بندی‌های مختلف
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Badge className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">کیفیت تضمینی</h3>
              <p className="text-slate-600 dark:text-slate-400">
                تمام محصولات دارای گواهینامه استاندارد و کیفیت
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowLeft className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">تحویل سریع</h3>
              <p className="text-slate-600 dark:text-slate-400">
                ارسال سریع و ایمن به سراسر کشور
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            نیاز به مشاوره دارید؟
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            کارشناسان ما آماده ارائه مشاوره رایگان و انتخاب بهترین محصول برای پروژه شما هستند
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              تماس با کارشناس
            </Button>
            <Button size="lg" variant="outline">
              درخواست قیمت
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}