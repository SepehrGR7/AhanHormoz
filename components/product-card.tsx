'use client';

import { Product } from '@/types/products';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Phone, Calculator } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOrder: (product: Product) => void;
  onCalculate: (product: Product) => void;
}

export default function ProductCard({
  product,
  onOrder,
  onCalculate,
}: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-200">
            {product.name}
          </CardTitle>
          <Badge variant={product.inStock ? 'default' : 'secondary'}>
            {product.inStock ? 'موجود' : 'ناموجود'}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <span>{product.brand}</span>
          <span>•</span>
          <span>سایز {product.size}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {formatPrice(product.price)} تومان
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400">
            /{' '}
            {product.unit === 'kg'
              ? 'کیلوگرم'
              : product.unit === 'ton'
                ? 'تن'
                : 'عدد'}
          </div>
        </div>

        {product.weight && (
          <div className="text-sm text-slate-600 dark:text-slate-400">
            وزن تقریبی: {product.weight} کیلوگرم
          </div>
        )}

        {product.description && (
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {product.description}
          </p>
        )}

        <div className="flex gap-2">
          <Button
            onClick={() => onOrder(product)}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            disabled={!product.inStock}
          >
            <ShoppingCart className="w-4 h-4 ml-2" />
            سفارش
          </Button>
          <Button
            onClick={() => onCalculate(product)}
            variant="outline"
            className="flex-1"
          >
            <Calculator className="w-4 h-4 ml-2" />
            محاسبه وزن
          </Button>
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400">
          آخرین بروزرسانی:{' '}
          {new Date(product.lastUpdated).toLocaleDateString('fa-IR')}
        </div>
      </CardContent>
    </Card>
  );
}
