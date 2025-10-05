'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ArrowLeft } from 'lucide-react';

// داده‌های محصولات (مشابه navmenu)
const productsData = {
  rebar: {
    title: 'میلگرد',
    icon: 'icon-rebar',
    description: 'انواع میلگرد آجدار، ساده، کلاف و سایر محصولات میلگردی',
    products: [
      {
        href: '/products/milgerd-ajdar',
        label: 'میلگرد آجدار',
        description: 'میلگرد آجدار با کیفیت بالا',
      },
      {
        href: '/products/milgerd-sade',
        label: 'میلگرد ساده',
        description: 'میلگرد ساده استاندارد',
      },
      {
        href: '/products/milgerd-kolaf',
        label: 'میلگرد کلاف',
        description: 'میلگرد کلافی برای پروژه‌های ساختمانی',
      },
      {
        href: '/products/milgerd-harati',
        label: 'میلگرد حرارتی',
        description: 'میلگرد مقاوم در برابر حرارت',
      },
      {
        href: '/products/milgerd-bastar',
        label: 'میلگرد بستر',
        description: 'میلگرد ویژه بستر راه‌آهن',
      },
      {
        href: '/products/milgerd-trans',
        label: 'میلگرد ترانس',
        description: 'میلگرد ویژه صنعت برق',
      },
      {
        href: '/products/milgerd-steel',
        label: 'میلگرد استیل',
        description: 'میلگرد ضد زنگ',
      },
    ],
  },
  profile: {
    title: 'پروفیل',
    icon: 'icon-profil',
    description: 'انواع پروفیل‌های ساختمانی، صنعتی و فولادی',
    products: [
      {
        href: '/products/profile-sakhtmani',
        label: 'پروفیل ساختمانی',
        description: 'پروفیل برای ساخت و ساز',
      },
      {
        href: '/products/profile-kongre',
        label: 'پروفیل کنگره',
        description: 'پروفیل کنگره‌ای',
      },
      {
        href: '/products/profile-sanati',
        label: 'پروفیل صنعتی',
        description: 'پروفیل برای کاربردهای صنعتی',
      },
      {
        href: '/products/profile-z',
        label: 'پروفیل Z',
        description: 'پروفیل Z شکل',
      },
      {
        href: '/products/profile-galvanize',
        label: 'پروفیل گالوانیزه',
        description: 'پروفیل ضد زنگ گالوانیزه',
      },
      {
        href: '/products/profile-sabk',
        label: 'پروفیل سبک',
        description: 'پروفیل سبک ساختمانی',
      },
      {
        href: '/products/profile-steel',
        label: 'پروفیل استیل',
        description: 'پروفیل استیل ضد زنگ',
      },
      {
        href: '/products/profile-aluminum',
        label: 'پروفیل آلومینیوم',
        description: 'پروفیل آلومینیومی',
      },
      {
        href: '/products/profile-upe',
        label: 'پروفیل UPE',
        description: 'پروفیل UPE استاندارد',
      },
      {
        href: '/products/profile-ipe',
        label: 'پروفیل IPE',
        description: 'پروفیل IPE اروپایی',
      },
      {
        href: '/products/profile-hea',
        label: 'پروفیل HEA',
        description: 'پروفیل HEA سنگین',
      },
      {
        href: '/products/profile-heb',
        label: 'پروفیل HEB',
        description: 'پروفیل HEB فوق سنگین',
      },
    ],
  },
  sheet: {
    title: 'ورق',
    icon: 'icon-varagh',
    description: 'انواع ورق‌های فولادی، گالوانیزه و رنگی',
    products: [
      {
        href: '/products/varagh-garm',
        label: 'ورق گرم',
        description: 'ورق گرم نورد شده',
      },
      {
        href: '/products/varagh-siah',
        label: 'ورق سیاه',
        description: 'ورق سیاه فولادی',
      },
      {
        href: '/products/varagh-sard',
        label: 'ورق سرد',
        description: 'ورق سرد نورد شده',
      },
      {
        href: '/products/varagh-galvanize',
        label: 'ورق گالوانیزه',
        description: 'ورق گالوانیزه ضد زنگ',
      },
      {
        href: '/products/varagh-rangi',
        label: 'ورق رنگی',
        description: 'ورق رنگی پوشش‌دار',
      },
      {
        href: '/products/varagh-steel',
        label: 'ورق استیل',
        description: 'ورق استیل ضد زنگ',
      },
      {
        href: '/products/varagh-aluminum',
        label: 'ورق آلومینیوم',
        description: 'ورق آلومینیومی',
      },
      { href: '/products/varagh-mes', label: 'ورق مس', description: 'ورق مسی' },
    ],
  },
  angle: {
    title: 'نبشی و ناودانی',
    icon: 'icon-nabshi',
    description: 'انواع نبشی، ناودانی و سپری',
    products: [
      { href: '/products/nabshi', label: 'نبشی', description: 'نبشی فولادی' },
      {
        href: '/products/navodani',
        label: 'ناودانی',
        description: 'ناودانی ساختمانی',
      },
      { href: '/products/separi', label: 'سپری', description: 'سپری فولادی' },
      {
        href: '/products/nabshi-galvanize',
        label: 'نبشی گالوانیزه',
        description: 'نبشی گالوانیزه ضد زنگ',
      },
    ],
  },
  beam: {
    title: 'تیرآهن',
    icon: 'icon-tirahan',
    description: 'انواع تیرآهن، هاش و ریل',
    products: [
      {
        href: '/products/tirahan',
        label: 'تیرآهن',
        description: 'تیرآهن ساختمانی',
      },
      { href: '/products/hash', label: 'هاش', description: 'تیرآهن هاش' },
      {
        href: '/products/lane-zanbori',
        label: 'لانه زنبوری',
        description: 'تیرآهن لانه زنبوری',
      },
      { href: '/products/rail', label: 'ریل', description: 'ریل راه‌آهن' },
      {
        href: '/products/tirahan-sangin',
        label: 'تیرآهن سنگین',
        description: 'تیرآهن سنگین',
      },
      {
        href: '/products/tirahan-sabk',
        label: 'تیرآهن سبک',
        description: 'تیرآهن سبک',
      },
    ],
  },
  pipe: {
    title: 'لوله',
    icon: 'icon-lole',
    description: 'انواع لوله‌های فولادی، گالوانیزه و پلاستیکی',
    products: [
      {
        href: '/products/lole-darzdar',
        label: 'لوله درزدار',
        description: 'لوله فولادی درزدار',
      },
      {
        href: '/products/lole-bedone-darz',
        label: 'لوله بدون درز',
        description: 'لوله فولادی بدون درز',
      },
      {
        href: '/products/lole-galvanize',
        label: 'لوله گالوانیزه',
        description: 'لوله گالوانیزه ضد زنگ',
      },
      {
        href: '/products/lole-steel',
        label: 'لوله استیل',
        description: 'لوله استیل ضد زنگ',
      },
      { href: '/products/lole-mes', label: 'لوله مس', description: 'لوله مسی' },
      {
        href: '/products/lole-aluminum',
        label: 'لوله آلومینیوم',
        description: 'لوله آلومینیومی',
      },
      {
        href: '/products/lole-polyethylene',
        label: 'لوله پلی‌اتیلن',
        description: 'لوله پلاستیکی پلی‌اتیلن',
      },
      {
        href: '/products/lole-pvc',
        label: 'لوله PVC',
        description: 'لوله پلاستیکی PVC',
      },
    ],
  },
  wire: {
    title: 'سیم',
    icon: 'icon-wire',
    description: 'انواع سیم‌های فولادی و کابل',
    products: [
      {
        href: '/products/sim-siah',
        label: 'سیم سیاه',
        description: 'سیم فولادی سیاه',
      },
      {
        href: '/products/sim-galvanize',
        label: 'سیم گالوانیزه',
        description: 'سیم گالوانیزه ضد زنگ',
      },
      {
        href: '/products/sim-khardar',
        label: 'سیم خاردار',
        description: 'سیم خاردار حفاظتی',
      },
      { href: '/products/kabel', label: 'کابل', description: 'کابل‌های مختلف' },
    ],
  },
  mesh: {
    title: 'توری',
    icon: 'icon-Wire-products',
    description: 'انواع توری‌های فلزی و پلاستیکی',
    products: [
      {
        href: '/products/tori-hesari',
        label: 'توری حصاری',
        description: 'توری حصاری محافظ',
      },
      {
        href: '/products/tori-joshi',
        label: 'توری جوشی',
        description: 'توری جوشی ساختمانی',
      },
      {
        href: '/products/tori-galvanize',
        label: 'توری گالوانیزه',
        description: 'توری گالوانیزه ضد زنگ',
      },
      {
        href: '/products/tori-plastic',
        label: 'توری پلاستیکی',
        description: 'توری پلاستیکی',
      },
    ],
  },
  shamsh: {
    title: 'شمش',
    icon: 'icon-bullion',
    description: 'انواع شمش فولادی و آلیاژی',
    products: [
      {
        href: '/products/shamsh-folad',
        label: 'شمش فولاد',
        description: 'شمش فولادی خام',
      },
      {
        href: '/products/shamsh-aliaazhi',
        label: 'شمش آلیاژی',
        description: 'شمش آلیاژی ویژه',
      },
    ],
  },
  qooti: {
    title: 'قوطی',
    icon: 'icon-Equipment',
    description: 'انواع قوطی فولادی',
    products: [
      {
        href: '/products/qooti-sanate',
        label: 'قوطی صنعتی',
        description: 'قوطی فولادی صنعتی',
      },
      {
        href: '/products/qooti-sotoni',
        label: 'قوطی ستونی',
        description: 'قوطی فولادی ستونی',
      },
    ],
  },
  maftoli: {
    title: 'محصولات مفتولی',
    icon: 'icon-wire',
    description: 'انواع محصولات مفتولی و توری',
    products: [
      {
        href: '/products/sim-maftooli-siah',
        label: 'سیم مفتولی سیاه',
        description: 'سیم مفتولی سیاه',
      },
      {
        href: '/products/sim-maftooli-galvanize',
        label: 'سیم مفتولی گالوانیزه',
        description: 'سیم مفتولی گالوانیزه',
      },
      {
        href: '/products/toori-hesari',
        label: 'توری حصاری',
        description: 'توری حصاری محافظ',
      },
      {
        href: '/products/mesh-ajdar',
        label: 'مش آجدار',
        description: 'مش آجدار ساختمانی',
      },
    ],
  },
  'raw-materials': {
    title: 'مواد اولیه',
    icon: 'icon-stainless-steel',
    description: 'مواد اولیه فولادسازی',
    products: [
      {
        href: '/products/ahan-esfonji',
        label: 'آهن اسفنجی',
        description: 'آهن اسفنجی خام',
      },
      {
        href: '/products/foro-aliazh',
        label: 'فروآلیاژ',
        description: 'فروآلیاژهای مختلف',
      },
    ],
  },
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function CategoryPage({ params }: PageProps) {
  const { slug } = React.use(params);
  const categoryData = productsData[slug as keyof typeof productsData];

  if (!categoryData) {
    notFound();
  }

  return (
    <main className="relative">
      {/* Hero Section */}
      <div className="relative overflow-hidden text-white bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 translate-x-20 -translate-y-20 rounded-full w-96 h-96 bg-white/5"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 -translate-x-20 translate-y-20 rounded-full bg-white/5"></div>

        <div className="relative px-6 py-16 mx-auto max-w-7xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 border-2 rounded-full shadow-2xl bg-white/20 backdrop-blur-md border-white/30">
              <i
                className={`text-3xl text-white drop-shadow-lg ${categoryData.icon}`}
              ></i>
            </div>
            <h1 className="mb-6 text-5xl font-bold text-white drop-shadow-2xl">
              {categoryData.title}
            </h1>
            <p className="max-w-3xl mx-auto text-xl font-medium leading-relaxed text-white/95 drop-shadow-lg">
              {categoryData.description}
            </p>

            {/* Breadcrumb */}
            <nav className="flex items-center justify-center gap-2 mt-8 text-sm text-white/80">
              <Link href="/" className="transition-colors hover:text-white">
                خانه
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link
                href="/products"
                className="transition-colors hover:text-white"
              >
                محصولات
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{categoryData.title}</span>
            </nav>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm">
              <div className="flex items-center gap-2 px-3 py-2 border rounded-full bg-white/10 backdrop-blur-sm border-white/20">
                <span className="font-medium text-white drop-shadow-sm">
                  کیفیت تضمینی
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 border rounded-full bg-white/10 backdrop-blur-sm border-white/20">
                <span className="font-medium text-white drop-shadow-sm">
                  قیمت رقابتی
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 border rounded-full bg-white/10 backdrop-blur-sm border-white/20">
                <span className="font-medium text-white drop-shadow-sm">
                  تحویل سریع
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container px-6 py-16 mx-auto">
        {/* Back Button */}
        <div className="relative z-20 mb-8 -mt-24">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-4 py-2 text-white transition-colors border rounded-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4" />
            بازگشت به همه محصولات
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categoryData.products.map((product, index) => (
            <Link
              key={index}
              href={product.href}
              className="relative p-8 overflow-hidden transition-all duration-300 border shadow-2xl group bg-white/80 dark:bg-slate-900/80 border-gray-200/60 dark:border-gray-700/50 rounded-3xl backdrop-blur-md hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-700 hover:-translate-y-2"
            >
              <div className="relative">
                <div className="flex items-center justify-center w-16 h-16 mb-4 transition-all duration-300 bg-white border-2 border-gray-300 rounded-full shadow-lg dark:bg-slate-900 group-hover:border-blue-400 group-hover:shadow-2xl">
                  <i
                    className={`text-2xl text-blue-600 dark:text-blue-400 ${categoryData.icon}`}
                  ></i>
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {product.label}
                </h3>
                <p className="mb-4 leading-relaxed text-gray-600 dark:text-gray-300">
                  {product.description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    مشاهده جزئیات
                  </span>
                  <ChevronRight className="w-5 h-5 text-blue-600 transition-all dark:text-blue-400 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="relative p-12 overflow-hidden border shadow-2xl bg-white/80 dark:bg-slate-900/80 border-gray-200/60 dark:border-gray-700/50 rounded-3xl backdrop-blur-md">
            <div className="absolute top-0 right-0 w-48 h-48 translate-x-12 -translate-y-12 rounded-full bg-blue-400/10"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 -translate-x-8 translate-y-8 rounded-full bg-cyan-400/10"></div>

            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 border-2 border-blue-200 rounded-full shadow-lg bg-white/60 dark:bg-slate-800/60 dark:border-blue-700">
                <i
                  className={`text-2xl text-blue-600 dark:text-blue-400 ${categoryData.icon}`}
                ></i>
              </div>

              <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                نیاز به مشاوره دارید؟
              </h2>
              <p className="max-w-2xl mx-auto mb-8 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                تیم متخصص ما آماده ارائه مشاوره و راهنمایی در انتخاب بهترین
                محصولات {categoryData.title} برای پروژه شما است.
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all bg-blue-600 rounded-xl hover:bg-blue-700 hover:shadow-lg"
                >
                  تماس با ما
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center px-8 py-4 font-semibold text-blue-600 transition-all border-2 border-blue-200 rounded-xl dark:border-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                >
                  مشاهده سایر محصولات
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
