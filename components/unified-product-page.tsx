'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import ProductPage from '@/components/product-page';
import ProductSheetsPage from '@/components/product-sheets-page';

interface UnifiedProductPageProps {
  category: string;
  subcategory: string;
  title: string;
  description?: string;
  features?: string[];
  applications?: string[];
  specifications?: { [key: string]: string };
  productId: string;
}

export default function UnifiedProductPage({
  category,
  subcategory,
  title,
  description,
  features = [],
  applications = [],
  specifications = {},
  productId,
}: UnifiedProductPageProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [source, setSource] = useState<'static' | 'sheets'>('static');

  // تشخیص حالت فعلی از URL
  useEffect(() => {
    const sourceParam = searchParams.get('source');
    setSource(sourceParam === 'sheets' ? 'sheets' : 'static');
  }, [searchParams]);

  // تغییر منبع داده
  const handleSourceChange = (newSource: 'static' | 'sheets') => {
    const params = new URLSearchParams(searchParams);

    if (newSource === 'sheets') {
      params.set('source', 'sheets');
    } else {
      params.delete('source');
    }

    const newUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;
    router.push(newUrl, { scroll: false });
  };

  return (
    <div>
      {/* Data Source Toggle - نمایش در بالای صفحه */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 shadow-sm">
        <div className="px-6 py-4 mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => handleSourceChange('static')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  source === 'static'
                    ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                📊 داده‌های استاتیک
              </button>
              <button
                onClick={() => handleSourceChange('sheets')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  source === 'sheets'
                    ? 'bg-green-600 text-white shadow-md hover:bg-green-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                🔄 Google Sheets
              </button>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {source === 'sheets' ? (
                <span className="flex items-center">
                  <div className="w-2 h-2 mr-2 bg-green-500 rounded-full animate-pulse"></div>
                  داده‌ها از Google Sheets دریافت می‌شوند
                </span>
              ) : (
                'داده‌های نمونه استاتیک'
              )}
            </div>
          </div>
        </div>
      </div>

      {/* محتوای اصلی */}
      {source === 'sheets' ? (
        <ProductSheetsPage
          category={category}
          subcategory={subcategory}
          title={title}
          description={`${description} - داده‌ها از Google Sheets`}
          features={features}
          applications={applications}
          specifications={specifications}
          productId={productId}
        />
      ) : (
        <ProductPage
          category={category}
          subcategory={subcategory}
          title={title}
          description={description}
          features={features}
          applications={applications}
          specifications={specifications}
          productId={productId}
          enableSheetsToggle={false} // چون toggle در بالا هست
        />
      )}
    </div>
  );
}
