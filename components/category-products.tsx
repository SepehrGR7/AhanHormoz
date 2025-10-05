'use client';

import React, { useState, useMemo } from 'react';
import CategoryTable from '@/components/category-table';
import { Product, ProductCategory } from '@/types/products';

interface CategoryProductsProps {
  category: ProductCategory;
  products: Product[];
}

export default function CategoryProducts({
  category,
  products,
}: CategoryProductsProps) {
  // State برای فیلتر نوع محصول
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');

  // فیلتر کردن محصولات بر اساس subcategory انتخاب شده
  const filteredProducts = useMemo(() => {
    if (selectedSubcategory === 'all') {
      return products;
    }
    return products.filter(
      (product) => product.subcategory === selectedSubcategory
    );
  }, [products, selectedSubcategory]);

  // دریافت لیست subcategories موجود در محصولات
  const availableSubcategories = useMemo(() => {
    const subcategories = Array.from(
      new Set(products.map((product) => product.subcategory))
    );
    return subcategories.sort();
  }, [products]);

  // گروه‌بندی محصولات فیلتر شده بر اساس برند
  const productsByBrand = filteredProducts.reduce(
    (acc, product) => {
      const brand = product.brand;
      if (!acc[brand]) {
        acc[brand] = [];
      }
      acc[brand].push(product);
      return acc;
    },
    {} as Record<string, Product[]>
  );

  // مرتب کردن برندها بر اساس الفبا
  const sortedBrands = Object.keys(productsByBrand).sort();

  // تابع برای مدیریت سفارش محصول
  const handleOrder = (product: Product) => {
    // TODO: پیاده‌سازی منطق سفارش
    console.log('سفارش محصول:', product.name);
  };

  // تابع برای محاسبه وزن
  const handleCalculate = (product: Product) => {
    // TODO: پیاده‌سازی منطق محاسبه
    console.log('محاسبه وزن برای:', product.name);
  };

  return (
    <>
      {/* Filter Bar */}
      <div className="p-3 mb-6 dark:border-slate-700">
        <div className="mb-3">
          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
            فیلتر بر اساس نوع:
          </h3>
        </div>

        {/* فیلتر نوع محصول */}
        {availableSubcategories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedSubcategory('all')}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedSubcategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-blue-50 dark:hover:bg-slate-600'
              }`}
            >
              همه ({products.length})
            </button>
            {availableSubcategories.map((subcategory) => {
              const count = products.filter(
                (p) => p.subcategory === subcategory
              ).length;
              return (
                <button
                  key={subcategory}
                  onClick={() => setSelectedSubcategory(subcategory)}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    selectedSubcategory === subcategory
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-blue-50 dark:hover:bg-slate-600'
                  }`}
                >
                  {subcategory} ({count})
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div>
        {filteredProducts.length > 0 ? (
          <div className="space-y-12">
            {sortedBrands.map((brand) => (
              <div key={brand} className="space-y-6">
                <div className="flex items-center gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                      {brand.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                        برند {brand}
                      </h2>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {productsByBrand[brand].length} محصول موجود
                      </p>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden bg-white border shadow-lg rounded-2xl border-slate-200 dark:bg-slate-800 dark:border-slate-700">
                  <CategoryTable
                    category={category}
                    products={productsByBrand[brand]}
                    onOrder={handleOrder}
                    onCalculate={handleCalculate}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 rounded-full bg-slate-100 dark:bg-slate-800">
              <div className="text-4xl text-slate-400">{category.icon}</div>
            </div>
            <h3 className="mb-2 text-2xl font-semibold text-slate-700 dark:text-slate-300">
              محصولی یافت نشد
            </h3>
            <p className="max-w-md mx-auto text-slate-500 dark:text-slate-400">
              {selectedSubcategory === 'all'
                ? `در حال حاضر محصولی در دسته‌بندی ${category.name} موجود نیست.`
                : `محصولی از نوع "${selectedSubcategory}" در دسته‌بندی ${category.name} یافت نشد.`}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
