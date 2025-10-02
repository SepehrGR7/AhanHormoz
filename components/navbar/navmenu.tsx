'use client';

import React, { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDown, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Fragment } from 'react';
import { PRODUCT_CATEGORIES } from '@/types/products';

// تعریف داده‌های محاسبه وزن آهن آلات
const weightData = [
  { href: '/weight/beam', label: 'وزن تیرآهن' },
  { href: '/weight/rebar', label: 'وزن میلگرد' },
  { href: '/weight/billet', label: 'وزن شمش فولادی' },
  { href: '/weight/pipe', label: 'وزن لوله فولادی' },
  { href: '/weight/stud', label: 'وزن ناودانی' },
  { href: '/weight/angle', label: 'وزن نبشی' },
  { href: '/weight/square-tube', label: 'وزن قوطی' },
  { href: '/weight/sheet', label: 'وزن ورق' },
];

// تعریف داده‌های محصولات با دسته‌بندی کامل
const productsData = {
  میلگرد: [
    { href: '/products/milgerd-ajdar', label: 'میلگرد آجدار' },
    { href: '/products/milgerd-sade', label: 'میلگرد ساده' },
    { href: '/products/milgerd-kolaf', label: 'میلگرد کلاف' },
    { href: '/products/milgerd-harati', label: 'میلگرد حرارتی' },
    { href: '/products/milgerd-bastar', label: 'میلگرد بستر' },
    { href: '/products/milgerd-trans', label: 'میلگرد ترانس' },
    { href: '/products/milgerd-steel', label: 'میلگرد استیل' },
  ],
  پروفیل: [
    { href: '/products/profile-sakhtmani', label: 'پروفیل ساختمانی' },
    { href: '/products/profile-kongre', label: 'پروفیل کنگره' },
    { href: '/products/profile-sanati', label: 'پروفیل صنعتی' },
    { href: '/products/profile-z', label: 'پروفیل Z' },
    { href: '/products/profile-galvanize', label: 'پروفیل گالوانیزه' },
    { href: '/products/profile-sabk', label: 'پروفیل سبک' },
    { href: '/products/profile-steel', label: 'پروفیل استیل' },
    { href: '/products/profile-aluminum', label: 'پروفیل آلومینیوم' },
    { href: '/products/profile-upe', label: 'پروفیل UPE' },
    { href: '/products/profile-ipe', label: 'پروفیل IPE' },
    { href: '/products/profile-hea', label: 'پروفیل HEA' },
    { href: '/products/profile-heb', label: 'پروفیل HEB' },
  ],
  ورق: [
    { href: '/products/varagh-garm', label: 'ورق گرم' },
    { href: '/products/varagh-siah', label: 'ورق سیاه' },
    { href: '/products/varagh-sard', label: 'ورق سرد' },
    { href: '/products/varagh-galvanize', label: 'ورق گالوانیزه' },
    { href: '/products/varagh-rangi', label: 'ورق رنگی' },
    { href: '/products/varagh-steel', label: 'ورق استیل' },
    { href: '/products/varagh-aluminum', label: 'ورق آلومینیوم' },
    { href: '/products/varagh-mes', label: 'ورق مس' },
  ],
  'نبشی و ناودانی': [
    { href: '/products/nabshi', label: 'نبشی' },
    { href: '/products/navodani', label: 'ناودانی' },
    { href: '/products/separi', label: 'سپری' },
    { href: '/products/nabshi-galvanize', label: 'نبشی گالوانیزه' },
  ],
  تیرآهن: [
    { href: '/products/tirahan', label: 'تیرآهن' },
    { href: '/products/hash', label: 'هاش' },
    { href: '/products/lane-zanbori', label: 'لانه زنبوری' },
    { href: '/products/rail', label: 'ریل' },
    { href: '/products/tirahan-sangin', label: 'تیرآهن سنگین' },
    { href: '/products/tirahan-sabk', label: 'تیرآهن سبک' },
  ],
  لوله: [
    { href: '/products/lole-darzdar', label: 'لوله درزدار' },
    { href: '/products/lole-bedone-darz', label: 'لوله بدون درز' },
    { href: '/products/lole-galvanize', label: 'لوله گالوانیزه' },
    { href: '/products/lole-steel', label: 'لوله استیل' },
    { href: '/products/lole-mes', label: 'لوله مس' },
    { href: '/products/lole-aluminum', label: 'لوله آلومینیوم' },
    { href: '/products/lole-polyethylene', label: 'لوله پلی‌اتیلن' },
    { href: '/products/lole-pvc', label: 'لوله PVC' },
  ],
  سیم: [
    { href: '/products/sim-siah', label: 'سیم سیاه' },
    { href: '/products/sim-galvanize', label: 'سیم گالوانیزه' },
    { href: '/products/sim-khardar', label: 'سیم خاردار' },
    { href: '/products/kabel', label: 'کابل' },
  ],
  توری: [
    { href: '/products/tori-hesari', label: 'توری حصاری' },
    { href: '/products/tori-joshi', label: 'توری جوشی' },
    { href: '/products/tori-galvanize', label: 'توری گالوانیزه' },
    { href: '/products/tori-plastic', label: 'توری پلاستیکی' },
  ],
  شمش: [
    { href: '/products/shamsh-folad', label: 'شمش فولاد' },
    { href: '/products/shamsh-aliaazhi', label: 'شمش آلیاژی' },
  ],
  قوطی: [
    { href: '/products/qooti-sanate', label: 'قوطی صنعتی' },
    { href: '/products/qooti-sotoni', label: 'قوطی ستونی' },
  ],
  'محصولات مفتولی': [
    { href: '/products/sim-maftooli-siah', label: 'سیم مفتولی سیاه' },
    { href: '/products/sim-maftooli-galvanize', label: 'سیم مفتولی گالوانیزه' },
    { href: '/products/toori-hesari', label: 'توری حصاری' },
    { href: '/products/mesh-ajdar', label: 'مش آجدار' },
  ],
  'مواد اولیه': [
    { href: '/products/ahan-esfonji', label: 'آهن اسفنجی' },
    { href: '/products/foro-aliazh', label: 'فروآلیاژ' },
  ],
};

// Dynamic pricing data based on product categories
const pricingData = [
  { href: '/pricing', label: 'قیمت‌های روز', icon: '💰' },
  ...PRODUCT_CATEGORIES.map((category) => ({
    href: `/pricing/${category.id}`,
    label: `قیمت ${category.name}`,
    icon: category.icon,
  })),
];

// کامپوننت SubMenu برای زیرمنوها
interface SubMenuProps {
  title: string;
  items: Array<{ href: string; label: string }>;
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const SubMenu: React.FC<SubMenuProps> = ({
  title,
  items,
  isOpen,
  onMouseEnter,
  onMouseLeave,
}) => {
  const getCategoryIcon = (categoryName: string) => {
    const icons: Record<string, string> = {
      میلگرد: 'icon-rebar',
      پروفیل: 'icon-profil',
      ورق: 'icon-varagh',
      'نبشی و ناودانی': 'icon-nabshi',
      تیرآهن: 'icon-tirahan',
      لوله: 'icon-lole',
      سیم: 'icon-wire',
      توری: 'icon-Wire-products',
      شمش: 'icon-bullion',
      قوطی: 'icon-Equipment',
      'محصولات مفتولی': 'icon-wire',
      'مواد اولیه': 'icon-stainless-steel',
    };
    return icons[categoryName] || 'icon-rebar';
  };

  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg cursor-pointer hover:bg-primary/10 hover:text-primary transition-all duration-300 group">
        <span className="flex items-center gap-3">
          <i className={`${getCategoryIcon(title)} text-lg`}></i>
          {title}
        </span>
        <ChevronLeft className="h-4 w-4 transition-transform duration-300" />
      </div>

      <Transition
        show={isOpen}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="absolute right-full top-0 mr-1 w-64 bg-background border rounded-lg p-2 shadow-lg z-[60]">
          <div className="py-1">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="group flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:translate-x-1"
              >
                <span className="w-2 h-2 rounded-full bg-current opacity-50 group-hover:opacity-100 transition-opacity duration-300"></span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Transition>
    </div>
  );
};

// کامپوننت اصلی منوی محصولات÷
const ProductsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => {
          setIsOpen(false);
          setActiveSubmenu(null);
        }}
      >
        <Menu.Button
          className="text-sm font-medium text-nowrap cursor-pointer hover:bg-primary/10 hover:text-primary transition-all duration-300 px-4 py-2.5 rounded-lg relative group overflow-hidden flex items-center gap-2 focus:outline-none focus:ring-0"
          tabIndex={-1}
        >
          <span className="relative z-10 flex items-center gap-2">
            محصولات
            <ChevronDown className="h-4 w-4 transition-transform duration-300 group-data-[headlessui-state=open]:rotate-180" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Menu.Button>

        <Transition
          show={isOpen}
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            static
            className="absolute right-0 mt-2 w-72 origin-top-right bg-background border rounded-lg p-2 shadow-lg z-50"
          >
            <div className="py-1">
              {Object.entries(productsData).map(([category, categoryItems]) => (
                <SubMenu
                  key={category}
                  title={category}
                  items={categoryItems}
                  isOpen={activeSubmenu === category}
                  onMouseEnter={() => setActiveSubmenu(category)}
                  onMouseLeave={() => setActiveSubmenu(null)}
                />
              ))}

              {/* جداکننده */}
              <div className="border-t my-2 bg-gradient-to-r from-transparent via-divider to-transparent"></div>

              {/* دکمه مشاهده همه */}
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/products"
                    className={`${
                      active
                        ? 'bg-primary/20 border-primary/40'
                        : 'border-primary/20'
                    } font-bold text-primary w-full block py-3 px-4 text-center border-2 rounded-xl bg-gradient-to-r from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/20 transition-all duration-300  hover:shadow-lg group`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      مشاهده همه محصولات
                    </span>
                  </Link>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </div>
    </Menu>
  );
};

// کامپوننت منوی وزن آهن آلات
const WeightMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <Menu.Button
          className="text-sm font-medium text-nowrap cursor-pointer hover:bg-primary/10 hover:text-primary transition-all duration-300 px-4 py-2.5 rounded-lg relative group overflow-hidden flex items-center gap-2 focus:outline-none focus:ring-0"
          tabIndex={-1}
        >
          <span className="relative z-10 flex items-center gap-2">
            وزن آهن آلات
            <ChevronDown className="h-4 w-4 transition-transform duration-300 group-data-[headlessui-state=open]:rotate-180" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Menu.Button>

        <Transition
          show={isOpen}
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            static
            className="absolute right-0 mt-2 w-80 origin-top-right bg-background border rounded-lg p-2 shadow-lg z-50 focus:outline-none focus:ring-0"
          >
            <div className="py-1">
              {weightData.map((item, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <Link
                      href={item.href}
                      className={`group flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:translate-x-1`}
                    >
                      <span className="w-2 h-2 rounded-full bg-current opacity-50 group-hover:opacity-100 transition-opacity duration-300"></span>
                      {item.label}
                    </Link>
                  )}
                </Menu.Item>
              ))}

              {/* دکمه مشاهده همه */}
            </div>
          </Menu.Items>
        </Transition>
      </div>
    </Menu>
  );
};

// کامپوننت اصلی - ادغام شده
export default function NavMenu() {
  return (
    <div className="flex items-center gap-2">
      <ProductsMenu />
      <WeightMenu />
    </div>
  );
}
