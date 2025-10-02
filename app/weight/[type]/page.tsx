import { notFound } from 'next/navigation'
import SheetWeightCalculator from '@/components/calculators/SheetWeightCalculator'
import BeamWeightCalculator from '@/components/calculators/BeamWeightCalculator'
import RebarWeightCalculator from '@/components/calculators/RebarWeightCalculator'
import BilletWeightCalculator from '@/components/calculators/BilletWeightCalculator'
import PipeWeightCalculator from '@/components/calculators/PipeWeightCalculator'
import StudWeightCalculator from '@/components/calculators/StudWeightCalculator'
import AngleWeightCalculator from '@/components/calculators/AngleWeightCalculator'
import SquareTubeWeightCalculator from '@/components/calculators/SquareTubeWeightCalculator'
import {
  Calculator,
  Star,
  Shield,
  Ruler,
  Layers,
  Truck,
  Users2,
} from 'lucide-react'

type WeightPageProps = {
  params: Promise<{
    type: string
  }>
}

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
}

export default async function WeightCalculatorPage({
  params,
}: WeightPageProps) {
  const resolvedParams = await params
  const calculatorInfo =
    WEIGHT_CALCULATORS[resolvedParams.type as keyof typeof WEIGHT_CALCULATORS]
  if (!calculatorInfo) notFound()

  // Hero icon selection based on type
  // const heroIcon = getHeroIcon(params.type);

  return (
    <main className='relative'>
      {/* Hero Section */}
      <div className='relative bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 text-white overflow-hidden'>
        <div className='absolute inset-0 bg-black/10'></div>
        <div className='absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-20 translate-x-20'></div>
        <div className='absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-20 -translate-x-20'></div>
        <div className='relative max-w-4xl mx-auto px-6 py-16'>
          <div className='text-center'>
            <div className='inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-white/10 backdrop-blur-sm mx-auto'>
              <span
                className='icon-calc text-4xl text-white'
                style={{ fontFamily: 'icomoon' }}
                aria-label='آیکون ماشین حساب وزن'
              ></span>
            </div>
            <h1 className='text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent'>
              {calculatorInfo.title}
            </h1>
            <p className='text-xl opacity-90 max-w-2xl mx-auto leading-relaxed'>
              {calculatorInfo.description}
            </p>
            <div className='flex items-center justify-center gap-6 mt-8 text-sm'>
              <div className='flex items-center gap-2'>
                {/* حذف آیکون */}
                <span>دقت بالا و تضمین صحت فرمول</span>
              </div>
              <div className='flex items-center gap-2'>
                {/* حذف آیکون */}
                <span>مناسب مهندسین و خریداران</span>
              </div>
              <div className='flex items-center gap-2'>
                {/* حذف آیکون */}
                <span>پشتیبانی از ابعاد و چگالی مختلف</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='container px-6 py-16 mx-auto'>
        <div className='relative z-20 grid grid-cols-1 gap-12 -mt-24 lg:grid-cols-3'>
          {/* Feature Cards */}
          <div className='flex flex-col gap-8 lg:col-span-1'>
            <div className='bg-white dark:bg-card rounded-2xl shadow-xl border border-gray-100 dark:border-border p-6 md:p-8 flex flex-col items-center text-center'>
              <h3 className='mb-3 text-xl font-bold text-gray-900 dark:text-card-foreground'>
                مزایای ماشین حساب
              </h3>
              <ul className='text-gray-600 dark:text-card-foreground/80 text-sm space-y-2 text-right w-full max-w-xs mx-auto'>
                <li>محاسبه سریع و دقیق وزن</li>
                <li>پشتیبانی از انواع مقاطع فولادی</li>
                <li>نمایش فرمول و راهنما</li>
                <li>مناسب پروژه‌های ساختمانی و صنعتی</li>
              </ul>
            </div>
            <div className='bg-white dark:bg-card rounded-2xl shadow-xl border border-gray-100 dark:border-border p-6 md:p-8 flex flex-col items-center text-center'>
              <span
                className='icon-info text-3xl text-blue-400 mb-2'
                style={{ fontFamily: 'icomoon' }}
              ></span>
              <h3 className='mb-3 text-xl font-bold text-gray-900 dark:text-card-foreground'>
                راهنمای استفاده
              </h3>
              <ul className='text-gray-600 dark:text-card-foreground/80 text-sm space-y-2 text-right w-full max-w-xs mx-auto'>
                <li>۱. ابعاد و چگالی را وارد کنید</li>
                <li>۲. روی دکمه محاسبه کلیک کنید</li>
                <li>۳. نتیجه و قیمت تقریبی را مشاهده کنید</li>
                <li>۴. برای محاسبه جدید، فرم را پاک کنید</li>
              </ul>
            </div>
          </div>

          {/* Calculator & Info */}
          <div className='lg:col-span-2 flex flex-col gap-8'>
            <div className='bg-white dark:bg-card rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-border'>
              {renderCalculator(resolvedParams.type)}
            </div>
            {/* اطلاعات و فرمول‌ها حذف شد */}
          </div>
        </div>
      </div>
    </main>
  )
}

function getHeroIcon(type: string) {
  switch (type) {
    case 'sheet':
      return <Layers className='w-8 h-8 text-white' />
    case 'beam':
      return <Truck className='w-8 h-8 text-white' />
    case 'rebar':
      return <Ruler className='w-8 h-8 text-white' />
    case 'billet':
      return <Star className='w-8 h-8 text-white' />
    case 'pipe':
      return <Users2 className='w-8 h-8 text-white' />
    case 'stud':
      return <Shield className='w-8 h-8 text-white' />
    case 'angle':
      return <Calculator className='w-8 h-8 text-white' />
    case 'square-tube':
      return <Layers className='w-8 h-8 text-white' />
    default:
      return <Calculator className='w-8 h-8 text-white' />
  }
}

function renderCalculator(type: string) {
  switch (type) {
    case 'sheet':
      return <SheetWeightCalculator />
    case 'beam':
      return <BeamWeightCalculator />
    case 'rebar':
      return <RebarWeightCalculator />
    case 'billet':
      return <BilletWeightCalculator />
    case 'pipe':
      return <PipeWeightCalculator />
    case 'stud':
      return <StudWeightCalculator />
    case 'angle':
      return <AngleWeightCalculator />
    case 'square-tube':
      return <SquareTubeWeightCalculator />
    default:
      return <div>ماشین حساب در دست توسعه است</div>
  }
}

// Generate static params for all calculator types
export async function generateStaticParams() {
  return Object.keys(WEIGHT_CALCULATORS).map(type => ({
    type,
  }))
}
