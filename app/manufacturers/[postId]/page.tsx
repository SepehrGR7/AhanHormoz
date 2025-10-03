import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowRight, CalendarDays, Clock3, User } from 'lucide-react'
import { BlogPost } from '@/components/blog-post'
import NextLink from 'next/link'
import { Button } from '@heroui/button'

// This would typically come from a database or CMS
const posts: BlogPost[] = [
  {
    id: 'foolad-mobarakeh',
    title: 'فولاد مبارکه؛ بزرگترین تولیدکننده فولاد ایران',
    excerpt:
      'شرکت فولاد مبارکه اصفهان، بزرگترین مجتمع تولید فولاد تخت در خاورمیانه و شمال آفریقا با ظرفیت تولید سالانه ۷.۲ میلیون تن.',
    content: `شرکت فولاد مبارکه اصفهان در سال ۱۳۷۱ افتتاح شد و امروز به عنوان بزرگترین تولیدکننده ورق های فولادی تخت در خاورمیانه و شمال آفریقا شناخته می‌شود. این شرکت با تولید حدود ۵۰ درصد فولاد کشور، نقش مهمی در صنعت فولاد ایران ایفا می‌کند.

    فولاد مبارکه با بهره‌گیری از تکنولوژی‌های پیشرفته و خطوط تولید مدرن، انواع ورق‌های فولادی را با کیفیت بالا تولید می‌کند. محصولات این شرکت در صنایع مختلف از جمله خودروسازی، لوازم خانگی، صنایع نفت و گاز و ساختمان‌سازی کاربرد دارد.

    این مجتمع عظیم صنعتی علاوه بر تأمین نیاز داخلی، بخشی از محصولات خود را به کشورهای مختلف صادر می‌کند و نقش مهمی در ارزآوری برای کشور دارد.`,
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ postId: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const post = posts.find(p => p.id === resolvedParams.postId)

  if (!post) {
    return {
      title: 'پست یافت نشد | آهن هرمز',
    }
  }

  return {
    title: `${post.title} | آهن هرمز`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ postId: string }>
}) {
  const resolvedParams = await params
  const post = posts.find(p => p.id === resolvedParams.postId)

  if (!post) {
    notFound()
  }

  return (
    <article className='container py-12'>
      <div className='max-w-3xl mx-auto space-y-8'>
        <div className='relative h-[400px] w-full overflow-hidden rounded-lg'>
          <Image
            src={post.image}
            alt={post.title}
            fill
            className='object-cover'
          />
        </div>

        <div className='space-y-4'>
          <h1 className='text-4xl font-bold'>{post.title}</h1>

          <div className='flex flex-wrap gap-4 text-sm text-muted-foreground'>
            <div className='flex items-center gap-1'>
              <CalendarDays size={16} />
              <span>{post.date}</span>
            </div>
            <div className='flex items-center gap-1'>
              <Clock3 size={16} />
              <span>{post.readTime}</span>
            </div>
            <div className='flex items-center gap-1'>
              <User size={16} />
              <span>{post.author}</span>
            </div>
          </div>

          <div className='prose prose-lg dark:prose-invert max-w-none'>
            {post.content.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph.trim()}</p>
            ))}
          </div>
          <div className='flex justify-start'>
            <Button
              as={NextLink}
              href='/manufacturers'
              color='primary'
              variant='faded'
              startContent={<ArrowRight className='w-4 h-4' />}
              className='flex items-center gap-2'
            >
              بازگشت به تولیدکنندگان
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}
