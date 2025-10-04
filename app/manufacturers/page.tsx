import { Metadata } from 'next';
import { BlogPostCard, BlogPost } from '@/components/blog-post';
import { Factory } from 'lucide-react';

export const metadata: Metadata = {
  title: 'تولید کنندگان',
  description:
    'آخرین مطالب و اخبار در مورد صنعت فولاد و تولیدکنندگان فولاد ایران',
};

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
  {
    id: 'hormozgan-steel',
    title: 'فولاد هرمزگان؛ قطب صادرات فولاد جنوب ایران',
    excerpt:
      'شرکت فولاد هرمزگان با ظرفیت تولید 1.5 میلیون تن تختال، نقش کلیدی در صادرات فولاد ایران ایفا می‌کند.',
    content: `فولاد هرمزگان در سال ۱۳۹۰ به بهره‌برداری رسید و با دسترسی به آب‌های آزاد و نزدیکی به بنادر، سهم بالایی در صادرات فولاد کشور دارد...`,
    image: '/images/blog/foolad-mobarakeh.png',
    date: '۱۴۰۴/۰۷/۰۸',
    readTime: '۳ دقیقه',
    author: 'تحریریه آهن هرمز',
  },
  {
    id: 'green-steel-mobarakeh',
    title: 'فولاد مبارکه و پروژه‌های توسعه سبز',
    excerpt:
      'فولاد مبارکه با سرمایه‌گذاری در انرژی‌های تجدیدپذیر و کاهش آلایندگی، پیشگام توسعه پایدار در صنعت فولاد ایران است.',
    content: `این شرکت با اجرای پروژه‌های نیروگاه خورشیدی و تصفیه پساب صنعتی، گام‌های مهمی در راستای مسئولیت اجتماعی و محیط زیست برداشته است...`,
    image: '/images/blog/foolad-mobarakeh.png',
    date: '۱۴۰۴/۰۷/۰۷',
    readTime: '۲ دقیقه',
    author: 'تحریریه آهن هرمز',
  },
  {
    id: 'iran-railway-steel',
    title: 'نقش فولاد در پروژه‌های ملی راه‌آهن ایران',
    excerpt:
      'توسعه خطوط ریلی کشور بدون تولید ریل ملی توسط ذوب آهن اصفهان ممکن نبود.',
    content: `ریل ملی ایران با استانداردهای جهانی توسط ذوب آهن اصفهان تولید و در پروژه‌های راه‌آهن سراسری استفاده می‌شود...`,
    image: '/images/blog/zob-ahan.png',
    date: '۱۴۰۴/۰۷/۰۶',
    readTime: '۳ دقیقه',
    author: 'تحریریه آهن هرمز',
  },
  {
    id: 'khorasan-rebar',
    title: 'فولاد خراسان؛ پیشگام در تولید میلگرد',
    excerpt:
      'مجتمع فولاد خراسان با ظرفیت تولید سالانه بیش از یک میلیون تن میلگرد، یکی از بزرگترین تولیدکنندگان شرق کشور است.',
    content: `این مجتمع با بهره‌گیری از فناوری‌های روز دنیا و خطوط تولید پیشرفته، محصولات متنوعی را به بازار عرضه می‌کند...`,
    image: '/images/blog/foolad-khuzestan.png',
    date: '۱۴۰۴/۰۷/۰۵',
    readTime: '۲ دقیقه',
    author: 'تحریریه آهن هرمز',
  },
  {
    id: 'jahan-ara-arvand',
    title: 'فولاد جهان آرا اروند؛ توسعه صادراتی در منطقه آزاد',
    excerpt:
      'این شرکت با موقعیت جغرافیایی ویژه در منطقه آزاد اروند، نقش مهمی در صادرات فولاد ایران به کشورهای همسایه دارد.',
    content: `فولاد جهان آرا اروند با ظرفیت تولید قابل توجه و دسترسی به آب‌های آزاد، صادرات فولاد را تسهیل کرده است...`,
    image: '/images/blog/foolad-mobarakeh.png',
    date: '۱۴۰۴/۰۷/۰۴',
    readTime: '۲ دقیقه',
    author: 'تحریریه آهن هرمز',
  },
];

export default function ManufacturersPage() {
  return (
    <main className="relative">
      {/* Hero Section */}
      <div className="relative overflow-hidden text-white bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 translate-x-20 -translate-y-20 rounded-full w-96 h-96 bg-white/5"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 -translate-x-20 translate-y-20 rounded-full bg-white/5"></div>

        <div className="relative px-6 py-16 mx-auto max-w-7xl">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 border-2 rounded-full shadow-2xl bg-white/20 backdrop-blur-md border-white/30 mx-auto">
              <Factory className="w-8 h-8 text-white drop-shadow-lg" />
            </div>
            <h1 className="mb-6 text-5xl font-bold text-white drop-shadow-2xl">
              تولیدکنندگان فولاد ایران
            </h1>
            <p className="max-w-3xl mx-auto text-xl font-medium leading-relaxed text-white/95 drop-shadow-lg">
              آشنایی با بزرگترین و معتبرترین تولیدکنندگان فولاد و محصولات فولادی
              در ایران
            </p>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="container px-6 py-16 mx-auto">
        <div className="relative z-20 -mt-24">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
