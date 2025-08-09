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
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className='text-sm font-normal text-nowrap'>
          <p>قیمت محصولات</p>
          <ChevronDown className='h-4 w-4 mr-0.5' />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>
              <NextLink
                href='/rebar'
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-primary data-[active=true]:font-medium text-sm',
                )}
              >
                <i className='icon-rebar text-[32px] ml-1' />
                قیمت میلگرد
              </NextLink>
            </MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>میلگرد ساده</MenubarItem>
              <MenubarItem>میلگرد ساده</MenubarItem>
              <MenubarItem>میلگرد ساده</MenubarItem>
              <MenubarItem>میلگرد ساده</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
