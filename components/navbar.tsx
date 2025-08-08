import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from '@heroui/navbar'
import { Link } from '@heroui/link'
import { Input } from '@heroui/input'
import { link as linkStyles } from '@heroui/theme'
import NextLink from 'next/link'
import clsx from 'clsx'

import { siteConfig } from '@/config/site'
import { ThemeSwitch } from '@/components/theme-switch'
import { SearchIcon, Logo } from '@/components/icons'
import { Divider } from '@heroui/divider'
import NavbarPhone from './navbarPhone'
import NavMenu from './navmenu'

export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label='Search'
      classNames={{
        inputWrapper: 'bg-default-100',
        input: 'text-sm',
      }}
      labelPlacement='outside'
      startContent={
        <SearchIcon className='text-base text-default-400 pointer-events-none flex-shrink-0' />
      }
      type='search'
    />
  )

  return (
    <HeroUINavbar maxWidth='xl' position='sticky'>
      <NavbarContent className='basis-1/5 sm:basis-full' justify='start'>
        <NavbarBrand as='li' className='gap-3 max-w-fit'>
          <NextLink className='flex justify-start items-center gap-2' href='/'>
            <Logo className='w-[50] h-[50] sm:w-[70] sm:h-[70]' />
            <p className='font-bold sm:font-extrabold text-inherit text-lg sm:text-xl'>
              آهن هرمز
            </p>
          </NextLink>
        </NavbarBrand>
        <Divider orientation='vertical' className='hidden lg:block' />
        <ul className='hidden lg:flex gap-5 items-center'>
          <NavMenu />
          {siteConfig.navItems.map(item => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-primary data-[active=true]:font-medium text-xs',
                )}
                color='foreground'
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className='hidden lg:flex basis-1/5 sm:basis-full'
        justify='end'
      >
        <NavbarItem className='hidden lg:flex gap-4 items-center'>
          <NavbarPhone />
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className='lg:hidden basis-1' justify='end'>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className='mx-4 mt-2 flex flex-col gap-4'>
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link color={'foreground'} href='#' size='lg'>
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  )
}
