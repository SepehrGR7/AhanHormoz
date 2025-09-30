import { Button } from '@heroui/button';
import { Card, CardBody } from '@heroui/card';
import NextLink from 'next/link';
import { ArrowRight, Home, Package } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardBody className="text-center p-8">
          <div className="mb-6">
            <Package className="w-16 h-16 mx-auto text-default-400 mb-4" />
            <h1 className="text-2xl font-bold mb-2">محصول یافت نشد</h1>
            <p className="text-default-600">
              متأسفانه محصول مورد نظر شما در سیستم موجود نیست.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              as={NextLink}
              href="/products"
              color="primary"
              startContent={<Package className="w-4 h-4" />}
              className="flex-1"
            >
              مشاهده محصولات
            </Button>

            <Button
              as={NextLink}
              href="/"
              variant="bordered"
              startContent={<Home className="w-4 h-4" />}
              className="flex-1"
            >
              صفحه اصلی
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
