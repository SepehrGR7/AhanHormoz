'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Building2,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Shield,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const sidebarItems = [
  {
    title: 'داشبورد',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'محصولات',
    href: '/admin/products',
    icon: Package,
  },
  {
    title: 'دسته‌بندی‌ها',
    href: '/admin/categories',
    icon: FolderTree,
  },
  {
    title: 'تولیدکنندگان',
    href: '/admin/manufacturers',
    icon: Building2,
  },
  {
    title: 'تنظیمات',
    href: '/admin/settings',
    icon: Settings,
  },
]

const superAdminItems = [
  {
    title: 'کاربران ادمین',
    href: '/admin/users',
    icon: Shield,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const allItems =
    session?.user?.role === 'SUPER_ADMIN'
      ? [...sidebarItems, ...superAdminItems]
      : sidebarItems

  return (
    <div className='fixed inset-y-0 right-0 z-50 w-64 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700'>
      <div className='flex h-16 items-center px-6 border-b border-gray-200 dark:border-gray-700'>
        <Link href='/admin/dashboard' className='flex items-center gap-2'>
          <Package className='h-8 w-8 text-primary' />
          <span className='text-xl font-bold'>آهن هرمز</span>
        </Link>
      </div>

      <nav className='mt-8 px-4'>
        <ul className='space-y-2'>
          {allItems.map(item => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
                  )}
                >
                  <Icon className='h-5 w-5' />
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
