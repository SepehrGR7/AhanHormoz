'use client'

import { Product } from '@/types/products'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Phone, Calculator, TrendingUp } from 'lucide-react'

interface ProductCardProps {
  product: Product
  onOrder: (product: Product) => void
  onCalculate: (product: Product) => void
}

export default function ProductCard({
  product,
  onOrder,
  onCalculate,
}: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price)
  }

  return (
    <div className='relative h-full group'>
      <div className='relative flex flex-col h-full min-h-[320px] p-6 transition-all duration-500 bg-white border shadow-lg dark:bg-slate-800 rounded-2xl border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl hover:shadow-blue-500/5 dark:hover:shadow-blue-400/5 hover:-translate-y-1 overflow-hidden'>
        {/* Stock status badge */}
        <div className='relative z-10 flex items-center justify-between mb-4'>
          <Badge
            variant={product.inStock ? 'default' : 'destructive'}
            className={
              product.inStock
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200 dark:border-red-800'
            }
          >
            {product.inStock ? 'موجود' : 'ناموجود'}
          </Badge>
          <TrendingUp className='w-4 h-4 text-green-500 dark:text-green-400' />
        </div>

        {/* Product title */}
        <div className='relative z-10 mb-4'>
          <h3 className='mb-2 text-lg font-bold leading-tight transition-colors duration-300 text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400'>
            {product.name}
          </h3>
          <div className='flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400'>
            <span className='font-medium'>{product.brand}</span>
            <span className='w-1 h-1 rounded-full bg-slate-400'></span>
            <span>سایز {product.size}</span>
          </div>
        </div>

        {/* Price section */}
        <div className='relative z-10 p-4 mb-4 border bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border-blue-200/50 dark:border-blue-700/50'>
          <div className='flex items-baseline justify-between'>
            <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
              {formatPrice(product.price)}
            </div>
            <div className='text-sm font-medium text-slate-600 dark:text-slate-400'>
              تومان /{' '}
              {product.unit === 'kg'
                ? 'کیلوگرم'
                : product.unit === 'ton'
                  ? 'تن'
                  : 'عدد'}
            </div>
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <div className='relative z-10 flex-1 mb-4'>
            <p className='text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-2'>
              {product.description}
            </p>
          </div>
        )}

        {/* Last updated */}
        <div className='relative z-10 mt-3 text-xs text-center text-slate-500 dark:text-slate-400'>
          بروزرسانی: {new Date(product.lastUpdated).toLocaleDateString('fa-IR')}
        </div>
      </div>
    </div>
  )
}
