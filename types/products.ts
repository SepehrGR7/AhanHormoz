export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subcategory: string;
  brand: string;
  size: string;
  price: number;
  unit: 'kg' | 'ton' | 'piece';
  weight?: number; // وزن تقریبی برای هر شاخه
  description?: string;
  image?: string;
  inStock: boolean;
  lastUpdated: string;
  // فیلدهای تخصصی اختیاری
  thickness?: string; // برای ورق و نبشی
  diameter?: string; // برای لوله و سیم
  grade?: string; // درجه کیفیت
  coating?: string; // نوع پوشش/جنس
  standard?: string; // استاندارد
  length?: string; // طول
  // فیلدهای جدید
  subtype?: string; // نوع زیرمجموعه
  weightType?: string; // نوع وزن
  sheetType?: string; // نوع ورق
  pipeType?: string; // نوع لوله
  wireType?: string; // نوع سیم
  height?: string; // ارتفاع (برای تیرآهن)
  meshSize?: string; // سایز چشمه توری
  packageType?: string; // نوع بسته‌بندی
}

export interface ProductCategory {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
}

export interface PriceFilter {
  category?: string;
  subcategory?: string;
  brand?: string | string[]; // پشتیبانی از چندین برند
  size?: string | string[]; // پشتیبانی از چندین سایز
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  // فیلترهای تخصصی
  thickness?: string | string[]; // برای ورق و نبشی
  diameter?: string | string[]; // برای لوله
  grade?: string | string[]; // درجه کیفیت
  coating?: string | string[]; // نوع پوشش (گالوانیزه، رنگی و...)
  standard?: string | string[]; // استاندارد (ملی، بین‌المللی)
  length?: string | string[]; // طول
  // فیلترهای جدید
  subtype?: string | string[]; // نوع زیرمجموعه (نبشی، ناودانی، سپری)
  weightType?: string | string[]; // نوع وزن (استاندارد، هم وزن اروپا)
  sheetType?: string | string[]; // نوع ورق (سیاه، گالوانیزه، رنگی، آجدار)
  pipeType?: string | string[]; // نوع لوله (داربستی، مانیسمان، گازی، اسپیرال)
  wireType?: string | string[]; // نوع سیم (سیاه، گالوانیزه، خاردار)
  height?: string | string[]; // ارتفاع (برای تیرآهن)
  meshSize?: string | string[]; // سایز چشمه توری
  packageType?: string | string[]; // نوع بسته‌بندی
}

export interface WeightCalculation {
  diameter: number;
  length: number;
  quantity: number;
  totalWeight: number;
}

// دسته‌بندی محصولات
export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'rebar',
    name: 'میلگرد',
    icon: '🔩',
    subcategories: [
      'آجدار',
      'ساده',
      'کلاف',
      'حرارتی',
      'بستر',
      'ترانس',
      'استیل',
    ],
  },
  {
    id: 'profile',
    name: 'پروفیل',
    icon: '📐',
    subcategories: [
      'ساختمانی',
      'کنگره',
      'صنعتی',
      'Z',
      'گالوانیزه',
      'سبک',
      'استیل',
      'آلومینیوم',
      'UPE',
      'IPE',
      'HEA',
      'HEB',
    ],
  },
  {
    id: 'sheet',
    name: 'ورق',
    icon: '📋',
    subcategories: [
      'گرم',
      'سیاه',
      'سرد',
      'گالوانیزه',
      'رنگی',
      'استیل',
      'آلومینیوم',
      'مس',
    ],
  },
  {
    id: 'angle',
    name: 'نبشی و ناودانی',
    icon: '📏',
    subcategories: ['نبشی', 'ناودانی', 'سپری', 'گالوانیزه'],
  },
  {
    id: 'beam',
    name: 'تیرآهن',
    icon: '🏗️',
    subcategories: ['تیرآهن', 'هاش', 'لانه زنبوری', 'ریل', 'سنگین', 'سبک'],
  },
  {
    id: 'pipe',
    name: 'لوله',
    icon: '🔧',
    subcategories: [
      'درزدار',
      'بدون درز',
      'گالوانیزه',
      'استیل',
      'مس',
      'آلومینیوم',
      'پلی‌اتیلن',
      'PVC',
    ],
  },
  {
    id: 'wire',
    name: 'سیم',
    icon: '🧵',
    subcategories: ['سیم سیاه', 'سیم گالوانیزه', 'سیم خاردار', 'کابل'],
  },
  {
    id: 'mesh',
    name: 'توری',
    icon: '🕸️',
    subcategories: [
      'توری حصاری',
      'توری جوشی',
      'توری گالوانیزه',
      'توری پلاستیکی',
    ],
  },
  {
    id: 'shamsh',
    name: 'شمش',
    icon: '🧱',
    subcategories: ['فولاد', 'آلیاژی'],
  },
  {
    id: 'qooti',
    name: 'قوطی',
    icon: '📦',
    subcategories: ['صنعتی', 'ستونی'],
  },
  {
    id: 'maftoli',
    name: 'محصولات مفتولی',
    icon: '🔗',
    subcategories: [
      'سیم مفتولی سیاه',
      'سیم مفتولی گالوانیزه',
      'توری حصاری',
      'مش آجدار',
    ],
  },
  {
    id: 'raw-materials',
    name: 'مواد اولیه',
    icon: '⚗️',
    subcategories: ['آهن اسفنجی', 'فروآلیاژ'],
  },
];

// مسیرهای محصولات برای routing
export const PRODUCT_ROUTES = {
  // میلگرد
  'milgerd-ajdar': {
    category: 'rebar',
    subcategory: 'آجدار',
    name: 'میلگرد آجدار',
  },
  'milgerd-sade': {
    category: 'rebar',
    subcategory: 'ساده',
    name: 'میلگرد ساده',
  },
  'milgerd-kolaf': {
    category: 'rebar',
    subcategory: 'کلاف',
    name: 'میلگرد کلاف',
  },
  'milgerd-harati': {
    category: 'rebar',
    subcategory: 'حرارتی',
    name: 'میلگرد حرارتی',
  },
  'milgerd-bastar': {
    category: 'rebar',
    subcategory: 'بستر',
    name: 'میلگرد بستر',
  },
  'milgerd-trans': {
    category: 'rebar',
    subcategory: 'ترانس',
    name: 'میلگرد ترانس',
  },
  'milgerd-steel': {
    category: 'rebar',
    subcategory: 'استیل',
    name: 'میلگرد استیل',
  },

  // پروفیل
  'profile-sakhtmani': {
    category: 'profile',
    subcategory: 'ساختمانی',
    name: 'پروفیل ساختمانی',
  },
  'profile-kongre': {
    category: 'profile',
    subcategory: 'کنگره',
    name: 'پروفیل کنگره',
  },
  'profile-sanati': {
    category: 'profile',
    subcategory: 'صنعتی',
    name: 'پروفیل صنعتی',
  },
  'profile-z': { category: 'profile', subcategory: 'Z', name: 'پروفیل Z' },
  'profile-galvanize': {
    category: 'profile',
    subcategory: 'گالوانیزه',
    name: 'پروفیل گالوانیزه',
  },
  'profile-sabk': {
    category: 'profile',
    subcategory: 'سبک',
    name: 'پروفیل سبک',
  },
  'profile-steel': {
    category: 'profile',
    subcategory: 'استیل',
    name: 'پروفیل استیل',
  },
  'profile-aluminum': {
    category: 'profile',
    subcategory: 'آلومینیوم',
    name: 'پروفیل آلومینیوم',
  },
  'profile-upe': {
    category: 'profile',
    subcategory: 'UPE',
    name: 'پروفیل UPE',
  },
  'profile-ipe': {
    category: 'profile',
    subcategory: 'IPE',
    name: 'پروفیل IPE',
  },
  'profile-hea': {
    category: 'profile',
    subcategory: 'HEA',
    name: 'پروفیل HEA',
  },
  'profile-heb': {
    category: 'profile',
    subcategory: 'HEB',
    name: 'پروفیل HEB',
  },

  // ورق
  'varagh-garm': { category: 'sheet', subcategory: 'گرم', name: 'ورق گرم' },
  'varagh-siah': { category: 'sheet', subcategory: 'سیاه', name: 'ورق سیاه' },
  'varagh-sard': { category: 'sheet', subcategory: 'سرد', name: 'ورق سرد' },
  'varagh-galvanize': {
    category: 'sheet',
    subcategory: 'گالوانیزه',
    name: 'ورق گالوانیزه',
  },
  'varagh-rangi': { category: 'sheet', subcategory: 'رنگی', name: 'ورق رنگی' },
  'varagh-steel': {
    category: 'sheet',
    subcategory: 'استیل',
    name: 'ورق استیل',
  },
  'varagh-aluminum': {
    category: 'sheet',
    subcategory: 'آلومینیوم',
    name: 'ورق آلومینیوم',
  },
  'varagh-mes': { category: 'sheet', subcategory: 'مس', name: 'ورق مس' },

  // نبشی و ناودانی
  nabshi: { category: 'angle', subcategory: 'نبشی', name: 'نبشی' },
  navodani: { category: 'angle', subcategory: 'ناودانی', name: 'ناودانی' },
  separi: { category: 'angle', subcategory: 'سپری', name: 'سپری' },
  'nabshi-galvanize': {
    category: 'angle',
    subcategory: 'گالوانیزه',
    name: 'نبشی گالوانیزه',
  },

  // تیرآهن
  tirahan: { category: 'beam', subcategory: 'تیرآهن', name: 'تیرآهن' },
  hash: { category: 'beam', subcategory: 'هاش', name: 'هاش' },
  'lane-zanbori': {
    category: 'beam',
    subcategory: 'لانه زنبوری',
    name: 'لانه زنبوری',
  },
  rail: { category: 'beam', subcategory: 'ریل', name: 'ریل' },
  'tirahan-sangin': {
    category: 'beam',
    subcategory: 'سنگین',
    name: 'تیرآهن سنگین',
  },
  'tirahan-sabk': { category: 'beam', subcategory: 'سبک', name: 'تیرآهن سبک' },

  // لوله
  'lole-darzdar': {
    category: 'pipe',
    subcategory: 'درزدار',
    name: 'لوله درزدار',
  },
  'lole-bedone-darz': {
    category: 'pipe',
    subcategory: 'بدون درز',
    name: 'لوله بدون درز',
  },
  'lole-galvanize': {
    category: 'pipe',
    subcategory: 'گالوانیزه',
    name: 'لوله گالوانیزه',
  },
  'lole-steel': { category: 'pipe', subcategory: 'استیل', name: 'لوله استیل' },
  'lole-mes': { category: 'pipe', subcategory: 'مس', name: 'لوله مس' },
  'lole-aluminum': {
    category: 'pipe',
    subcategory: 'آلومینیوم',
    name: 'لوله آلومینیوم',
  },
  'lole-polyethylene': {
    category: 'pipe',
    subcategory: 'پلی‌اتیلن',
    name: 'لوله پلی‌اتیلن',
  },
  'lole-pvc': { category: 'pipe', subcategory: 'PVC', name: 'لوله PVC' },

  // سی��
  'sim-siah': { category: 'wire', subcategory: 'سیم سیاه', name: 'سیم سیاه' },
  'sim-galvanize': {
    category: 'wire',
    subcategory: 'سیم گالوانیزه',
    name: 'سیم گالوانیزه',
  },
  'sim-khardar': {
    category: 'wire',
    subcategory: 'سیم خاردار',
    name: 'سیم خاردار',
  },
  kabel: { category: 'wire', subcategory: 'کابل', name: 'کابل' },

  // توری
  'tori-hesari': {
    category: 'mesh',
    subcategory: 'توری حصاری',
    name: 'توری حصاری',
  },
  'tori-joshi': {
    category: 'mesh',
    subcategory: 'توری جوشی',
    name: 'توری جوشی',
  },
  'tori-galvanize': {
    category: 'mesh',
    subcategory: 'توری گالوانیزه',
    name: 'توری گالوانیزه',
  },
  'tori-plastic': {
    category: 'mesh',
    subcategory: 'توری پلاستیکی',
    name: 'توری پلاستیکی',
  },

  // شمش
  'shamsh-folad': {
    category: 'shamsh',
    subcategory: 'فولاد',
    name: 'شمش فولاد',
  },
  'shamsh-aliaazhi': {
    category: 'shamsh',
    subcategory: 'آلیاژی',
    name: 'شمش آلیاژی',
  },

  // قوطی
  'qooti-sanate': {
    category: 'qooti',
    subcategory: 'صنعتی',
    name: 'قوطی صنعتی',
  },
  'qooti-sotoni': {
    category: 'qooti',
    subcategory: 'ستونی',
    name: 'قوطی ستونی',
  },

  // محصولات مفتولی
  'sim-maftooli-siah': {
    category: 'maftoli',
    subcategory: 'سیم مفتولی سیاه',
    name: 'سیم مفتولی سیاه',
  },
  'sim-maftooli-galvanize': {
    category: 'maftoli',
    subcategory: 'سیم مفتولی گالوانیزه',
    name: 'سیم مفتولی گالوانیزه',
  },
  'toori-hesari': {
    category: 'maftoli',
    subcategory: 'توری حصاری',
    name: 'توری حصاری',
  },
  'mesh-ajdar': {
    category: 'maftoli',
    subcategory: 'مش آجدار',
    name: 'مش آجدار',
  },

  // مواد اولیه
  'ahan-esfonji': {
    category: 'raw-materials',
    subcategory: 'آهن اسفنجی',
    name: 'آهن اسفنجی',
  },
  'foro-aliazh': {
    category: 'raw-materials',
    subcategory: 'فروآلیاژ',
    name: 'فروآلیاژ',
  },
};

// برندهای معروف
export const BRANDS = [
  'اصفهان',
  'نیشابور',
  'میانه',
  'ظفر بناب',
  'فایکو',
  'راد همدان',
  'بافق',
  'آناهیتا',
  'زاگرس',
  'ابرکوه',
  'شاهرود',
  'شاهین بناب',
  'اهواز',
  'اروند',
  'آریان فولاد',
  'فولاد ثامن',
  'فولاد سپهر',
  'فولاد متین',
];

// سایزهای رایج میلگرد
export const REBAR_SIZES = [
  '8',
  '10',
  '12',
  '14',
  '16',
  '18',
  '20',
  '22',
  '25',
  '28',
  '32',
];

// سایزهای تیرآهن
export const BEAM_SIZES = [
  '10',
  '12',
  '14',
  '16',
  '18',
  '20',
  '22',
  '24',
  '27',
  '30',
];

// سایزهای قوطی
export const QOOTI_SIZES = [
  '20×20×2',
  '25×25×2',
  '30×30×3',
  '40×40×3',
  '50×50×4',
  '60×60×4',
  '80×80×5',
  '100×100×5',
  '120×120×6',
  '150×150×8',
];

// سایزهای سیم مفتولی
export const WIRE_SIZES = [
  '1mm',
  '1.5mm',
  '2mm',
  '2.5mm',
  '3mm',
  '4mm',
  '5mm',
  '6mm',
  '8mm',
];

// ابعاد شمش
export const SHAMSH_SIZES = [
  '50kg',
  '100kg',
  '150kg',
  '200kg',
  '250kg',
  '300kg',
];

// ابعاد مش
export const MESH_SIZES = [
  '100×100×6',
  '150×150×6',
  '150×150×8',
  '200×200×8',
  '200×200×10',
];

// نمونه محصولات
export const SAMPLE_PRODUCTS: Product[] = [
  // میلگرد آجدار
  {
    id: 'rebar-8-isfahan',
    name: 'میلگرد آجدار 8',
    category: PRODUCT_CATEGORIES[0],
    subcategory: 'آجدار',
    brand: 'اصفهان',
    size: '8',
    price: 182000,
    unit: 'kg',
    weight: 0.395,
    description: 'میلگرد آجدار سایز 8 برند اصفهان - مطابق استاندارد ملی ایران',
    inStock: true,
    lastUpdated: '2025-09-15',
    grade: 'A3',
    length: '12',
  },
  {
    id: 'rebar-10-isfahan',
    name: 'میلگرد آجدار 10',
    category: PRODUCT_CATEGORIES[0],
    subcategory: 'آجدار',
    brand: 'اصفهان',
    size: '10',
    price: 183000,
    unit: 'kg',
    weight: 0.617,
    description: 'میلگرد آجدار سایز 10 برند اصفهان - کیفیت A3',
    inStock: true,
    lastUpdated: '2025-09-15',
  },
  {
    id: 'rebar-12-isfahan',
    name: 'میلگرد آجدار 12',
    category: PRODUCT_CATEGORIES[0],
    subcategory: 'آجدار',
    brand: 'اصفهان',
    size: '12',
    price: 184000,
    unit: 'kg',
    weight: 0.888,
    description: 'میلگرد آجدار سایز 12 برند اصفهان - مقاوم در برابر زلزله',
    inStock: true,
    lastUpdated: '2025-09-15',
  },
  {
    id: 'rebar-14-isfahan',
    name: 'میلگرد آجدار 14',
    category: PRODUCT_CATEGORIES[0],
    subcategory: 'آجدار',
    brand: 'اصفهان',
    size: '14',
    price: 185000,
    unit: 'kg',
    weight: 1.21,
    description: 'میلگرد آجدار سایز 14 برند اصفهان - استاندارد ASTM',
    inStock: true,
    lastUpdated: '2025-09-15',
  },
  {
    id: 'rebar-16-isfahan',
    name: 'میلگرد آجدار 16',
    category: PRODUCT_CATEGORIES[0],
    subcategory: 'آجدار',
    brand: 'اصفهان',
    size: '16',
    price: 186000,
    unit: 'kg',
    weight: 1.58,
    description: 'میلگرد آجدار سایز 16 برند اصفهان - مناسب برای سازه‌های بتنی',
    inStock: true,
    lastUpdated: '2025-09-15',
  },
  {
    id: 'rebar-18-isfahan',
    name: 'میلگرد آجدار 18',
    category: PRODUCT_CATEGORIES[0],
    subcategory: 'آجدار',
    brand: 'اصفهان',
    size: '18',
    price: 187000,
    unit: 'kg',
    weight: 2.0,
    description: 'میلگرد آجدار سایز 18 برند اصفهان - کیفیت فوق‌العاده',
    inStock: true,
    lastUpdated: '2025-09-15',
  },
  {
    id: 'rebar-20-isfahan',
    name: 'میلگرد آجدار 20',
    category: PRODUCT_CATEGORIES[0],
    subcategory: 'آجدار',
    brand: 'اصفهان',
    size: '20',
    price: 188000,
    unit: 'kg',
    weight: 2.47,
    description: 'میلگرد آجدار سایز 20 برند اصفهان - مقاومت بالا',
    inStock: true,
    lastUpdated: '2025-09-15',
  },
  {
    id: 'rebar-22-isfahan',
    name: 'میلگرد آجدار 22',
    category: PRODUCT_CATEGORIES[0],
    subcategory: 'آجدار',
    brand: 'اصفهان',
    size: '22',
    price: 189000,
    unit: 'kg',
    weight: 2.98,
    description: 'میلگرد آجدار سایز 22 برند اصفهان - برای پروژه‌های بزرگ',
    inStock: true,
    lastUpdated: '2025-09-15',
  },
  {
    id: 'rebar-25-isfahan',
    name: 'میلگرد آجدار 25',
    category: PRODUCT_CATEGORIES[0],
    subcategory: 'آجدار',
    brand: 'اصفهان',
    size: '25',
    price: 190000,
    unit: 'kg',
    weight: 3.85,
    description: 'میلگرد آجدار سایز 25 برند اصفهان - سنگین‌ترین سایز',
    inStock: true,
    lastUpdated: '2025-09-15',
  },

  // میلگرد نیشابور
  {
    id: 'rebar-12-nishabur',
    name: 'میلگرد آجدار 12',
    category: PRODUCT_CATEGORIES[0],
    subcategory: 'آجدار',
    brand: 'نیشابور',
    size: '12',
    price: 183500,
    unit: 'kg',
    weight: 0.888,
    description: 'میلگرد آجدار سایز 12 برند نیشابور - کیفیت ممتاز',
    inStock: true,
    lastUpdated: '2025-09-15',
  },
  {
    id: 'rebar-14-nishabur',
    name: 'میلگرد آجدار 14',
    category: PRODUCT_CATEGORIES[0],
    subcategory: 'آجدار',
    brand: 'نیشابور',
    size: '14',
    price: 184500,
    unit: 'kg',
    weight: 1.21,
    description: 'میلگرد آجدار سایز 14 برند نیشابور - مقاومت عالی',
    inStock: true,
    lastUpdated: '2025-09-15',
  },
  {
    id: 'rebar-16-nishabur',
    name: 'میلگرد آجدار 16',
    category: PRODUCT_CATEGORIES[0],
    subcategory: 'آجدار',
    brand: 'نیشابور',
    size: '16',
    price: 185500,
    unit: 'kg',
    weight: 1.58,
    description: 'میلگرد آجدار سایز 16 برند نیشابور - استاندارد بین‌المللی',
    inStock: true,
    lastUpdated: '2025-09-15',
  },
  {
    id: 'rebar-18-nishabur',
    name: 'میلگرد آجدار 18',
    category: PRODUCT_CATEGORIES[0],
    subcategory: 'آجدار',
    brand: 'نیشابور',
    size: '18',
    price: 186500,
    unit: 'kg',
    weight: 2.0,
    description: 'میلگرد آجدار سایز 18 برند نیشابور - برای سازه‌های مقاوم',
    inStock: true,
    lastUpdated: '2025-09-15',
  },
  {
    id: 'rebar-20-nishabur',
    name: 'میلگرد آجدار 20',
    category: PRODUCT_CATEGORIES[0],
    subcategory: 'آجدار',
    brand: 'نیشابور',
    size: '20',
    price: 187500,
    unit: 'kg',
    weight: 2.47,
    description: 'میلگرد آجدار سایز 20 برند نیشابور - کیفیت برتر',
    inStock: true,
    lastUpdated: '2025-09-15',
  },

  // میلگرد ساده
  {
    id: 'rebar-simple-8-isfahan',
    name: 'میلگرد ساده 8',
    category: PRODUCT_CATEGORIES[0],
    subcategory: 'ساده',
    brand: 'اصفهان',
    size: '8',
    price: 178000,
    unit: 'kg',
    weight: 0.395,
    description: 'میلگرد ساده سایز 8 برند اصفهان - مناسب برای کاربردهای عمومی',
    inStock: true,
    lastUpdated: '2025-09-15',
    grade: 'A2',
    length: '12',
  },
  {
    id: 'rebar-simple-10-isfahan',
    name: 'میلگرد ساده 10',
    category: PRODUCT_CATEGORIES[0],
    subcategory: 'ساده',
    brand: 'اصفهان',
    size: '10',
    price: 179000,
    unit: 'kg',
    weight: 0.617,
    description: 'میلگرد ساده سایز 10 برند اصفهان - اقتصادی و با کیفیت',
    inStock: true,
    lastUpdated: '2025-09-15',
    grade: 'A2',
    length: '6',
  },
  {
    id: 'rebar-simple-12-isfahan',
    name: 'میلگرد ساده 12',
    category: PRODUCT_CATEGORIES[0],
    subcategory: 'ساده',
    brand: 'اصفهان',
    size: '12',
    price: 180000,
    unit: 'kg',
    weight: 0.888,
    description: 'میلگرد ساده سایز 12 برند اصفهان - مناسب برای آرماتوربندی',
    inStock: true,
    lastUpdated: '2025-09-15',
  },

  // تیرآهن
  {
    id: 'beam-10-fayko',
    name: 'تیرآهن 10',
    category: PRODUCT_CATEGORIES[4],
    subcategory: 'تیرآهن',
    brand: 'فایکو',
    size: '10',
    price: 192000,
    unit: 'kg',
    weight: 8.0,
    description: 'تیرآهن سایز 10 برند فایکو - مناسب برای سازه‌های سبک',
    inStock: true,
    lastUpdated: '2025-09-15',
  },
  {
    id: 'beam-12-fayko',
    name: 'تیرآهن 12',
    category: PRODUCT_CATEGORIES[4],
    subcategory: 'تیرآهن',
    brand: 'فایکو',
    size: '12',
    price: 193000,
    unit: 'kg',
    weight: 11.5,
    description: 'تیرآهن سایز 12 برند فایکو - کیفیت استاندارد اروپا',
    inStock: true,
    lastUpdated: '2025-09-15',
  },
  {
    id: 'beam-14-fayko',
    name: 'تیرآهن 14',
    category: PRODUCT_CATEGORIES[4],
    subcategory: 'تیرآهن',
    brand: 'فایکو',
    size: '14',
    price: 194000,
    unit: 'kg',
    weight: 15.6,
    description: 'تیرآهن سایز 14 برند فایکو - مقاومت بالا در برابر خمش',
    inStock: true,
    lastUpdated: '2025-09-15',
  },
  {
    id: 'beam-16-fayko',
    name: 'تیرآهن 16',
    category: PRODUCT_CATEGORIES[4],
    subcategory: 'تیرآهن',
    brand: 'فایکو',
    size: '16',
    price: 195000,
    unit: 'kg',
    weight: 20.4,
    description: 'تیرآهن سایز 16 برند فایکو - برای ساختمان‌های متوسط',
    inStock: true,
    lastUpdated: '2025-09-15',
  },
  {
    id: 'beam-18-fayko',
    name: 'تیرآهن 18',
    category: PRODUCT_CATEGORIES[4],
    subcategory: 'تیرآهن',
    brand: 'فایکو',
    size: '18',
    price: 196000,
    unit: 'kg',
    weight: 25.7,
    description: 'تیرآهن سایز 18 برند فایکو - مناسب برای پل‌ها و سازه‌های بزرگ',
    inStock: true,
    lastUpdated: '2025-09-15',
  },
  {
    id: 'beam-20-fayko',
    name: 'تیرآهن 20',
    category: PRODUCT_CATEGORIES[4],
    subcategory: 'تیرآهن',
    brand: 'فایکو',
    size: '20',
    price: 197000,
    unit: 'kg',
    weight: 31.4,
    description: 'تیرآهن سایز 20 برند فایکو - قدرت تحمل فوق‌العاده',
    inStock: true,
    lastUpdated: '2025-09-15',
  },

  // ورق
  {
    id: 'sheet-1mm-black',
    name: 'ورق سیاه 1 میلیمتر',
    category: PRODUCT_CATEGORIES[2],
    subcategory: 'سیاه',
    brand: 'فولاد ثامن',
    size: '1mm',
    price: 205000,
    unit: 'kg',
    description: 'ورق سیاه ضخامت 1 میلیمتر - مناسب برای کاربردهای صنعتی',
    inStock: true,
    lastUpdated: '2025-09-15',
  },
  {
    id: 'sheet-2mm-black',
    name: 'ورق سیاه 2 میلیمتر',
    category: PRODUCT_CATEGORIES[2],
    subcategory: 'سیاه',
    brand: 'فولاد ثامن',
    size: '2mm',
    price: 210000,
    unit: 'kg',
    description: 'ورق سیاه ضخامت 2 میلیمتر - کیفیت بالا و قیمت مناسب',
    inStock: true,
    lastUpdated: '2025-09-15',
  },
  {
    id: 'sheet-3mm-galvanized',
    name: 'ورق گالوانیزه 3 میلیمتر',
    category: PRODUCT_CATEGORIES[2],
    subcategory: 'گالوانیزه',
    brand: 'فولاد ثامن',
    size: '3mm',
    price: 220000,
    unit: 'kg',
    description: 'ورق گالوانیزه ضخامت 3 میلیمتر - مقاوم در برابر زنگ',
    inStock: true,
    lastUpdated: '2025-09-15',
  },
  {
    id: 'sheet-4mm-galvanized',
    name: 'ورق گالوانیزه 4 میلیمتر',
    category: PRODUCT_CATEGORIES[2],
    subcategory: 'گالوانیزه',
    brand: 'فولاد ثامن',
    size: '4mm',
    price: 225000,
    unit: 'kg',
    description: 'ورق گالوانیزه ضخامت 4 میلیمتر - عمر مفید طولانی',
    inStock: true,
    lastUpdated: '2025-09-15',
  },

  // نبشی
  {
    id: 'angle-30x30x3',
    name: 'نبشی 30×30×3',
    category: PRODUCT_CATEGORIES[3],
    subcategory: 'نبشی',
    brand: 'اصفهان',
    size: '30×30×3',
    price: 198000,
    unit: 'kg',
    weight: 1.39,
    description: 'نبشی سایز 30×30×3 برند اصفهان - مناسب برای قاب‌سازی',
    inStock: true,
    lastUpdated: '2025-09-15',
  },
  {
    id: 'angle-40x40x4',
    name: 'نبشی 40×40×4',
    category: PRODUCT_CATEGORIES[3],
    subcategory: 'نبشی',
    brand: 'اصفهان',
    size: '40×40×4',
    price: 199000,
    unit: 'kg',
    weight: 2.42,
    description: 'نبشی سایز 40×40×4 برند اصفهان - استحکام بالا',
    inStock: true,
    lastUpdated: '2025-09-15',
  },
  {
    id: 'angle-50x50x5',
    name: 'نبشی 50×50×5',
    category: PRODUCT_CATEGORIES[3],
    subcategory: 'نبشی',
    brand: 'اصفهان',
    size: '50×50×5',
    price: 200000,
    unit: 'kg',
    weight: 3.77,
    description: 'نبشی سایز 50×50×5 برند اصفهان - برای سازه‌های سنگین',
    inStock: true,
    lastUpdated: '2025-09-15',
  },

  // پروفیل
  {
    id: 'profile-upe-80',
    name: 'پروفیل UPE 80',
    category: PRODUCT_CATEGORIES[1],
    subcategory: 'ساختمانی',
    brand: 'فایکو',
    size: 'UPE 80',
    price: 201000,
    unit: 'kg',
    weight: 6.0,
    description: 'پروفیل UPE سایز 80 برند فایکو - مناسب برای ستون‌سازی',
    inStock: true,
    lastUpdated: '2025-09-15',
  },
  {
    id: 'profile-upe-100',
    name: 'پروفیل UPE 100',
    category: PRODUCT_CATEGORIES[1],
    subcategory: 'ساختمانی',
    brand: 'فایکو',
    size: 'UPE 100',
    price: 202000,
    unit: 'kg',
    weight: 8.5,
    description: 'پروفیل UPE سایز 100 برند فایکو - کیفیت صنعتی',
    inStock: true,
    lastUpdated: '2025-09-15',
  },

  // لوله
  {
    id: 'pipe-1-inch',
    name: 'لوله گالوانیزه 1 اینچ',
    category: PRODUCT_CATEGORIES[5],
    subcategory: 'گالوانیزه',
    brand: 'اهواز',
    size: '1 اینچ',
    price: 215000,
    unit: 'kg',
    description:
      'لوله گالوانیزه سایز 1 اینچ برند اهواز - مقاوم در برابر خورندگی',
    inStock: true,
    lastUpdated: '2025-09-15',
  },
  {
    id: 'pipe-2-inch',
    name: 'لوله گالوانیزه 2 اینچ',
    category: PRODUCT_CATEGORIES[5],
    subcategory: 'گالوانیزه',
    brand: 'اهواز',
    size: '2 اینچ',
    price: 218000,
    unit: 'kg',
    description: 'لوله گالوانیزه سایز 2 اینچ برند اهواز - برای تاسیسات ساختمان',
    inStock: true,
    lastUpdated: '2025-09-15',
  },

  // شمش
  {
    id: 'shamsh-folad-150kg',
    name: 'شمش فولاد 150 کیلوگرم',
    category: PRODUCT_CATEGORIES[8],
    subcategory: 'فولاد',
    brand: 'اصفهان',
    size: '150kg',
    price: 165000,
    unit: 'kg',
    description: 'شمش فولاد درجه یک - مناسب برای تولید ورق و پروفیل',
    inStock: true,
    lastUpdated: '2025-09-30',
  },
  {
    id: 'shamsh-aliaazhi-100kg',
    name: 'شمش آلیاژی 100 کیلوگرم',
    category: PRODUCT_CATEGORIES[8],
    subcategory: 'آلیاژی',
    brand: 'فولاد ثامن',
    size: '100kg',
    price: 285000,
    unit: 'kg',
    description: 'شمش آلیاژی ضد زنگ - کیفیت صادراتی',
    inStock: true,
    lastUpdated: '2025-09-30',
  },

  // قوطی
  {
    id: 'qooti-sanate-40x40x3',
    name: 'قوطی صنعتی 40×40×3',
    category: PRODUCT_CATEGORIES[9],
    subcategory: 'صنعتی',
    brand: 'فایکو',
    size: '40×40×3',
    price: 192000,
    unit: 'kg',
    weight: 4.47,
    description: 'قوطی صنعتی مربع - مناسب برای سازه های فلزی',
    inStock: true,
    lastUpdated: '2025-09-30',
  },
  {
    id: 'qooti-sotoni-100x100x5',
    name: 'قوطی ستونی 100×100×5',
    category: PRODUCT_CATEGORIES[9],
    subcategory: 'ستونی',
    brand: 'اصفهان',
    size: '100×100×5',
    price: 198000,
    unit: 'kg',
    weight: 15.04,
    description: 'قوطی ستونی مقاوم - برای ستون سازی ساختمان',
    inStock: true,
    lastUpdated: '2025-09-30',
  },

  // محصولات مفتولی
  {
    id: 'sim-maftooli-siah-3mm',
    name: 'سیم مفتولی سیاه 3 میلیمتر',
    category: PRODUCT_CATEGORIES[10],
    subcategory: 'سیم مفتولی سیاه',
    brand: 'اصفهان',
    size: '3mm',
    price: 168000,
    unit: 'kg',
    description: 'سیم مفتولی سیاه کیفیت عالی - بسته بندی حلقه ای',
    inStock: true,
    lastUpdated: '2025-09-30',
  },
  {
    id: 'sim-maftooli-galvanize-4mm',
    name: 'سیم مفتولی گالوانیزه 4 میلیمتر',
    category: PRODUCT_CATEGORIES[10],
    subcategory: 'سیم مفتولی گالوانیزه',
    brand: 'نیشابور',
    size: '4mm',
    price: 185000,
    unit: 'kg',
    description: 'سیم مفتولی گالوانیزه - مقاوم در برابر خوردگی',
    inStock: true,
    lastUpdated: '2025-09-30',
  },
  {
    id: 'toori-hesari-50x50',
    name: 'توری حصاری 50×50',
    category: PRODUCT_CATEGORIES[10],
    subcategory: 'توری حصاری',
    brand: 'میانه',
    size: '50×50',
    price: 175000,
    unit: 'kg',
    description: 'توری حصاری گالوانیزه - ارتفاع 2 متر',
    inStock: true,
    lastUpdated: '2025-09-30',
  },
  {
    id: 'mesh-ajdar-150x150x8',
    name: 'مش آجدار 150×150×8',
    category: PRODUCT_CATEGORIES[10],
    subcategory: 'مش آجدار',
    brand: 'اصفهان',
    size: '150×150×8',
    price: 172000,
    unit: 'kg',
    weight: 35,
    description: 'مش آجدار تسلیح بتن - ابعاد ورق 2.15×5 متر',
    inStock: true,
    lastUpdated: '2025-09-30',
  },

  // مواد اولیه
  {
    id: 'ahan-esfonji-grade-a',
    name: 'آهن اسفنجی درجه A',
    category: PRODUCT_CATEGORIES[11],
    subcategory: 'آهن اسفنجی',
    brand: 'فولاد ثامن',
    size: 'Grade A',
    price: 145000,
    unit: 'kg',
    description: 'آهن اسفنجی درجه یک - درجه فلزی 92 درصد',
    inStock: true,
    lastUpdated: '2025-09-30',
  },
  {
    id: 'foro-aliazh-ferromangan',
    name: 'فروآلیاژ فرومنگنز',
    category: PRODUCT_CATEGORIES[11],
    subcategory: 'فروآلیاژ',
    brand: 'زاگرس',
    size: 'FeMn 75%',
    price: 385000,
    unit: 'kg',
    description: 'فروآلیاژ فرومنگنز - خلوص 75 درصد منگنز',
    inStock: true,
    lastUpdated: '2025-09-30',
  },
];
