'use client';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar'
import { ChevronDown } from 'lucide-react'
import { link as linkStyles } from '@heroui/theme'
import NextLink from 'next/link'
import clsx from 'clsx'

export default function NavMenu() {
  return (
    <Menubar className="border-none bg-transparent flex flex-row items-center space-x-2 space-x-reverse">
      <MenubarMenu>
        <MenubarTrigger 
          className='text-sm font-normal text-nowrap cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors px-3 py-2 rounded-md'
          onMouseEnter={(e) => {
            // Force keep menu open on hover
            e.currentTarget.setAttribute('data-state', 'open');
          }}
        >
          محصولات
          <ChevronDown className='h-4 w-4 mr-0.5' />
        </MenubarTrigger>
        <MenubarContent 
          className="w-64 p-1 shadow-lg border"
          onMouseLeave={(e) => {
            // Add small delay before closing
            setTimeout(() => {
              const trigger = e.currentTarget.previousElementSibling as HTMLElement;
              if (trigger && !trigger.matches(':hover')) {
                trigger.removeAttribute('data-state');
              }
            }, 150);
          }}
        >
          <MenubarSub>
            <MenubarSubTrigger className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
              <i className='icon-rebar text-[20px] ml-1' />
              میلگرد
            </MenubarSubTrigger>
            <MenubarSubContent className="w-48 shadow-lg">
              <MenubarItem className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
                <NextLink href='/products/milgerd-sade' className="w-full block py-1">میلگرد ساده</NextLink>
              </MenubarItem>
              <MenubarItem className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
                <NextLink href='/products/milgerd-ajdar' className="w-full block py-1">میلگرد آجدار</NextLink>
              </MenubarItem>
              <MenubarItem className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
                <NextLink href='/products/milgerd-trans' className="w-full block py-1">میلگرد ترانس</NextLink>
              </MenubarItem>
              <MenubarItem className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
                <NextLink href='/products/milgerd-kolaf' className="w-full block py-1">میلگرد کلاف</NextLink>
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          
          <MenubarSeparator />
          
          <MenubarSub>
            <MenubarSubTrigger className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
              📋 ورق
            </MenubarSubTrigger>
            <MenubarSubContent className="w-48 shadow-lg">
              <MenubarItem className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
                <NextLink href='/products/varagh-siah' className="w-full block py-1">ورق سیاه</NextLink>
              </MenubarItem>
              <MenubarItem className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
                <NextLink href='/products/varagh-galvanize' className="w-full block py-1">ورق گالوانیزه</NextLink>
              </MenubarItem>
              <MenubarItem className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
                <NextLink href='/products/varagh-steel' className="w-full block py-1">ورق استیل</NextLink>
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          
          <MenubarSeparator />
          
          <MenubarSub>
            <MenubarSubTrigger className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
              📐 پروفیل
            </MenubarSubTrigger>
            <MenubarSubContent className="w-48 shadow-lg">
              <MenubarItem className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
                <NextLink href='/products/profile-upe' className="w-full block py-1">پروفیل UPE</NextLink>
              </MenubarItem>
              <MenubarItem className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
                <NextLink href='/products/profile-ipe' className="w-full block py-1">پروفیل IPE</NextLink>
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          
          <MenubarSeparator />
          
          <MenubarSub>
            <MenubarSubTrigger className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
              🔧 لوله
            </MenubarSubTrigger>
            <MenubarSubContent className="w-48 shadow-lg">
              <MenubarItem className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
                <NextLink href='/products/lole-galvanize' className="w-full block py-1">لوله گالوانیزه</NextLink>
              </MenubarItem>
              <MenubarItem className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
                <NextLink href='/products/lole-steel' className="w-full block py-1">لوله استیل</NextLink>
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          
          <MenubarSeparator />
          
          <MenubarItem className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
            <NextLink href='/products/tirahan' className="w-full block py-1">🏗️ تیرآهن</NextLink>
          </MenubarItem>
          
          <MenubarItem className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
            <NextLink href='/products/nabshi' className="w-full block py-1">📏 نبشی</NextLink>
          </MenubarItem>
          
          <MenubarSeparator />
          
          <MenubarItem className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
            <NextLink href='/products' className="font-semibold text-blue-600 w-full block py-1">
              مشاهده همه محصولات
            </NextLink>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      
      <MenubarMenu>
        <MenubarTrigger className='text-sm font-normal text-nowrap cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors px-3 py-2 rounded-md'>
          قیمت روز
        </MenubarTrigger>
        <MenubarContent className="w-48 shadow-lg">
          <MenubarItem className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
            <NextLink href='/pricing' className="w-full block py-1">لیست قیمت کامل</NextLink>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
            <NextLink href='/products/milgerd-sade' className="w-full block py-1">قیمت میلگرد</NextLink>
          </MenubarItem>
          <MenubarItem className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
            <NextLink href='/products/varagh-siah' className="w-full block py-1">قیمت ورق</NextLink>
          </MenubarItem>
          <MenubarItem className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
            <NextLink href='/products/profile-upe' className="w-full block py-1">قیمت پروفیل</NextLink>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
