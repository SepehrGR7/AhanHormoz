import { Metadata } from 'next'
import { BlogPostCard, BlogPost } from '@/components/blog-post'

export const metadata: Metadata = {
  title: 'وبلاگ | آهن هرمز',
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
    image: '/images/blog/zob-ahan.jpg',
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
    image: '/images/blog/foolad-khuzestan.jpg',
    date: '۱۴۰۴/۰۷/۰۹',
    readTime: '۴ دقیقه',
    author: 'تیم آهن هرمز',
  },
]

export default function BlogPage() {
  return (
    <div className='container max-w-7xl mx-auto py-12'>
      {/* Hero Section */}
      <div className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 md:p-12 mb-12'>
        <div className='relative z-10 max-w-2xl space-y-4'>
          <h1 className='text-4xl md:text-5xl font-bold'>وبلاگ آهن هرمز</h1>
          <p className='text-lg md:text-xl opacity-90'>
            آخرین اخبار و مقالات در مورد صنعت فولاد، تولیدکنندگان و بازار آهن و
            فولاد ایران
          </p>
        </div>
        {/* Abstract Background Pattern */}
        <div className='absolute inset-0 z-0 opacity-20'>
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/30 rounded-full blur-3xl'></div>
          <div className='absolute right-0 bottom-0 w-[400px] h-[400px] bg-blue-400/30 rounded-full blur-2xl'></div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
        {posts.map(post => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Newsletter Section - Optional */}
      <div className='mt-16 p-8 bg-card rounded-2xl border shadow-sm'>
        <div className='max-w-2xl mx-auto text-center space-y-4'>
          <h2 className='text-2xl font-bold'>عضویت در خبرنامه</h2>
          <p className='text-muted-foreground'>
            برای دریافت آخرین اخبار و مقالات صنعت فولاد در خبرنامه ما عضو شوید
          </p>
          <div className='flex gap-2 max-w-md mx-auto'>
            <input
              type='email'
              placeholder='ایمیل خود را وارد کنید'
              className='flex-1 px-4 py-2 rounded-lg border bg-background'
            />
            <button className='px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors'>
              عضویت
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
