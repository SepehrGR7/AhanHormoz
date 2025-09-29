'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { siteConfig } from '@/config/site'
import HeroItem from './heroItem'
import { title } from './primitives'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Calculator, Phone, ChevronRight, ChevronLeft } from 'lucide-react'

export default function Hero() {
  return (
    <section className='w-full'>
      {/* Header Section with Container */}
      <div className='px-4 pt-12 pb-8 text-center'>
        <div className='max-w-4xl mx-auto'>
          <h1 className='text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl text-slate-900 dark:text-white'>
            قیمت روز آهن‌آلات، خرید مطمئن و سریع
          </h1>
          <p className='max-w-2xl mx-auto mt-3 text-slate-600 dark:text-slate-300'>
            قیمت لحظه‌ای میلگرد، تیرآهن، ورق، پروفیل و سایر محصولات فولادی به‌همراه
            امکان محاسبه وزن و ثبت سفارش آسان.
          </p>
        </div>
      </div>

      {/* Slider Section - Full Width */}
      <div className='w-full pb-8 mt-8'>
        <div className='px-4 mx-auto max-w-7xl'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-xl font-bold text-slate-800 dark:text-slate-200'>
              دسته‌بندی محصولات
            </h2>
          </div>
        </div>

        <div className='relative px-4'>
          {/* Mobile Grid - 2 columns */}
          <div className='grid grid-cols-2 gap-4 md:hidden'>
            {siteConfig.heroItems.map(item => (
              <div key={item.name} className='flex justify-center'>
                <HeroItem
                  label={item.label}
                  icon={item.icon}
                  categoryId={item.name}
                />
              </div>
            ))}
          </div>

          {/* Desktop/Tablet Swiper */}
          <div className='hidden md:block'>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={3}
              loop={true}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 5,
                },
              }}
              className='hero-swiper'
            >
              {siteConfig.heroItems.map(item => (
                <SwiperSlide key={item.name} className='h-auto'>
                  <div className='py-6'>
                    <HeroItem
                      label={item.label}
                      icon={item.icon}
                      categoryId={item.name}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <div className='hidden md:flex gap-2 absolute top-[-60px] left-0 z-10'>
              <button className='p-2 border rounded-md swiper-button-prev-custom border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'>
                <ChevronRight className='w-4 h-4' />
              </button>
              <button className='p-2 border rounded-md swiper-button-next-custom border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'>
                <ChevronLeft className='w-4 h-4' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
