'use client'

import { Product, ProductCategory } from '@/types/products'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Calculator,
  Phone,
  Package,
  TrendingUp,
  Heart,
  Share2,
  Eye,
} from 'lucide-react'

interface CategoryTableProps {
  category: ProductCategory
  products: Product[]
  onOrder: (product: Product) => void
  onCalculate: (product: Product) => void
}

export default function CategoryTable({
  category,
  products,
  onOrder,
  onCalculate,
}: CategoryTableProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-xl'>
          <span className='text-2xl'>{category.icon}</span>
          {category.name}
          <Badge variant='secondary' className='mr-auto'>
            {products.length} محصول
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-slate-200 dark:border-slate-700'>
                <th className='px-2 py-3 font-semibold text-right text-slate-700 dark:text-slate-300'>
                  محصول
                </th>
                <th className='px-2 py-3 font-semibold text-right text-slate-700 dark:text-slate-300'>
                  برند
                </th>
                <th className='px-2 py-3 font-semibold text-right text-slate-700 dark:text-slate-300'>
                  سایز
                </th>
                <th className='px-2 py-3 font-semibold text-right text-slate-700 dark:text-slate-300'>
                  قیمت (تومان)
                </th>
                <th className='px-2 py-3 font-semibold text-right text-slate-700 dark:text-slate-300'>
                  وضعیت
                </th>
                <th className='px-2 py-3 font-semibold text-center text-slate-700 dark:text-slate-300'>
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr
                  key={product.id}
                  className='border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                >
                  <td className='px-2 py-4'>
                    <div>
                      <div className='font-medium text-slate-900 dark:text-slate-100'>
                        {product.name}
                      </div>
                      {product.description && (
                        <div className='text-sm text-slate-500 dark:text-slate-400'>
                          {product.description}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className='px-2 py-4 text-slate-700 dark:text-slate-300'>
                    {product.brand}
                  </td>
                  <td className='px-2 py-4'>
                    <Badge variant='outline'>{product.size}</Badge>
                  </td>
                  <td className='px-2 py-4'>
                    <div className='font-semibold text-green-600 dark:text-green-400'>
                      {formatPrice(product.price)}
                    </div>
                    <div className='text-xs text-slate-500 dark:text-slate-400'>
                      {product.unit === 'kg'
                        ? 'کیلوگرم'
                        : product.unit === 'ton'
                          ? 'تن'
                          : 'عدد'}
                    </div>
                  </td>
                  <td className='px-2 py-4'>
                    <Badge
                      variant={product.inStock ? 'default' : 'destructive'}
                      className={
                        product.inStock
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : ''
                      }
                    >
                      {product.inStock ? 'موجود' : 'ناموجود'}
                    </Badge>
                  </td>
                  <td className='px-2 py-4'>
                    <div className='flex items-center justify-center gap-2'>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => onCalculate(product)}
                        className='flex items-center gap-1 text-xs'
                      >
                        <Calculator className='w-3 h-3' />
                        محاسبه
                      </Button>
                      <Button
                        size='sm'
                        onClick={() => onOrder(product)}
                        disabled={!product.inStock}
                        className='flex items-center gap-1 text-xs bg-green-600 hover:bg-green-700'
                      >
                        <Phone className='w-3 h-3' />
                        سفارش
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className='py-8 text-center'>
            <Package className='w-12 h-12 mx-auto mb-4 text-slate-400' />
            <p className='text-slate-500 dark:text-slate-400'>
              محصولی در این دسته‌بندی یافت نشد
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
