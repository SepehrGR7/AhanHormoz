import { Card, CardBody, CardHeader } from '@heroui/card';
import { Spinner } from '@heroui/spinner';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Spinner size="lg" color="primary" className="mb-4" />
          <h2 className="text-xl font-semibold mb-2">
            در حال بارگذاری محصول...
          </h2>
          <p className="text-default-600">
            لطفاً صبر کنید تا اطلاعات محصول بارگذاری شود
          </p>
        </div>
      </div>
    </div>
  );
}
