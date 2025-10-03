import { Metadata } from 'next'
import { BlogPostCard, BlogPost } from '@/components/blog-post'
import { Factory } from 'lucide-react'

export const metadata: Metadata = {
  title: 'تولید کنندگان',
  description:
    'آخرین مطالب و اخبار در مورد صنعت فولاد و تولیدکنندگان فولاد ایران',
}

// This would typically come from a CMS or database
const posts: BlogPost[] = [
  {
    id: 'foolad-mobarakeh',
    title: 'فولاد مبارکه؛ بزرگترین تولیدکننده فولاد ایران',
    excerpt:
      'شرکت فولاد مبارکه اصفهان، بزرگترین مجتمع تولید فولاد تخت در خاورمیانه و شمال آفریقا با ظرفیت تولید سالانه ۷.۲ میلیون تن.',
    content: `شرکت فولاد مبارکه اصفهان در سال ۱۳۷۱ افتتاح شد و امروز به عنوان بزرگترین تولیدکننده ورق های فولادی تخت در خاورمیانه و شمال آفریقا شناخته می‌شود...`,
    image: '/images/blog/foolad-mobarakeh.png',
    date: '۱۴۰۴/۰۷/۱۱',
    readTime: '۵ دقیقه',
    author: 'تیم آهن هرمز',
  },
  {
    id: 'zob-ahan',
    title: 'ذوب آهن اصفهان؛ پیشگام صنعت فولاد ایران',
    excerpt:
      'ذوب آهن اصفهان به عنوان اولین تولیدکننده فولاد در ایران، نقش مهمی در توسعه صنعتی کشور داشته است.',
    content: `ذوب آهن اصفهان در سال ۱۳۴۶ به عنوان اولین کارخانه تولید فولاد در ایران افتتاح شد...`,
    image: '/images/blog/zob-ahan.png',
    date: '۱۴۰۴/۰۷/۱۰',
    readTime: '۴ دقیقه',
    author: 'تیم آهن هرمز',
  },
  {
    id: 'foolad-khuzestan',
    title: 'فولاد خوزستان و نقش آن در صنعت فولاد کشور',
    excerpt:
      'گروه فولاد خوزستان با تولید انواع شمش فولادی و محصولات فولادی، یکی از قطب‌های مهم تولید فولاد در کشور است.',
    content: `فولاد خوزستان از سال ۱۳۶۷ فعالیت خود را آغاز کرد و امروز به یکی از بزرگترین تولیدکنندگان شمش فولادی در ایران تبدیل شده است...`,
    image: '/images/blog/foolad-khuzestan.png',
    date: '۱۴۰۴/۰۷/۰۹',
    readTime: '۴ دقیقه',
    author: 'تیم آهن هرمز',
  },
]

export default function ManufacturersPage() {
  return (
    <main className='relative'>
      {/* Hero Section */}
      <div className='relative bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 text-white overflow-hidden'>
        <div className='absolute inset-0 bg-black/10'></div>
        <div className='absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-20 translate-x-20'></div>
        <div className='absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-20 -translate-x-20'></div>

        <div className='relative max-w-7xl mx-auto px-6 py-16'>
          <div className='text-center'>
            <div className='inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6'>
              <Factory className='w-8 h-8 text-white' />
            </div>
            <h1 className='text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent'>
              تولیدکنندگان فولاد ایران
            </h1>
            <p className='text-xl opacity-90 max-w-3xl mx-auto leading-relaxed'>
              آشنایی با بزرگترین و معتبرترین تولیدکنندگان فولاد و محصولات فولادی
              در ایران
            </p>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 py-12 px-4 md:px-12 mx-auto'>
        {posts.map(post => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  )
}
