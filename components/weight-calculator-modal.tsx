'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calculator, X, Info } from 'lucide-react'

interface WeightCalculatorModalProps {
  isOpen: boolean
  onClose: () => void
  productName?: string
}

export default function WeightCalculatorModal({
  isOpen,
  onClose,
  productName,
}: WeightCalculatorModalProps) {
  const [diameter, setDiameter] = useState('')
  const [length, setLength] = useState('')
  const [quantity, setQuantity] = useState('1')
  const [totalWeight, setTotalWeight] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  const calculateWeight = () => {
    const d = parseFloat(diameter)
    const l = parseFloat(length)
    const q = parseFloat(quantity)

    if (d && l && q) {
      // فرمول محاسبه وزن میلگرد: (قطر^2 × طول × 0.00617) × تعداد
      const weight = d * d * l * 0.00617 * q
      setTotalWeight(Math.round(weight * 100) / 100)

      // محاسبه قیمت تقریبی (قیمت نمونه: 185000 تومان به کیلو)
      const estimatedPrice = weight * 185000
      setTotalPrice(Math.round(estimatedPrice))
    }
  }

  const resetCalculator = () => {
    setDiameter('')
    setLength('')
    setQuantity('1')
    setTotalWeight(0)
    setTotalPrice(0)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price)
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50'>
      <Card className='w-full max-w-lg'>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle className='flex items-center gap-2 text-xl'>
            <Calculator className='w-8 h-8' />
            محاسبه وزن و قیمت میلگرد
          </CardTitle>
          <Button variant='ghost' size='sm' onClick={onClose}>
            <X className='w-4 h-4' />
          </Button>
        </CardHeader>

        <CardContent className='space-y-6'>
          {productName && (
            <div className='p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20'>
              <div className='text-sm text-blue-700 dark:text-blue-300'>
                محصول انتخابی: <span className='font-semibold'>{productName}</span>
              </div>
            </div>
          )}

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div>
              <Label htmlFor='diameter'>قطر (میلیمتر)</Label>
              <Input
                id='diameter'
                type='number'
                value={diameter}
                onChange={e => setDiameter(e.target.value)}
                placeholder='مثال: 14'
                className='mt-1'
              />
            </div>

            <div>
              <Label htmlFor='length'>طول (متر)</Label>
              <Input
                id='length'
                type='number'
                value={length}
                onChange={e => setLength(e.target.value)}
                placeholder='مثال: 12'
                className='mt-1'
              />
            </div>

            <div className='md:col-span-2'>
              <Label htmlFor='quantity'>تعداد شاخه</Label>
              <Input
                id='quantity'
                type='number'
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                placeholder='مثال: 1'
                className='mt-1'
              />
            </div>
          </div>

          <div className='flex gap-3'>
            <Button onClick={calculateWeight} className='flex-1'>
              <Calculator className='w-4 h-4 ml-2' />
              محاسبه
            </Button>
            <Button onClick={resetCalculator} variant='outline'>
              پاک کردن
            </Button>
          </div>

          {totalWeight > 0 && (
            <div className='space-y-4'>
              <div className='p-4 rounded-lg bg-green-50 dark:bg-green-900/20'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='text-center'>
                    <div className='text-2xl font-bold text-green-600 dark:text-green-400'>
                      {totalWeight.toLocaleString('fa-IR')}
                    </div>
                    <div className='text-sm text-slate-600 dark:text-slate-400'>
                      کیلوگرم
                    </div>
                  </div>
                  <div className='text-center'>
                    <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                      {formatPrice(totalPrice)}
                    </div>
                    <div className='text-sm text-slate-600 dark:text-slate-400'>
                      تومان (تقریبی)
                    </div>
                  </div>
                </div>
              </div>

              <div className='p-4 rounded-lg bg-slate-50 dark:bg-slate-800'>
                <h4 className='mb-2 text-sm font-semibold'>جزئیات محاسبه:</h4>
                <div className='space-y-1 text-xs text-slate-600 dark:text-slate-400'>
                  <div>قطر: {diameter} میلیمتر</div>
                  <div>طول: {length} متر</div>
                  <div>تعداد: {quantity} شاخه</div>
                  <div>
                    وزن هر شاخه:{' '}
                    {(
                      (parseFloat(diameter) || 0) ** 2 *
                      (parseFloat(length) || 0) *
                      0.00617
                    ).toFixed(2)}{' '}
                    کیلوگرم
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className='p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20'>
            <div className='flex items-start gap-2'>
              <Info className='w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0' />
              <div className='text-xs text-amber-700 dark:text-amber-300'>
                <div className='mb-1 font-semibold'>نکات مهم:</div>
                <ul className='space-y-1'>
                  <li>• فرمول محاسبه: (قطر² × طول × 0.00617) × تعداد</li>
                  <li>• قیمت نمایش داده شده تقریبی است</li>
                  <li>• برای قیمت دقیق با ما تماس بگیرید</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
