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
  ShoppingCart,
  Eye,
  Heart,
  Share2,
  AlertCircle,
  CheckCircle,
  Clock,
  Truck,
  Shield,
  Award,
  BarChart3,
  Users,
  MapPin,
} from 'lucide-react';

export default function PricingPage() {
  const [filters, setFilters] = useState<PriceFilter>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(true);

  // فیلتر کردن محصولات
  const filteredProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter((product) => {
      if (filters.category && product.category.id !== filters.category)
        return false;
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
  }, [filters, searchTerm]);

  // گروه‌بندی محصولات بر اساس دسته‌بندی
  const productsByCategory = useMemo(() => {
    const grouped: { [key: string]: Product[] } = {};

    filteredProducts.forEach((product) => {
      const categoryId = product.category.id;
      if (!grouped[categoryId]) {
        grouped[categoryId] = [];
      }
      grouped[categoryId].push(product);
    });

    return grouped;
  }, [filteredProducts]);

  const handleOrder = (product: Product) => {
    // در اینجا می‌توانید منطق سفارش را پیاده‌سازی کنید
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                قیمت روز محصولات آهن
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                بهترین قیمت‌ها و کیفیت برتر در بازار آهن ایران
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <RefreshCw className="w-4 h-4" />
                <span>آخرین بروزرسانی: امروز</span>
              </div>
              <Button
                onClick={() => setIsCalculatorOpen(true)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                محاسبه وزن
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Phone className="w-4 h-4 ml-2" />
                تماس: 021-54712
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
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

            {/* Filter Toggle */}
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

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Package className="w-8 h-8" />
              </div>
              <div className="text-2xl font-bold">{SAMPLE_PRODUCTS.length}</div>
              <div className="text-sm opacity-90">محصول موجود</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-8 h-8" />
              </div>
              <div className="text-2xl font-bold">۱۲۰۰+</div>
              <div className="text-sm opacity-90">مشتری راضی</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Truck className="w-8 h-8" />
              </div>
              <div className="text-2xl font-bold">۲۴ ساعته</div>
              <div className="text-sm opacity-90">ارسال سریع</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="w-8 h-8" />
              </div>
              <div className="text-2xl font-bold">۱۵ سال</div>
              <div className="text-sm opacity-90">تجربه کاری</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-6">
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* فیلترها */}
          {showFilters && (
            <div className="lg:col-span-1">
              <AdvancedFilters
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={() => setFilters({})}
              />
            </div>
          )}

          {/* جدول‌های محصولات */}
          <div className={showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}>
            {Object.keys(productsByCategory).length === 0 ? (
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
              <div className="space-y-6">
                {Object.entries(productsByCategory).map(
                  ([categoryId, products], index) => {
                    const category = PRODUCT_CATEGORIES.find(
                      (c) => c.id === categoryId
                    );
                    if (!category) return null;

                    return (
                      <CategoryTable
                        key={`${categoryId}-${index}`}
                        category={category}
                        products={products}
                        onOrder={handleOrder}
                        onCalculate={handleCalculate}
                      />
                    );
                  }
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* نکات مهم خرید */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  نکات مهم خرید
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    قبل از خرید حتماً کیفیت محصول را بررسی کنید
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    از اصالت گواهینامه‌های استاندارد اطمینان حاصل کنید
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    قیمت‌ها ممکن است بر اساس نوسانات بازار تغییر کند
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    برای خرید عمده با ما تماس بگیرید تا تخفیف ویژه دریافت کنید
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* اطلاعات تماس */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-blue-600" />
                  اطلاعات تماس
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span className="text-sm">۰۲۱-۵۴۷۱۲</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span className="text-sm">تهران، بازار آهن</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span className="text-sm">شنبه تا پنج‌شنبه: ۸ تا ۱۸</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-slate-500" />
                  <span className="text-sm">ارسال به سراسر کشور</span>
                </div>
              </CardContent>
            </Card>

            {/* خدمات ویژه */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-600" />
                  خدمات ویژه
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Calculator className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    محاسبه رایگان وزن و قیمت
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Truck className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    ارسال سریع و ایمن
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    ضمانت کیفیت محصولات
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    مشاوره رایگان توسط کارشناسان
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* اطلاعیه مهم */}
          <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <div className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">
                  اطلاعیه مهم
                </h3>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  قیمت‌های نمایش داده شده بر اساس آخرین نرخ‌های بازار بوده و
                  ممکن است در طول روز تغییر کند. برای اطلاع از قیمت دقیق و
                  به‌روز، لطفاً با ما تماس بگیرید. تمام محصولات دارای گواهینامه
                  کیفیت و مطابق با استانداردهای ملی ایران می‌باشند.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ماشین حساب وزن */}
      <WeightCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={handleCloseCalculator}
        productName={selectedProduct?.name}
      />
    </div>
  );
}
