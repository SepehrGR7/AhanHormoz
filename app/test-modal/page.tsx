import OrderRequestModal from '@/components/order-request-modal';

export default function TestOrderModal() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">آزمایش Modal ثبت سفارش</h1>

      <OrderRequestModal
        isOpen={true}
        onClose={() => {}}
        productName="میلگرد آجدار A3"
        productSpecs="میلگرد آجدار A3 قطر 12 میلی‌متر - فولاد مبارکه"
      />
    </div>
  );
}
