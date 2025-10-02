'use client'

import { useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import ProductCard from '@/components/product-card'
import { SAMPLE_PRODUCTS, Product } from '@/types/products'
import { ChevronRight, ChevronLeft } from 'lucide-react'

interface ProductSliderProps {
  products?: Product[]
  onOrder?: (product: Product) => void
  onCalculate?: (product: Product) => void
  title?: string
}

export default function ProductSlider({
  products = SAMPLE_PRODUCTS.slice(0, 12),
  onOrder = () => {},
  onCalculate = () => {},
  title = 'محصولات پیشنهادی',
}: ProductSliderProps) {
  const swiperRef = useRef<SwiperType | null>(null)

  useEffect(() => {
    const handleResize = () => {
      if (swiperRef.current) {
        swiperRef.current.update()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-xl font-bold text-slate-800 dark:text-slate-200'>
          {title}
        </h2>
        <div className='hidden gap-2 md:flex'>
          <button className='p-2 transition-colors border rounded-md cursor-pointer swiper-button-prev-products border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'>
            <ChevronRight className='w-4 h-4' />
          </button>
          <button className='p-2 transition-colors border rounded-md cursor-pointer swiper-button-next-products border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'>
            <ChevronLeft className='w-4 h-4' />
          </button>
        </div>
      </div>

      <div className='relative'>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          loop={true}
          onSwiper={swiper => {
            swiperRef.current = swiper
          }}
          navigation={{
            nextEl: '.swiper-button-next-products',
            prevEl: '.swiper-button-prev-products',
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination-products',
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },

            1280: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            1536: {
              slidesPerView: 5,
              spaceBetween: 24,
            },
          }}
          className='products-swiper'
        >
          {products.map(product => (
            <SwiperSlide key={product.id} className='h-auto'>
              <div className='h-full py-6'>
                <ProductCard
                  product={product}
                  onOrder={onOrder}
                  onCalculate={onCalculate}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination for mobile */}
        <div className='text-center swiper-pagination-products md:hidden'></div>

        {/* Mobile navigation */}
        <div className='flex items-center justify-center gap-3 mt-2 md:hidden'>
          <button className='p-2 transition-colors border rounded-md cursor-pointer swiper-button-prev-products border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'>
            <ChevronRight className='w-4 h-4' />
          </button>
          <button className='p-2 transition-colors border rounded-md cursor-pointer swiper-button-next-products border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'>
            <ChevronLeft className='w-4 h-4' />
          </button>
        </div>
      </div>
    </div>
  )
}
