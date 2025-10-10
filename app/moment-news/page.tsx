'use client';

import { useEffect, useState } from 'react';
import { Card, CardBody } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { Spinner } from '@heroui/spinner';
import { Calendar, TrendingUp } from 'lucide-react';
import moment from 'moment-jalaali';

moment.loadPersian({ usePersianDigits: true, dialect: 'persian-modern' });

interface PriceChange {
  id: string;
  time: string;
  jalaliDate: string;
  jalaliDateTime: string;
  productName: string;
  brand: string;
  size: string;
  category: string;
  subcategory: string;
  oldPrice: number;
  newPrice: number;
  changeType: string;
  changeAmount: number;
  notes?: string;
}

interface MomentNewsData {
  success: boolean;
  date: string;
  summary: {
    totalChanges: number;
    increases: number;
    decreases: number;
    stable: number;
  };
  changes: PriceChange[];
}

export default function MomentNewsPage() {
  const [data, setData] = useState<MomentNewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/moment-news');
      const result = await res.json();

      if (result.success) {
        setData(result);
        setError(null);
      } else {
        setError(result.error || 'خطا در دریافت اطلاعات');
      }
    } catch (err) {
      setError('خطا در ارتباط با سرور');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getChangeIcon = (changeType: string) => {
    if (changeType === 'افزایش') return '🔺';
    if (changeType === 'کاهش') return '🔻';
    return '➖';
  };

  const getChangeColor = (changeType: string) => {
    if (changeType === 'افزایش') return 'danger';
    if (changeType === 'کاهش') return 'success';
    return 'default';
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative overflow-hidden text-white bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 translate-x-20 -translate-y-20 rounded-full w-96 h-96 bg-white/5"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 -translate-x-20 translate-y-20 rounded-full bg-white/5"></div>

        <div className="relative px-6 py-16 mx-auto max-w-7xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mx-auto mb-6 border-2 rounded-full shadow-2xl bg-white/20 backdrop-blur-md border-white/30">
              <TrendingUp className="w-10 h-10 text-white drop-shadow-lg" />
            </div>
            <h1 className="mb-6 text-5xl font-bold text-white drop-shadow-2xl">
              اخبار لحظه‌ای بازار آهن
            </h1>
            <p className="max-w-3xl mx-auto text-xl font-medium leading-relaxed text-white/95 drop-shadow-lg">
              نوسانات قیمت‌ها در بازار آهن - بروزرسانی لحظه‌ای
            </p>
            {data && (
              <div className="flex justify-center w-full mt-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 border rounded-full bg-white/10 backdrop-blur-sm border-white/20">
                  <Calendar size={18} />
                  <span className="font-semibold ">{data.date}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container px-6 py-12 mx-auto">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Spinner size="lg" label="در حال بارگذاری..." />
          </div>
        ) : error ? (
          <Card className="p-8 text-center bg-danger-50">
            <CardBody>
              <p className="text-lg text-danger-600">{error}</p>
              <button
                onClick={fetchData}
                className="px-6 py-2 mt-4 text-white transition-colors rounded-lg bg-danger-500 hover:bg-danger-600"
              >
                تلاش مجدد
              </button>
            </CardBody>
          </Card>
        ) : data ? (
          <>
            {/* Summary Cards */}
            <div className="relative z-20 grid grid-cols-1 gap-8 -mt-24 md:grid-cols-4">
              <div className="relative p-8 overflow-hidden border shadow-xl bg-white/80 dark:bg-slate-900/80 border-gray-200/60 dark:border-gray-700/50 rounded-3xl backdrop-blur-md">
                <div className="relative text-center">
                  <div className="inline-flex items-center gap-3 px-4 py-2 mb-4 border rounded-full bg-white/60 dark:bg-slate-800/60 border-gray-200/50 dark:border-gray-700/50">
                    <i className="text-lg text-blue-600 dark:text-blue-400 icon-Chart"></i>
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      تغییرات
                    </span>
                  </div>
                  <h3 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
                    {data.summary.totalChanges}
                  </h3>
                  <p className="font-medium text-gray-600 dark:text-gray-300">
                    کل تغییرات
                  </p>
                </div>
              </div>

              <div className="relative p-8 overflow-hidden border shadow-xl bg-white/80 dark:bg-slate-900/80 border-gray-200/60 dark:border-gray-700/50 rounded-3xl backdrop-blur-md">
                <div className="relative text-center">
                  <div className="inline-flex items-center gap-3 px-4 py-2 mb-4 border rounded-full bg-white/60 dark:bg-slate-800/60 border-gray-200/50 dark:border-gray-700/50">
                    <span className="text-lg">🔺</span>
                    <span className="text-sm font-medium text-red-800 dark:text-red-200">
                      افزایش
                    </span>
                  </div>
                  <h3 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
                    {data.summary.increases}
                  </h3>
                  <p className="font-medium text-gray-600 dark:text-gray-300">
                    افزایش قیمت
                  </p>
                </div>
              </div>

              <div className="relative p-8 overflow-hidden border shadow-xl bg-white/80 dark:bg-slate-900/80 border-gray-200/60 dark:border-gray-700/50 rounded-3xl backdrop-blur-md">
                <div className="relative text-center">
                  <div className="inline-flex items-center gap-3 px-4 py-2 mb-4 border rounded-full bg-white/60 dark:bg-slate-800/60 border-gray-200/50 dark:border-gray-700/50">
                    <span className="text-lg">🔻</span>
                    <span className="text-sm font-medium text-green-800 dark:text-green-200">
                      کاهش
                    </span>
                  </div>
                  <h3 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
                    {data.summary.decreases}
                  </h3>
                  <p className="font-medium text-gray-600 dark:text-gray-300">
                    کاهش قیمت
                  </p>
                </div>
              </div>

              <div className="relative p-8 overflow-hidden border shadow-xl bg-white/80 dark:bg-slate-900/80 border-gray-200/60 dark:border-gray-700/50 rounded-3xl backdrop-blur-md">
                <div className="relative text-center">
                  <div className="inline-flex items-center gap-3 px-4 py-2 mb-4 border rounded-full bg-white/60 dark:bg-slate-800/60 border-gray-200/50 dark:border-gray-700/50">
                    <span className="text-lg">➖</span>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      ثابت
                    </span>
                  </div>
                  <h3 className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
                    {data.summary.stable}
                  </h3>
                  <p className="font-medium text-gray-600 dark:text-gray-300">
                    بدون تغییر
                  </p>
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="mb-6 mt-18">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                جدول تغییر قیمت مقاطع فولادی و آهن آلات
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                آخرین بروزرسانی: {moment().format('HH:mm:ss')}
              </p>
            </div>

            {/* Table */}
            {data.changes.length === 0 ? (
              <Card className="p-12 text-center bg-gray-50 dark:bg-gray-900">
                <CardBody>
                  <div className="mb-4 text-6xl">📊</div>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    امروز تغییر قیمتی ثبت نشده است
                  </p>
                </CardBody>
              </Card>
            ) : (
              <div className="overflow-x-auto rounded-lg shadow-lg">
                <table
                  className="min-w-full bg-white dark:bg-gray-900"
                  dir="rtl"
                >
                  <thead className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-sm font-bold text-right text-gray-700 border-b border-gray-300 dark:text-gray-200 dark:border-gray-600">
                        ساعت
                      </th>
                      <th className="px-6 py-4 text-sm font-bold text-right text-gray-700 border-b border-gray-300 dark:text-gray-200 dark:border-gray-600">
                        نام محصول
                      </th>
                      <th className="px-6 py-4 text-sm font-bold text-right text-gray-700 border-b border-gray-300 dark:text-gray-200 dark:border-gray-600">
                        برند
                      </th>
                      <th className="px-6 py-4 text-sm font-bold text-right text-gray-700 border-b border-gray-300 dark:text-gray-200 dark:border-gray-600">
                        سایز
                      </th>
                      <th className="px-6 py-4 text-sm font-bold text-right text-gray-700 border-b border-gray-300 dark:text-gray-200 dark:border-gray-600">
                        نوع تغییر
                      </th>
                      <th className="px-6 py-4 text-sm font-bold text-right text-gray-700 border-b border-gray-300 dark:text-gray-200 dark:border-gray-600">
                        قیمت جدید
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.changes.map((change, index) => (
                      <tr
                        key={change.id}
                        className={`transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 ${
                          index % 2 === 0
                            ? 'bg-white dark:bg-gray-900'
                            : 'bg-gray-50/50 dark:bg-gray-800/50'
                        }`}
                      >
                        <td className="px-6 py-4 font-mono text-sm text-gray-800 border-b border-gray-200 dark:text-gray-200 dark:border-gray-700 whitespace-nowrap">
                          {change.time}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 border-b border-gray-200 dark:text-white dark:border-gray-700">
                          <div>{change.productName}</div>
                          <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            {change.category}{' '}
                            {change.subcategory && `/ ${change.subcategory}`}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 border-b border-gray-200 dark:text-gray-300 dark:border-gray-700">
                          {change.brand}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 border-b border-gray-200 dark:text-gray-300 dark:border-gray-700">
                          <Chip size="sm" variant="flat">
                            {change.size}
                          </Chip>
                        </td>
                        <td className="px-6 py-4 text-sm border-b border-gray-200 dark:border-gray-700 whitespace-nowrap">
                          <Chip
                            color={getChangeColor(change.changeType)}
                            variant="flat"
                            size="sm"
                            startContent={
                              <span className="text-base">
                                {getChangeIcon(change.changeType)}
                              </span>
                            }
                          >
                            {change.changeAmount.toLocaleString('fa-IR')} تومان{' '}
                            {change.changeType}
                          </Chip>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-blue-600 border-b border-gray-200 dark:border-gray-700 dark:text-blue-400 whitespace-nowrap">
                          {change.newPrice.toLocaleString('fa-IR')} تومان
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}
