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
        inputWrapper: 'bg-default-100/50 backdrop-blur-sm border-0 shadow-sm',
        input: 'text-sm placeholder:text-default-400',
      }}
      labelPlacement='outside'
      startContent={
        <SearchIcon className='flex-shrink-0 text-base pointer-events-none text-default-400' />
      }
      type='search'
      placeholder='جستجو در محصولات...'
    />
  )

  return (
    <HeroUINavbar
      maxWidth='2xl'
      position='sticky'
      isBordered
      className='px-2 py-2 border-b shadow-sm backdrop-blur-md sm:py-3 sm:px-4 bg-background/80 border-divider/50'
    >
      <NavbarContent className='basis-1/5 sm:basis-full' justify='start'>
        <NavbarBrand as='li' className='gap-4 max-w-fit'>
          <NextLink
            className='flex gap-3 justify-start items-center transition-all duration-300 group'
            href='/'
          >
            <div className='relative'>
              <Logo className='w-12 h-12 transition-all duration-300 lg:w-16 lg:h-16 group-hover:drop-shadow-lg' />
              <div className='absolute inset-0 bg-gradient-to-br rounded-full opacity-0 blur-xl transition-opacity duration-300 from-primary/20 to-primary/5 group-hover:opacity-100'></div>
            </div>
            <div className='flex flex-col'>
              <p className='text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r sm:text-xl lg:text-2xl from-foreground to-foreground/80'>
                آهن هرمز
              </p>
              <p className='hidden text-xs font-medium text-default-500 sm:block'>
                قیمت روز آهن آلات
              </p>
            </div>
          </NextLink>
        </NavbarBrand>

        <Divider orientation='vertical' className='hidden mx-2 h-16 lg:block' />

        <ul className='hidden gap-1 items-center xl:flex'>
          <NavMenu />
          {siteConfig.navItems.map(item => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  'relative px-3 xl:px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300',
                  'hover:bg-primary/15 hover:text-primary',
                  'focus:outline-none',
                  'group overflow-hidden',
                )}
                href={item.href}
              >
                <span className='relative z-10'>{item.label}</span>
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className='hidden lg:flex basis-1/5 sm:basis-full'
        justify='end'
      >
        <NavbarItem className='hidden gap-4 items-center xl:gap-6 lg:flex'>
          <NavbarPhone />
          <div className='w-px h-8 bg-divider'></div>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className='lg:hidden basis-1' justify='end'>
        <div className='flex gap-2 items-center sm:gap-3'>
          <ThemeSwitch />
          <NavbarMenuToggle className='transition-colors text-default-600 hover:text-primary' />
        </div>
      </NavbarContent>

      <NavbarMenu className='backdrop-blur-xl bg-background/95'>
        <div className='flex flex-col gap-2 mx-4 mt-4'>
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={'foreground'}
                href={item.href}
                size='lg'
                className='block px-4 py-3 rounded-xl transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:translate-x-2 group'
              >
                <span className='flex gap-3 items-center'>
                  <div className='w-2 h-2 rounded-full transition-colors duration-300 bg-primary/30 group-hover:bg-primary'></div>
                  {item.label}
                </span>
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  )
}
