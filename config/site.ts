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
        { label: 'میلگرد آجدار', href: '/products/milgerd-ajdar' },
        { label: 'میلگرد ساده', href: '/products/milgerd-sade' },
        { label: 'میلگرد کلاف', href: '/products/milgerd-kolaf' },
        { label: 'میلگرد حرارتی', href: '/products/milgerd-harati' },
        { label: 'میلگرد بستر', href: '/products/milgerd-bastar' },
        { label: 'میلگرد ترانس', href: '/products/milgerd-trans' },
        { label: 'میلگرد استیل', href: '/products/milgerd-steel' },
      ],
    },
    {
      name: 'profile',
      icon: 'icon-profile',
      label: 'پروفیل',
      items: [
        { label: 'پروفیل ساختمانی', href: '/products/profile-sakhtmani' },
        { label: 'پروفیل کنگره', href: '/products/profile-kongre' },
        { label: 'پروفیل صنعتی', href: '/products/profile-sanati' },
        { label: 'پروفیل Z', href: '/products/profile-z' },
        { label: 'پروفیل گالوانیزه', href: '/products/profile-galvanize' },
        { label: 'پروفیل سبک', href: '/products/profile-sabk' },
        { label: 'پروفیل استیل', href: '/products/profile-steel' },
        { label: 'پروفیل آلومینیوم', href: '/products/profile-aluminum' },
        { label: 'پروفیل UPE', href: '/products/profile-upe' },
        { label: 'پروفیل IPE', href: '/products/profile-ipe' },
        { label: 'پروفیل HEA', href: '/products/profile-hea' },
        { label: 'پروفیل HEB', href: '/products/profile-heb' },
      ],
    },
    {
      name: 'sheet',
      icon: 'icon-sheet',
      label: 'ورق',
      items: [
        { label: 'ورق گرم', href: '/products/varagh-garm' },
        { label: 'ورق سیاه', href: '/products/varagh-siah' },
        { label: 'ورق سرد', href: '/products/varagh-sard' },
        { label: 'ورق گالوانیزه', href: '/products/varagh-galvanize' },
        { label: 'ورق رنگی', href: '/products/varagh-rangi' },
        { label: 'ورق استیل', href: '/products/varagh-steel' },
        { label: 'ورق آلومینیوم', href: '/products/varagh-aluminum' },
        { label: 'ورق مس', href: '/products/varagh-mes' },
      ],
    },
    {
      name: 'angle',
      icon: 'icon-Corners',
      label: 'نبشی و ناودانی',
      items: [
        { label: 'نبشی', href: '/products/nabshi' },
        { label: 'ناودانی', href: '/products/navodani' },
        { label: 'سپری', href: '/products/separi' },
        { label: 'نبشی گالوانیزه', href: '/products/nabshi-galvanize' },
      ],
    },
    {
      name: 'beam',
      icon: 'icon-girder',
      label: 'تیرآهن',
      items: [
        { label: 'تیرآهن', href: '/products/tirahan' },
        { label: 'هاش', href: '/products/hash' },
        { label: 'لانه زنبوری', href: '/products/lane-zanbori' },
        { label: 'ریل', href: '/products/rail' },
        { label: 'تیرآهن سنگین', href: '/products/tirahan-sangin' },
        { label: 'تیرآهن سبک', href: '/products/tirahan-sabk' },
      ],
    },
    {
      name: 'pipe',
      icon: 'icon-pipe',
      label: 'لوله',
      items: [
        { label: 'لوله درزدار', href: '/products/lole-darzdar' },
        { label: 'لوله بدون درز', href: '/products/lole-bedone-darz' },
        { label: 'لوله گالوانیزه', href: '/products/lole-galvanize' },
        { label: 'لوله استیل', href: '/products/lole-steel' },
        { label: 'لوله مس', href: '/products/lole-mes' },
        { label: 'لوله آلومینیوم', href: '/products/lole-aluminum' },
        { label: 'لوله پلی‌اتیلن', href: '/products/lole-polyethylene' },
        { label: 'لوله PVC', href: '/products/lole-pvc' },
      ],
    },
    {
      name: 'wire',
      icon: 'icon-Wire-products',
      label: 'سیم',
      items: [
        { label: 'سیم سیاه', href: '/products/sim-siah' },
        { label: 'سیم گالوانیزه', href: '/products/sim-galvanize' },
        { label: 'سیم خاردار', href: '/products/sim-khardar' },
        { label: 'کابل', href: '/products/kabel' },
      ],
    },
    {
      name: 'mesh',
      icon: 'icon-wire',
      label: 'توری',
      items: [
        { label: 'توری حصاری', href: '/products/tori-hesari' },
        { label: 'توری جوشی', href: '/products/tori-joshi' },
        { label: 'توری گالوانیزه', href: '/products/tori-galvanize' },
        { label: 'توری پلاستیکی', href: '/products/tori-plastic' },
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
