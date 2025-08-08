export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'آهن هرمز | قیمت روز انواع آهن آلات',
  description: 'آهن هرمز،بروز ترین مرجع اطلاع رسانی قیمت انواع آهن آلات',
  navItems: [
    {
      label: 'وزن آهن آلات',
      href: '/pricing',
    },
    {
      label: 'اخبار بازار آهن',
      href: '/blog',
    },
    {
      label: 'درباره ما',
      href: '/about',
    },
    {
      label: 'تماس با ما',
      href: '/contact',
    },
  ],
  navMenuItems: [
    {
      label: 'قیمت آهن',
      href: '/',
    },
    {
      label: 'وزن آهن آلات',
      href: '/pricing',
    },
    {
      label: 'اخبار بازار آهن',
      href: '/blog',
    },
    {
      label: 'درباره ما',
      href: '/about',
    },
    {
      label: 'تماس با ما',
      href: '/contact',
    },
  ],
  heroItems: [
    {
      name: 'rebar',
      icon: 'icon-rebar',
      label: 'میلگرد',
      items: [
        {
          label: '',
          href: '',
        },
      ],
    },
    {
      name: 'sheet',
      icon: 'icon-sheet',
      label: 'ورق',
      items: [
        {
          label: '',
          href: '',
        },
      ],
    },
    {
      name: 'pipe',
      icon: 'icon-pipe',
      label: 'لوله',
      items: [
        {
          label: '',
          href: '',
        },
      ],
    },
    {
      name: 'profile',
      icon: 'icon-profile',
      label: 'پروفیل',
      items: [
        {
          label: '',
          href: '',
        },
      ],
    },
  ],
  links: {
    github: 'https://github.com/heroui-inc/heroui',
    twitter: 'https://twitter.com/hero_ui',
    docs: 'https://heroui.com',
    discord: 'https://discord.gg/9b6yyZKmH4',
    sponsor: 'https://patreon.com/jrgarciadev',
  },
}
