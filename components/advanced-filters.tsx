'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Filter, X, RefreshCw } from 'lucide-react';
import { PriceFilter, PRODUCT_CATEGORIES, BRANDS, REBAR_SIZES, BEAM_SIZES } from '@/types/products';

interface AdvancedFiltersProps {
  filters: PriceFilter;
  onFiltersChange: (filters: PriceFilter) => void;
  onClearFilters: () => void;
}

export default function AdvancedFilters({
  filters,
  onFiltersChange,
  onClearFilters,
}: AdvancedFiltersProps) {
  const handleFilterChange = (key: keyof PriceFilter, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== undefined && value !== '' && value !== false
  );

  const getAvailableSizes = () => {
    if (filters.category === 'rebar') {
      return REBAR_SIZES;
    } else if (filters.category === 'beam') {
      return BEAM_SIZES;
    }
    return ['8', '10', '12', '14', '16', '18', '20', '22', '25', '28', '32'];
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="w-5 h-5" />
            فیلترهای پیشرفته
          </CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-red-500 hover:text-red-700 flex items-center gap-1"
            >
              <RefreshCw className="w-4 h-4" />
              پاک کردن همه
            </Button>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          {/* دسته‌بندی */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">دسته‌بندی</Label>
            <div className="grid grid-cols-1 gap-2">
              {PRODUCT_CATEGORIES.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    filters.category === category.id ? 'default' : 'outline'
                  }
                  size="sm"
                  onClick={() =>
                    handleFilterChange(
                      'category',
                      filters.category === category.id ? undefined : category.id
                    )
                  }
                  className="justify-start h-auto py-2"
                >
                  <span className="ml-2 text-lg">{category.icon}</span>
                  <span className="text-sm">{category.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* زیردسته */}
          {filters.category && (
            <div>
              <Label className="text-sm font-semibold mb-3 block">زیردسته</Label>
              <div className="grid grid-cols-1 gap-2">
                {PRODUCT_CATEGORIES.find(c => c.id === filters.category)?.subcategories.map((subcategory) => (
                  <Button
                    key={subcategory}
                    variant={
                      filters.subcategory === subcategory ? 'default' : 'outline'
                    }
                    size="sm"
                    onClick={() =>
                      handleFilterChange(
                        'subcategory',
                        filters.subcategory === subcategory ? undefined : subcategory
                      )
                    }
                    className="justify-start text-sm"
                  >
                    {subcategory}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* برند */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">برند</Label>
            <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
              {BRANDS.map((brand) => (
                <Button
                  key={brand}
                  variant={filters.brand === brand ? 'default' : 'outline'}
                  size="sm"
                  onClick={() =>
                    handleFilterChange(
                      'brand',
                      filters.brand === brand ? undefined : brand
                    )
                  }
                  className="justify-start text-sm"
                >
                  {brand}
                </Button>
              ))}
            </div>
          </div>

          {/* سایز */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">سایز</Label>
            <div className="grid grid-cols-3 gap-2">
              {getAvailableSizes().map((size) => (
                <Button
                  key={size}
                  variant={filters.size === size ? 'default' : 'outline'}
                  size="sm"
                  onClick={() =>
                    handleFilterChange(
                      'size',
                      filters.size === size ? undefined : size
                    )
                  }
                  className="text-sm"
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          {/* محدوده قیمت */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">محدوده قیمت (تومان)</Label>
            <div className="space-y-3">
              <div>
                <Label htmlFor="minPrice" className="text-xs">حداقل قیمت</Label>
                <Input
                  id="minPrice"
                  type="number"
                  value={filters.minPrice || ''}
                  onChange={(e) =>
                    handleFilterChange(
                      'minPrice',
                      e.target.value ? parseInt(e.target.value) : undefined
                    )
                  }
                  placeholder="0"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="maxPrice" className="text-xs">حداکثر قیمت</Label>
                <Input
                  id="maxPrice"
                  type="number"
                  value={filters.maxPrice || ''}
                  onChange={(e) =>
                    handleFilterChange(
                      'maxPrice',
                      e.target.value ? parseInt(e.target.value) : undefined
                    )
                  }
                  placeholder="1000000"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* موجودی */}
          <div className="flex items-center space-x-2 space-x-reverse">
            <input
              type="checkbox"
              id="inStock"
              checked={filters.inStock || false}
              onChange={(e) => handleFilterChange('inStock', e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="inStock" className="text-sm">
              فقط محصولات موجود
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* فیلترهای فعال */}
      {hasActiveFilters && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">فیلترهای فعال</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {filters.category && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {PRODUCT_CATEGORIES.find((c) => c.id === filters.category)?.name}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => handleFilterChange('category', undefined)}
                  />
                </Badge>
              )}
              {filters.subcategory && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {filters.subcategory}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => handleFilterChange('subcategory', undefined)}
                  />
                </Badge>
              )}
              {filters.brand && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {filters.brand}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => handleFilterChange('brand', undefined)}
                  />
                </Badge>
              )}
              {filters.size && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  سایز {filters.size}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => handleFilterChange('size', undefined)}
                  />
                </Badge>
              )}
              {(filters.minPrice || filters.maxPrice) && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  قیمت: {filters.minPrice || 0} - {filters.maxPrice || '∞'}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => {
                      handleFilterChange('minPrice', undefined);
                      handleFilterChange('maxPrice', undefined);
                    }}
                  />
                </Badge>
              )}
              {filters.inStock && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  فقط موجود
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => handleFilterChange('inStock', false)}
                  />
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}