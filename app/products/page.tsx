'use client'

import Link from 'next/link'
import { Accordion, AccordionItem } from '@heroui/accordion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PRODUCT_CATEGORIES, PRODUCT_ROUTES } from '@/types/products'
import { ArrowLeft, Package, Shield, Clock, Star } from 'lucide-react'

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
    }
    return iconMap[categoryId] || 'icon-Equipment'
  }

  return (
    <div className='w-full bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-900 dark:to-slate-800'>
      {/* Header Section */}
      <div className='relative overflow-hidden text-white bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600'>
        <div className='absolute inset-0 bg-black/10'></div>
        <div className='absolute top-0 right-0 translate-x-20 -translate-y-20 rounded-full w-96 h-96 bg-white/5'></div>
        <div className='absolute bottom-0 left-0 w-64 h-64 -translate-x-20 translate-y-20 rounded-full bg-white/5'></div>

        <div className='relative px-6 py-16 mx-auto max-w-7xl'>
          <div className='text-center'>
            <div className='inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-white/10 backdrop-blur-sm'>
              <i className='text-3xl text-white icon-warehouse'></i>
            </div>
            <h1 className='mb-6 text-5xl font-bold text-transparent bg-gradient-to-r from-white to-blue-100 bg-clip-text'>
              محصولات آهن هرمز
            </h1>
            <p className='max-w-3xl mx-auto text-xl leading-relaxed opacity-90'>
              مجموعه کاملی از محصولات فولادی با کیفیت برتر، قیمت مناسب و تضمین اصالت
            </p>
            <div className='flex items-center justify-center gap-6 mt-8 text-sm'>
              <div className='flex items-center gap-2'>
                <i className='text-green-400 icon-Check-mark'></i>
                <span>بیش از ۱۵ سال تجربه</span>
              </div>
              <div className='flex items-center gap-2'>
                <i className='text-yellow-400 icon-star'></i>
                <span>کیفیت تضمینی</span>
              </div>
              <div className='flex items-center gap-2'>
                <i className='text-blue-300 icon-CAR'></i>
                <span>تحویل سریع</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Accordion */}
      <div className='max-w-6xl px-6 py-16 mx-auto'>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 text-3xl font-bold text-slate-800 dark:text-slate-100'>
            دسته‌بندی محصولات
          </h2>
          <p className='max-w-2xl mx-auto text-slate-600 dark:text-slate-400'>
            محصولات خود را از میان دسته‌بندی‌های زیر انتخاب کنید
          </p>
        </div>

        <Accordion variant='splitted' selectionMode='multiple' className='gap-4'>
          {PRODUCT_CATEGORIES.map(category => (
            <AccordionItem
              key={category.id}
              aria-label={category.name}
              title={
                <div className='flex items-center gap-4 py-2'>
                  <div className='flex items-center justify-center w-12 h-12 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl'>
                    <i
                      className={`${getCategoryIcon(category.id)} text-xl text-white`}
                    ></i>
                  </div>
                  <div className='flex-1'>
                    <span className='text-xl font-bold text-slate-800 dark:text-slate-100'>
                      {category.name}
                    </span>
                    <p className='mt-1 text-sm text-slate-500 dark:text-slate-400'>
                      {category.subcategories.length} زیرمجموعه موجود
                    </p>
                  </div>
                </div>
              }
              className='mb-4 transition-all duration-300 bg-white border shadow-lg dark:bg-slate-800 hover:shadow-xl border-slate-200 dark:border-slate-700'
            >
              <div className='grid grid-cols-1 gap-4 p-6'>
                {category.subcategories.map(subcategory => {
                  // پیدا کردن route مربوط به این subcategory
                  const routeEntry = Object.entries(PRODUCT_ROUTES).find(
                    ([_, route]) =>
                      route.category === category.id &&
                      route.subcategory === subcategory,
                  )

                  if (!routeEntry) return null

                  const [routeKey, routeInfo] = routeEntry

                  return (
                    <Link
                      key={subcategory}
                      href={`/products/${routeKey}`}
                      className='block group'
                    >
                      <div className='flex items-center justify-between p-5 transition-all duration-300 border bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 rounded-xl hover:from-blue-50 hover:to-cyan-50 dark:hover:from-slate-600 dark:hover:to-slate-500 border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md'>
                        <div className='flex items-center gap-3'>
                          <div className='flex items-center justify-center w-8 h-8 rounded-lg shadow-sm bg-gradient-to-br from-blue-400 to-cyan-400'>
                            <i className='text-sm text-white icon-arrow-right'></i>
                          </div>
                          <span className='font-semibold text-slate-700 dark:text-slate-200 group-hover:text-blue-700 dark:group-hover:text-blue-300'>
                            {routeInfo.name}
                          </span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Badge
                            variant='secondary'
                            className='text-blue-700 bg-blue-100 dark:bg-blue-900 dark:text-blue-300'
                          >
                            جدید
                          </Badge>
                          <ArrowLeft className='w-5 h-5 transition-all duration-300 text-slate-400 group-hover:text-blue-500 group-hover:-translate-x-1' />
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Features Section */}
      <div className='bg-gradient-to-br from-slate-100 via-blue-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900'>
        <div className='px-6 py-20 mx-auto max-w-7xl'>
          <div className='mb-16 text-center'>
            <h2 className='mb-6 text-4xl font-bold text-slate-800 dark:text-slate-100'>
              چرا آهن هرمز؟
            </h2>
            <p className='max-w-3xl mx-auto text-lg leading-relaxed text-slate-600 dark:text-slate-400'>
              ما با بیش از 15 سال تجربه در صنعت فولاد، بهترین محصولات را با کیفیت
              تضمینی و خدمات بی‌نظیر ارائه می‌دهیم
            </p>
          </div>

          <div className='grid max-w-4xl grid-cols-1 gap-8 mx-auto'>
            <div className='group'>
              <div className='p-8 transition-all duration-300 bg-white border shadow-lg dark:bg-slate-800 rounded-2xl hover:shadow-2xl border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500'>
                <div className='flex items-center gap-6'>
                  <div className='flex items-center justify-center flex-shrink-0 w-20 h-20 transition-transform duration-300 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl group-hover:scale-110'>
                    <i className='text-3xl text-white icon-category'></i>
                  </div>
                  <div className='flex-1'>
                    <h3 className='mb-3 text-2xl font-bold text-slate-800 dark:text-slate-100'>
                      تنوع محصولات
                    </h3>
                    <p className='leading-relaxed text-slate-600 dark:text-slate-400'>
                      بیش از 50 نوع محصول فولادی در دسته‌بندی‌های مختلف شامل میلگرد،
                      پروفیل، ورق، تیرآهن و سایر محصولات صنعتی
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='group'>
              <div className='p-8 transition-all duration-300 bg-white border shadow-lg dark:bg-slate-800 rounded-2xl hover:shadow-2xl border-slate-200 dark:border-slate-700 hover:border-green-300 dark:hover:border-green-500'>
                <div className='flex items-center gap-6'>
                  <div className='flex items-center justify-center flex-shrink-0 w-20 h-20 transition-transform duration-300 shadow-lg bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl group-hover:scale-110'>
                    <i className='text-3xl text-white icon-Check-mark'></i>
                  </div>
                  <div className='flex-1'>
                    <h3 className='mb-3 text-2xl font-bold text-slate-800 dark:text-slate-100'>
                      کیفیت تضمینی
                    </h3>
                    <p className='leading-relaxed text-slate-600 dark:text-slate-400'>
                      تمام محصولات دارای گواهینامه استاندارد بین‌المللی و کیفیت
                      تضمینی با پشتیبانی کامل پس از فروش
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='group'>
              <div className='p-8 transition-all duration-300 bg-white border shadow-lg dark:bg-slate-800 rounded-2xl hover:shadow-2xl border-slate-200 dark:border-slate-700 hover:border-orange-300 dark:hover:border-orange-500'>
                <div className='flex items-center gap-6'>
                  <div className='flex items-center justify-center flex-shrink-0 w-20 h-20 transition-transform duration-300 shadow-lg bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl group-hover:scale-110'>
                    <i className='text-3xl text-white icon-CAR'></i>
                  </div>
                  <div className='flex-1'>
                    <h3 className='mb-3 text-2xl font-bold text-slate-800 dark:text-slate-100'>
                      تحویل سریع
                    </h3>
                    <p className='leading-relaxed text-slate-600 dark:text-slate-400'>
                      ارسال سریع و ایمن به سراسر کشور با بسته‌بندی مناسب و تضمین
                      رسیدن بدون آسیب
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='group'>
              <div className='p-8 transition-all duration-300 bg-white border shadow-lg dark:bg-slate-800 rounded-2xl hover:shadow-2xl border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-500'>
                <div className='flex items-center gap-6'>
                  <div className='flex items-center justify-center flex-shrink-0 w-20 h-20 transition-transform duration-300 shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl group-hover:scale-110'>
                    <i className='text-3xl text-white icon-Support'></i>
                  </div>
                  <div className='flex-1'>
                    <h3 className='mb-3 text-2xl font-bold text-slate-800 dark:text-slate-100'>
                      مشاوره تخصصی
                    </h3>
                    <p className='leading-relaxed text-slate-600 dark:text-slate-400'>
                      کارشناسان مجرب ما آماده ارائه مشاوره رایگان و انتخاب بهترین
                      محصول برای پروژه شما هستند
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className='relative overflow-hidden text-white bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600'>
        <div className='absolute inset-0 bg-black/10'></div>
        <div className='absolute top-0 left-0 rounded-full w-72 h-72 bg-white/5 -translate-y-36 -translate-x-36'></div>
        <div className='absolute bottom-0 right-0 translate-x-48 translate-y-48 rounded-full w-96 h-96 bg-white/5'></div>

        <div className='relative px-6 py-20 mx-auto text-center max-w-7xl'>
          <div className='inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-white/10 backdrop-blur-sm'>
            <i className='text-2xl text-white icon-Support'></i>
          </div>

          <h2 className='mb-6 text-4xl font-bold'>نیاز به مشاوره دارید؟</h2>
          <p className='max-w-3xl mx-auto mb-10 text-xl leading-relaxed opacity-90'>
            کارشناسان مجرب ما آماده ارائه مشاوره رایگان، محاسبه قیمت و انتخاب بهترین
            محصول برای پروژه شما هستند
          </p>

          <div className='flex flex-col items-center justify-center gap-6 sm:flex-row'>
            <Button
              size='lg'
              className='px-8 py-4 text-lg font-bold text-blue-700 transition-all duration-300 bg-white shadow-lg hover:bg-blue-50 hover:shadow-xl group'
            >
              <i className='ml-3 transition-transform icon-phone-call-3 group-hover:scale-110'></i>
              تماس با کارشناس
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-transparent border-2 border-white shadow-lg hover:bg-white hover:text-blue-700 hover:shadow-xl group'
            >
              <i className='ml-3 transition-transform icon-price group-hover:scale-110'></i>
              درخواست قیمت
            </Button>
          </div>

          <div className='flex items-center justify-center gap-8 mt-12 text-sm opacity-80'>
            <div className='flex items-center gap-2'>
              <i className='text-lg icon-the-watch'></i>
              <span>پاسخگویی 24 ساعته</span>
            </div>
            <div className='flex items-center gap-2'>
              <i className='text-lg icon-Check-mark'></i>
              <span>مشاوره رایگان</span>
            </div>
            <div className='flex items-center gap-2'>
              <i className='text-lg icon-price'></i>
              <span>قیمت‌گذاری شفاف</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
