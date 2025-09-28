'use client';

import { useState, useMemo } from 'react';
import {
  Product,
  PriceFilter,
  SAMPLE_PRODUCTS,
  PRODUCT_CATEGORIES,
} from '@/types/products';
import CategoryTable from '@/components/category-table';
import AdvancedFilters from '@/components/advanced-filters';
import WeightCalculatorModal from '@/components/weight-calculator-modal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Phone,
  Calculator,
  TrendingUp,
  Package,
  Star,
  Filter,
  Search,
  Download,
  RefreshCw,
  Bell,
  CheckCircle,
  Clock,
  Truck,
  Shield,
  Award,
  Users,
  MapPin,
  AlertCircle,
  Info,
  Zap,
  Target,
} from 'lucide-react';

interface ProductPageProps {
  category: string;
  subcategory: string;
  title: string;
  description?: string;
  features?: string[];
  applications?: string[];
  specifications?: { [key: string]: string };
}

export default function ProductPage({
  category,
  subcategory,
  title,
  description,
  features = [],
  applications = [],
  specifications = {},
}: ProductPageProps) {
  const [filters, setFilters] = useState<PriceFilter>({
    category,
    subcategory,
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(true);

  // فیلتر کردن محصولات بر اساس دسته و زیردسته
  const filteredProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter((product) => {
      if (product.category.id !== category) return false;
      if (product.subcategory !== subcategory) return false;
      
      // فیلترهای اضافی
      if (filters.brand && product.brand !== filters.brand) return false;
      if (filters.size && product.size !== filters.size) return false;
      if (filters.minPrice && product.price < filters.minPrice) return false;
      if (filters.maxPrice && product.price > filters.maxPrice) return false;
      if (filters.inStock && !product.inStock) return false;

      // جستجوی متنی
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          product.name.toLowerCase().includes(searchLower) ||
          product.brand.toLowerCase().includes(searchLower) ||
          product.size.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      return true;
    });
  }, [category, subcategory, filters, searchTerm]);

  const categoryInfo = PRODUCT_CATEGORIES.find(c => c.id === category);

  const handleOrder = (product: Product) => {
    alert(`سفارش ${product.name} ثبت شد. لطفاً با ما تماس بگیرید.`);
  };

  const handleCalculate = (product: Product) => {
    setSelectedProduct(product);
    setIsCalculatorOpen(true);
  };

  const handleCloseCalculator = () => {
    setIsCalculatorOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="text-6xl mb-4">{categoryInfo?.icon}</div>
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            {description && (
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                {description}
              </p>
            )}
            <div className="flex justify-center gap-4 mt-8">
              <Button
                onClick={() => setIsCalculatorOpen(true)}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Calculator className="w-4 h-4 ml-2" />
                محاسبه وزن
              </Button>
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                <Phone className="w-4 h-4 ml-2" />
                تماس: 021-54712
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Info Section */}
      <div className="bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ویژگی‌ها */}
            {features.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-600" />
                    ویژگی‌های کلیدی
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* کاربردها */}
            {applications.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    کاربردها
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {applications.map((application, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Zap className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{application}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* مشخصات فنی */}
            {Object.keys(specifications).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5 text-purple-600" />
                    مشخصات فنی
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-sm font-medium">{key}:</span>
                        <span className="text-sm text-slate-600 dark:text-slate-400">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="جستجو در محصولات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={showFilters ? 'default' : 'outline'}
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                فیلترها
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                دانلود لیست
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {showFilters && (
              <div className="lg:col-span-1">
                <AdvancedFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  onClearFilters={() => setFilters({ category, subcategory })}
                />
              </div>
            )}

            <div className={showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}>
              {filteredProducts.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Package className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                    <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-2">
                      محصولی یافت نشد
                    </h3>
                    <p className="text-slate-500 dark:text-slate-500">
                      لطفاً فیلترهای جستجو را تغییر دهید
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <CategoryTable
                  category={categoryInfo!}
                  products={filteredProducts}
                  onOrder={handleOrder}
                  onCalculate={handleCalculate}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                  کیفیت تضمینی
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  تمام محصولات دارای گواهینامه استاندارد
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                  ضمانت اصالت
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  ۱۰۰٪ اصل و مستقیم از کارخانه
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <Clock className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                  تحویل سریع
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  ارسال در کمترین زمان ممکن
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WeightCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={handleCloseCalculator}
        productName={selectedProduct?.name}
      />
    </div>
  );
}