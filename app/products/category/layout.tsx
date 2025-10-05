import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'دسته‌بندی محصولات | آهن هرمز',
  description:
    'مشاهده محصولات آهن هرمز بر اساس دسته‌بندی - میلگرد، پروفیل، ورق، لوله و سایر محصولات فولادی',
};

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
