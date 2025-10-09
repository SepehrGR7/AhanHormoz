'use client'

import { useSession, signOut } from 'next-auth/react'
import { Button } from '@heroui/button'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/dropdown'
import { User } from '@heroui/user'
import { LogOut, Settings, User as UserIcon } from 'lucide-react'
import { ThemeSwitch } from '@/components/theme-switch'

export default function AdminHeader() {
  const { data: session } = useSession()

  const handleSignOut = () => {
    signOut({ callbackUrl: '/admin/login' })
  }

  return (
    <header className='h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6'>
      <div className='flex items-center gap-4'>
        <h1 className='text-xl font-semibold text-gray-900 dark:text-white'>
          پنل مدیریت
        </h1>
      </div>

      <div className='flex items-center gap-4'>
        <ThemeSwitch />
        {session?.user && (
          <Dropdown placement='bottom-end'>
            <DropdownTrigger>
              <Button variant='ghost' className='p-0 h-auto'>
                <User
                  name={session.user.name}
                  description={session.user.role}
                  avatarProps={{
                    src: session.user.image || undefined,
                    fallback: <UserIcon className='w-4 h-4' />,
                    size: 'sm',
                  }}
                  className='cursor-pointer'
                />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem
                key='profile'
                startContent={<UserIcon className='w-4 h-4' />}
              >
                پروفایل
              </DropdownItem>
              <DropdownItem
                key='settings'
                startContent={<Settings className='w-4 h-4' />}
              >
                تنظیمات
              </DropdownItem>
              <DropdownItem
                key='logout'
                color='danger'
                startContent={<LogOut className='w-4 h-4' />}
                onClick={handleSignOut}
              >
                خروج
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
    </header>
  )
}
