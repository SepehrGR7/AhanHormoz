'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import OrderRequestModal from '@/components/order-request-modal';
import { Package, Plus } from 'lucide-react';

export default function FloatingOrderButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40 group">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-200 group-hover:scale-105 animate-pulse-green"
          size="lg"
        >
          <div className="relative">
            <Package className="h-6 w-6 group-hover:scale-110 transition-transform" />
            <Plus className="h-3 w-3 absolute -top-1 -right-1 bg-white text-green-600 rounded-full" />
          </div>
        </Button>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          ثبت سفارش سریع
        </div>
      </div>

      {/* Order Modal */}
      <OrderRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName=""
        productSpecs=""
      />
    </>
  );
}
