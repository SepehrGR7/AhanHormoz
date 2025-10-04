import { notFound } from 'next/navigation';
import SheetWeightCalculator from '@/components/calculators/SheetWeightCalculator';
import BeamWeightCalculator from '@/components/calculators/BeamWeightCalculator';
import RebarWeightCalculator from '@/components/calculators/RebarWeightCalculator';
import BilletWeightCalculator from '@/components/calculators/BilletWeightCalculator';
import PipeWeightCalculator from '@/components/calculators/PipeWeightCalculator';
import StudWeightCalculator from '@/components/calculators/StudWeightCalculator';
import AngleWeightCalculator from '@/components/calculators/AngleWeightCalculator';
import SquareTubeWeightCalculator from '@/components/calculators/SquareTubeWeightCalculator';
import {
  Calculator,
  Star,
  Shield,
  Ruler,
  Layers,
  Truck,
  Users2,
} from 'lucide-react';

type WeightPageProps = {
  params: Promise<{
    type: string;
  }>;
};

// تعریف انواع ماشین حساب موجود
const WEIGHT_CALCULATORS = {
  sheet: {
    title: 'وزن ورق',
    description: 'محاسبه وزن انواع ورق فولادی',
  },
  beam: {
    title: 'وزن تیرآهن',
    description: 'محاسبه وزن انواع تیرآهن',
  },
  rebar: {
    title: 'وزن میلگرد',
    description: 'محاسبه وزن میلگرد آجدار و ساده',
  },
  billet: {
    title: 'وزن شمش فولادی',
    description: 'محاسبه وزن شمش فولادی',
  },
  pipe: {
    title: 'وزن لوله فولادی',
    description: 'محاسبه وزن انواع لوله فولادی',
  },
  stud: {
    title: 'وزن ناودانی',
    description: 'محاسبه وزن ناودانی',
  },
  angle: {
    title: 'وزن نبشی',
    description: 'محاسبه وزن نبشی',
  },
  'square-tube': {
    title: 'وزن قوطی',
    description: 'محاسبه وزن قوطی',
  },
};

export default async function WeightCalculatorPage({
  params,
}: WeightPageProps) {
  const resolvedParams = await params;
  const calculatorInfo =
    WEIGHT_CALCULATORS[resolvedParams.type as keyof typeof WEIGHT_CALCULATORS];
  if (!calculatorInfo) notFound();

  // Hero icon selection based on type
  // const heroIcon = getHeroIcon(params.type);

  return (
    <main className="relative">
      {/* Hero Section */}
      <div className="relative overflow-hidden text-white bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 translate-x-20 -translate-y-20 rounded-full w-96 h-96 bg-white/5"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 -translate-x-20 translate-y-20 rounded-full bg-white/5"></div>
        <div className="relative px-6 py-16 mx-auto max-w-7xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mx-auto mb-6 border-2 rounded-full shadow-2xl bg-white/20 backdrop-blur-md border-white/30">
              <span
                className="text-4xl text-white icon-calc drop-shadow-lg"
                style={{ fontFamily: 'icomoon' }}
                aria-label="آیکون ماشین حساب وزن"
              ></span>
            </div>
            <h1 className="mb-6 text-5xl font-bold text-white drop-shadow-2xl">
              {calculatorInfo.title}
            </h1>
            <p className="max-w-2xl mx-auto text-xl font-medium leading-relaxed text-white/95 drop-shadow-lg">
              {calculatorInfo.description}
            </p>
            <div className="flex items-center justify-center gap-6 mt-8 text-sm">
              <div className="flex items-center gap-2 px-3 py-2 border rounded-full bg-white/10 backdrop-blur-sm border-white/20">
                <Shield className="w-4 h-4 text-white drop-shadow-md" />
                <span className="font-medium text-white drop-shadow-sm">
                  دقت بالا و تضمین صحت فرمول
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 border rounded-full bg-white/10 backdrop-blur-sm border-white/20">
                <Users2 className="w-4 h-4 text-white drop-shadow-md" />
                <span className="font-medium text-white drop-shadow-sm">
                  مناسب مهندسین و خریداران
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 border rounded-full bg-white/10 backdrop-blur-sm border-white/20">
                <Ruler className="w-4 h-4 text-white drop-shadow-md" />
                <span className="font-medium text-white drop-shadow-sm">
                  پشتیبانی از ابعاد و چگالی مختلف
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-6 py-16 mx-auto">
        <div className="relative z-20 grid grid-cols-1 gap-12 -mt-24 lg:grid-cols-3">
          {/* Feature Cards */}
          <div className="flex flex-col gap-8 lg:col-span-1">
            {/* کارت مزایای ماشین حساب */}
            <div className="relative p-6 overflow-hidden text-center border border-blue-100 shadow-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50 dark:bg-card rounded-2xl dark:border-blue-800 md:p-8">
              <div className="absolute top-0 right-0 w-20 h-20 translate-x-10 -translate-y-10 bg-blue-100 rounded-full dark:bg-blue-900/30"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-full shadow-lg">
                  <span
                    className="text-2xl text-white icon-star"
                    style={{ fontFamily: 'icomoon' }}
                  ></span>
                </div>
                <h3 className="mb-4 text-xl font-bold text-blue-900 dark:text-blue-100">
                  مزایای ماشین حساب
                </h3>
                <ul className="w-full mx-auto space-y-3 text-sm text-right">
                  <li className="flex items-center gap-3 p-2 rounded-lg bg-white/50 dark:bg-white/5">
                    <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span className="text-blue-800 dark:text-blue-200">
                      محاسبه سریع و دقیق وزن
                    </span>
                  </li>
                  <li className="flex items-center gap-3 p-2 rounded-lg bg-white/50 dark:bg-white/5">
                    <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span className="text-blue-800 dark:text-blue-200">
                      پشتیبانی از انواع مقاطع فولادی
                    </span>
                  </li>
                  <li className="flex items-center gap-3 p-2 rounded-lg bg-white/50 dark:bg-white/5">
                    <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span className="text-blue-800 dark:text-blue-200">
                      نمایش فرمول و راهنما
                    </span>
                  </li>
                  <li className="flex items-center gap-3 p-2 rounded-lg bg-white/50 dark:bg-white/5">
                    <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span className="text-blue-800 dark:text-blue-200">
                      مناسب پروژه‌های ساختمانی و صنعتی
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* کارت راهنمای استفاده */}
            <div className="relative p-6 overflow-hidden text-center border border-green-100 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 dark:bg-card rounded-2xl dark:border-green-800 md:p-8">
              <div className="absolute top-0 left-0 w-16 h-16 -translate-x-8 -translate-y-8 bg-green-100 rounded-full dark:bg-green-900/30"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full shadow-lg">
                  <span
                    className="text-2xl text-white icon-Support"
                    style={{ fontFamily: 'icomoon' }}
                  ></span>
                </div>
                <h3 className="mb-4 text-xl font-bold text-green-900 dark:text-green-100">
                  راهنمای استفاده
                </h3>
                <ul className="w-full mx-auto space-y-3 text-sm text-right">
                  <li className="flex items-center gap-3 p-2 rounded-lg bg-white/50 dark:bg-white/5">
                    <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 text-xs font-bold text-white bg-green-500 rounded-full">
                      ۱
                    </div>
                    <span className="text-green-800 dark:text-green-200">
                      ابعاد و چگالی را وارد کنید
                    </span>
                  </li>
                  <li className="flex items-center gap-3 p-2 rounded-lg bg-white/50 dark:bg-white/5">
                    <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 text-xs font-bold text-white bg-green-500 rounded-full">
                      ۲
                    </div>
                    <span className="text-green-800 dark:text-green-200">
                      روی دکمه محاسبه کلیک کنید
                    </span>
                  </li>
                  <li className="flex items-center gap-3 p-2 rounded-lg bg-white/50 dark:bg-white/5">
                    <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 text-xs font-bold text-white bg-green-500 rounded-full">
                      ۳
                    </div>
                    <span className="text-green-800 dark:text-green-200">
                      نتیجه و قیمت تقریبی را مشاهده کنید
                    </span>
                  </li>
                  <li className="flex items-center gap-3 p-2 rounded-lg bg-white/50 dark:bg-white/5">
                    <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 text-xs font-bold text-white bg-green-500 rounded-full">
                      ۴
                    </div>
                    <span className="text-green-800 dark:text-green-200">
                      برای محاسبه جدید، فرم را پاک کنید
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Calculator & Info */}
          <div className="flex flex-col gap-8 lg:col-span-2">
            {/* کارت ماشین حساب */}
            <div className="relative p-6 overflow-hidden border shadow-2xl bg-white/80 dark:bg-slate-900/80 border-gray-200/60 dark:border-gray-700/50 rounded-3xl md:p-8 backdrop-blur-md">
              {/* هدر کارت */}
              <div className="relative mb-6 text-center">
                <div className="inline-flex items-center gap-3 px-4 py-2 mb-4 border rounded-full bg-white/60 dark:bg-slate-800/60 border-gray-200/50 dark:border-gray-700/50">
                  <span
                    className="text-blue-600 icon-calc dark:text-blue-400"
                    style={{ fontFamily: 'icomoon' }}
                  ></span>
                  <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    ماشین حساب {calculatorInfo.title}
                  </span>
                </div>
              </div>

              {/* محتوای ماشین حساب */}
              <div className="relative">
                {renderCalculator(resolvedParams.type)}
              </div>
            </div>
            {/* اطلاعات و فرمول‌ها حذف شد */}
          </div>
        </div>
      </div>
    </main>
  );
}

function getHeroIcon(type: string) {
  switch (type) {
    case 'sheet':
      return <Layers className="w-8 h-8 text-white" />;
    case 'beam':
      return <Truck className="w-8 h-8 text-white" />;
    case 'rebar':
      return <Ruler className="w-8 h-8 text-white" />;
    case 'billet':
      return <Star className="w-8 h-8 text-white" />;
    case 'pipe':
      return <Users2 className="w-8 h-8 text-white" />;
    case 'stud':
      return <Shield className="w-8 h-8 text-white" />;
    case 'angle':
      return <Calculator className="w-8 h-8 text-white" />;
    case 'square-tube':
      return <Layers className="w-8 h-8 text-white" />;
    default:
      return <Calculator className="w-8 h-8 text-white" />;
  }
}

function renderCalculator(type: string) {
  switch (type) {
    case 'sheet':
      return <SheetWeightCalculator />;
    case 'beam':
      return <BeamWeightCalculator />;
    case 'rebar':
      return <RebarWeightCalculator />;
    case 'billet':
      return <BilletWeightCalculator />;
    case 'pipe':
      return <PipeWeightCalculator />;
    case 'stud':
      return <StudWeightCalculator />;
    case 'angle':
      return <AngleWeightCalculator />;
    case 'square-tube':
      return <SquareTubeWeightCalculator />;
    default:
      return <div>ماشین حساب در دست توسعه است</div>;
  }
}

// Generate static params for all calculator types
export async function generateStaticParams() {
  return Object.keys(WEIGHT_CALCULATORS).map((type) => ({
    type,
  }));
}
