import React from 'react';
import { notFound } from 'next/navigation';
import CategoryProducts from '@/components/category-products';
import CategorySheetsProducts from '@/components/category-sheets-products';
import DataSourceToggle from '@/components/data-source-toggle';
import { PRODUCT_CATEGORIES, SAMPLE_PRODUCTS } from '@/types/products';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    source?: 'sheets' | 'static';
  }>;
}

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const { source } = await searchParams;

  // پیدا کردن دسته‌بندی بر اساس slug
  const category = PRODUCT_CATEGORIES.find((cat) => cat.id === slug);

  if (!category) {
    notFound();
  }

  // فیلتر کردن محصولات بر اساس دسته‌بندی
  const categoryProducts = SAMPLE_PRODUCTS.filter(
    (product) => product.category.id === slug
  );

  // Function to get the appropriate icon for each product category
  const getCategoryIcon = (categoryId: string) => {
    const iconMap: Record<string, string> = {
      rebar: 'icon-rebar',
      profile: 'icon-profil',
      sheet: 'icon-varagh',
      angle: 'icon-nabshi',
      beam: 'icon-tirahan',
      pipe: 'icon-lole',
      wire: 'icon-wire',
      mesh: 'icon-Wire-products',
      shamsh: 'icon-bullion',
      qooti: 'icon-Equipment',
      maftoli: 'icon-wire',
      'raw-materials': 'icon-stainless-steel',
    };
    return iconMap[categoryId] || 'icon-rebar';
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="relative overflow-hidden text-white bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 translate-x-20 -translate-y-20 rounded-full w-96 h-96 bg-white/5"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 -translate-x-20 translate-y-20 rounded-full bg-white/5"></div>

        <div className="relative px-6 py-16 mx-auto max-w-7xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 mx-auto mb-6 border-2 rounded-full shadow-2xl bg-white/20 backdrop-blur-md border-white/30">
              <i
                className={`${getCategoryIcon(category.id)} text-5xl text-white drop-shadow-lg`}
              ></i>
            </div>
            <h1 className="mb-6 text-5xl font-bold text-white drop-shadow-2xl">
              {category.name}
            </h1>
            <p className="max-w-3xl mx-auto text-xl font-medium leading-relaxed text-white/95 drop-shadow-lg">
              مشاهده تمامی محصولات دسته‌بندی {category.name} - تفکیک شده بر اساس
              برند و نوع
            </p>
            {source === 'sheets' && (
              <div className="mt-6">
                <div className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-white rounded-full shadow-lg">
                  <div className="w-2 h-2 mr-2 bg-green-500 rounded-full animate-pulse"></div>
                  داده‌ها Real-time از Google Sheets
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="hidden bg-white border-t dark:bg-slate-800 border-slate-200 dark:border-slate-700 lg:block">
        <div className="mx-auto max-w-7xl"></div>
      </div>

      {/* Products Section */}
      <div className="bg-gray-50 dark:bg-slate-900">
        <div className="px-6 py-6 mx-auto">
          {/* Data Source Toggle */}
          <DataSourceToggle slug={slug} />

          {/* Render appropriate component based on source */}
          {source === 'sheets' ? (
            <CategorySheetsProducts category={category} />
          ) : (
            <CategoryProducts category={category} products={categoryProducts} />
          )}
        </div>
      </div>
    </div>
  );
}
