import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin users
  console.log('Creating admin users...')

  const adminPassword = await bcrypt.hash('admin123', 12)
  const superAdminPassword = await bcrypt.hash('superadmin123', 12)

  await prisma.user.upsert({
    where: { email: 'admin@ahanhormoz.com' },
    update: {},
    create: {
      email: 'admin@ahanhormoz.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  })

  await prisma.user.upsert({
    where: { email: 'superadmin@ahanhormoz.com' },
    update: {},
    create: {
      email: 'superadmin@ahanhormoz.com',
      password: superAdminPassword,
      name: 'Super Admin',
      role: 'SUPER_ADMIN',
    },
  })

  console.log('✅ Admin users created')

  // Create categories
  const categories = [
    {
      name: 'میلگرد',
      slug: 'milgerd',
      description: 'انواع میلگرد صاف و آجدار',
      icon: '🏗️',
      subcategories: ['میلگرد صاف', 'میلگرد آجدار', 'میلگرد گالوانیزه'],
    },
    {
      name: 'تیرآهن',
      slug: 'tirahann',
      description: 'انواع تیرآهن و پروفیل',
      icon: '⚡',
      subcategories: ['تیرآهن IPE', 'تیرآهن HEB', 'تیرآهن UNP'],
    },
    {
      name: 'ورق فولادی',
      slug: 'varaq-foladi',
      description: 'انواع ورق فولادی',
      icon: '📋',
      subcategories: ['ورق سیاه', 'ورق گالوانیزه', 'ورق رنگی'],
    },
    {
      name: 'لوله فولادی',
      slug: 'luleh-foladi',
      description: 'انواع لوله فولادی',
      icon: '🔧',
      subcategories: ['لوله درزدار', 'لوله بدون درز', 'لوله گالوانیزه'],
    },
    {
      name: 'شمش فولادی',
      slug: 'shamsh-foladi',
      description: 'انواع شمش فولادی',
      icon: '⬛',
      subcategories: ['شمش A36', 'شمش A283', 'شمش مخصوص'],
    },
  ]

  for (const category of categories) {
    await prisma.productCategory.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    })
  }

  console.log('✅ Categories created')

  // Create manufacturers
  const manufacturers = [
    {
      name: 'فولاد مبارکه اصفهان',
      slug: 'foolad-mobarakeh',
      description: 'بزرگترین تولیدکننده فولاد ایران',
      website: 'https://msc.ir',
      email: 'info@msc.ir',
      phone: '031-52618000',
      address: 'اصفهان، شهرک صنعتی',
    },
    {
      name: 'ذوب آهن اصفهان',
      slug: 'zob-ahan',
      description: 'اولین تولیدکننده فولاد ایران',
      website: 'https://www.isco.ir',
      email: 'info@isco.ir',
      phone: '031-52901000',
      address: 'اصفهان، ذوب آهن',
    },
    {
      name: 'فولاد خوزستان',
      slug: 'foolad-khuzestan',
      description: 'تولیدکننده شمش فولادی',
      website: 'https://ksc.ir',
      email: 'info@ksc.ir',
      phone: '061-34440000',
      address: 'اهواز، فولاد شهر',
    },
  ]

  for (const manufacturer of manufacturers) {
    await prisma.manufacturer.upsert({
      where: { slug: manufacturer.slug },
      update: {},
      create: manufacturer,
    })
  }

  console.log('✅ Manufacturers created')

  // Get created categories and manufacturers
  const createdCategories = await prisma.productCategory.findMany()
  const createdManufacturers = await prisma.manufacturer.findMany()

  // Create sample products
  const sampleProducts = [
    {
      name: 'میلگرد صاف 12 میلیمتر',
      slug: 'milgerd-sade-12mm',
      description: 'میلگرد صاف 12 میلیمتر مناسب برای ساختمان‌سازی',
      categoryId: createdCategories.find((c: any) => c.slug === 'milgerd')?.id!,
      subcategory: 'میلگرد صاف',
      brand: 'فولاد مبارکه',
      size: '12mm',
      price: 45000,
      unit: 'kg',
      weight: 0.888,
      inStock: true,
      images: ['/images/products/milgerd-12mm.jpg'],
      grade: 'A3',
      diameter: '12mm',
      length: '12m',
      standard: 'ISIRI 6906',
      specifications: {
        'حد تسلیم': '300 مگاپاسکال',
        'حد کشش': '500 مگاپاسکال',
        'ازدیاد طول': '14%',
      },
      features: ['مقاومت بالا', 'قابلیت خمش خوب', 'سطح صاف'],
      applications: ['ساختمان‌سازی', 'بتن آرمه', 'تقویت سازه'],
    },
    {
      name: 'میلگرد آجدار 16 میلیمتر',
      slug: 'milgerd-ajdar-16mm',
      description: 'میلگرد آجدار 16 میلیمتر با چسبندگی بالا',
      categoryId: createdCategories.find((c: any) => c.slug === 'milgerd')?.id!,
      subcategory: 'میلگرد آجدار',
      brand: 'ذوب آهن',
      size: '16mm',
      price: 47000,
      unit: 'kg',
      weight: 1.578,
      inStock: true,
      images: ['/images/products/milgerd-ajdar-16mm.jpg'],
      grade: 'A3',
      diameter: '16mm',
      length: '12m',
      standard: 'ISIRI 6906',
      specifications: {
        'حد تسلیم': '400 مگاپاسکال',
        'حد کشش': '600 مگاپاسکال',
        'ازدیاد طول': '12%',
      },
      features: ['سطح آجدار', 'چسبندگی عالی', 'مقاومت بالا'],
      applications: ['بتن آرمه', 'سازه‌های مهم', 'پل‌سازی'],
    },
    {
      name: 'تیرآهن IPE 120',
      slug: 'tirahenn-ipe-120',
      description: 'تیرآهن IPE 120 استاندارد اروپایی',
      categoryId: createdCategories.find((c: any) => c.slug === 'tirahann')
        ?.id!,
      subcategory: 'تیرآهن IPE',
      brand: 'فولاد مبارکه',
      size: 'IPE 120',
      price: 52000,
      unit: 'kg',
      weight: 10.4,
      inStock: true,
      images: ['/images/products/ipe-120.jpg'],
      height: '120mm',
      length: '12m',
      standard: 'EN 10025',
      specifications: {
        ارتفاع: '120 میلیمتر',
        'عرض بال': '64 میلیمتر',
        'ضخامت جان': '4.4 میلیمتر',
        'ضخامت بال': '6.3 میلیمتر',
      },
      features: ['وزن کم', 'مقاومت بالا', 'نصب آسان'],
      applications: ['سازه فلزی', 'سقف کاذب', 'اسکلت ساختمان'],
    },
  ]

  for (const product of sampleProducts) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    })
  }

  console.log('✅ Sample products created')

  // Create a sample customer
  const customer = await prisma.customer.upsert({
    where: { phone: '09123456789' },
    update: {},
    create: {
      name: 'احمد محمدی',
      email: 'ahmad@example.com',
      phone: '09123456789',
      company: 'شرکت ساختمانی نمونه',
      address: 'تهران، خیابان ولیعصر',
      city: 'تهران',
    },
  })

  console.log('✅ Sample customer created')

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch(e => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
