'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  X,
  Phone,
  User,
  Building2,
  MapPin,
  Calendar,
  Package,
  Truck,
  CheckCircle,
  AlertCircle,
  Send,
  MessageSquare,
  Info,
  FileText,
  Weight,
} from 'lucide-react';

interface OrderRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  productSpecs?: string;
}

interface OrderFormData {
  customerName: string;
  companyName: string;
  phoneNumber: string;
  city: string;
  productSpecs: string;
  quantity: string;
  deliveryDate: string;
  deliveryMethod: 'pickup' | 'delivery';
  additionalNotes: string;
}

export default function OrderRequestModal({
  isOpen,
  onClose,
  productName = '',
  productSpecs = '',
}: OrderRequestModalProps) {
  const [formData, setFormData] = useState<OrderFormData>({
    customerName: '',
    companyName: '',
    phoneNumber: '',
    city: '',
    productSpecs: productSpecs,
    quantity: '',
    deliveryDate: '',
    deliveryMethod: 'pickup',
    additionalNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: keyof OrderFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.customerName.trim() ||
      !formData.phoneNumber.trim() ||
      !formData.city.trim() ||
      !formData.productSpecs.trim() ||
      !formData.quantity.trim()
    ) {
      alert('لطفاً تمام فیلدهای ضروری را پر کنید.');
      return;
    }

    setIsSubmitting(true);

    // شبیه‌سازی ارسال درخواست
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // بازگشت به حالت اولیه بعد از 3 ثانیه
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setFormData({
        customerName: '',
        companyName: '',
        phoneNumber: '',
        city: '',
        productSpecs: '',
        quantity: '',
        deliveryDate: '',
        deliveryMethod: 'pickup',
        additionalNotes: '',
      });
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl animate-slide-in-from-bottom">
        <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 relative sticky top-0 z-10">
          <button
            onClick={onClose}
            className="absolute left-4 top-4 p-2 hover:bg-white/50 rounded-full transition-colors group"
          >
            <X className="h-5 w-5 text-gray-600 group-hover:text-gray-800" />
          </button>

          <div className="text-center pt-2">
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
              <Package className="h-6 w-6 text-blue-600" />
              درخواست سفارش
            </CardTitle>
            {productName && (
              <Badge
                variant="outline"
                className="mt-2 bg-blue-100 text-blue-800 border-blue-200"
              >
                {productName}
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                درخواست شما ثبت شد
              </h3>
              <p className="text-gray-600">
                درخواست سفارش شما با موفقیت ثبت گردید. کارشناسان ما در اسرع وقت
                با شما تماس خواهند گرفت.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">
                  شماره پیگیری: #
                  {Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* اطلاعات مشتری */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <User className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-800">اطلاعات مشتری</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="customerName"
                      className="text-sm font-medium text-gray-700"
                    >
                      نام و نام خانوادگی *
                    </Label>
                    <Input
                      id="customerName"
                      type="text"
                      value={formData.customerName}
                      onChange={(e) =>
                        handleInputChange('customerName', e.target.value)
                      }
                      className="w-full"
                      placeholder="نام کامل خود را وارد کنید"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="phoneNumber"
                      className="text-sm font-medium text-gray-700"
                    >
                      شماره تماس *
                    </Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        handleInputChange('phoneNumber', e.target.value)
                      }
                      className="w-full"
                      placeholder="09xxxxxxxxx"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="companyName"
                      className="text-sm font-medium text-gray-700"
                    >
                      نام شرکت
                    </Label>
                    <Input
                      id="companyName"
                      type="text"
                      value={formData.companyName}
                      onChange={(e) =>
                        handleInputChange('companyName', e.target.value)
                      }
                      className="w-full"
                      placeholder="نام شرکت (اختیاری)"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="city"
                      className="text-sm font-medium text-gray-700"
                    >
                      شهر *
                    </Label>
                    <Input
                      id="city"
                      type="text"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange('city', e.target.value)
                      }
                      className="w-full"
                      placeholder="شهر محل سکونت"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* مشخصات محصول */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <Package className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-800">مشخصات سفارش</h3>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="productSpecs"
                    className="text-sm font-medium text-gray-700"
                  >
                    مشخصات محصول *
                  </Label>
                  <Input
                    id="productSpecs"
                    type="text"
                    value={formData.productSpecs}
                    onChange={(e) =>
                      handleInputChange('productSpecs', e.target.value)
                    }
                    className="w-full"
                    placeholder="مثال: میلگرد آجدار A3 قطر 12 میلی‌متر"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="quantity"
                      className="text-sm font-medium text-gray-700"
                    >
                      مقدار مورد نیاز *
                    </Label>
                    <Input
                      id="quantity"
                      type="text"
                      value={formData.quantity}
                      onChange={(e) =>
                        handleInputChange('quantity', e.target.value)
                      }
                      className="w-full"
                      placeholder="مثال: 5 تن"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="deliveryDate"
                      className="text-sm font-medium text-gray-700"
                    >
                      تاریخ تحویل مورد نظر
                    </Label>
                    <Input
                      id="deliveryDate"
                      type="date"
                      value={formData.deliveryDate}
                      onChange={(e) =>
                        handleInputChange('deliveryDate', e.target.value)
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* نحوه تحویل */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <Truck className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-800">نحوه تحویل</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center space-x-3 space-x-reverse cursor-pointer">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="pickup"
                      checked={formData.deliveryMethod === 'pickup'}
                      onChange={(e) =>
                        handleInputChange('deliveryMethod', e.target.value)
                      }
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">
                        تحویل در محل کارخانه
                      </span>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 space-x-reverse cursor-pointer">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="delivery"
                      checked={formData.deliveryMethod === 'delivery'}
                      onChange={(e) =>
                        handleInputChange('deliveryMethod', e.target.value)
                      }
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">
                        ارسال با باربری
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* توضیحات اضافی */}
              <div className="space-y-2">
                <Label
                  htmlFor="additionalNotes"
                  className="text-sm font-medium text-gray-700"
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                    توضیحات اضافی
                  </div>
                </Label>
                <textarea
                  id="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={(e) =>
                    handleInputChange('additionalNotes', e.target.value)
                  }
                  className="w-full min-h-[80px] p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="توضیحات اضافی در مورد سفارش خود (اختیاری)"
                />
              </div>

              {/* اطلاعیه */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">نکات مهم:</p>
                    <ul className="space-y-1 text-blue-700">
                      <li>
                        • کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت
                      </li>
                      <li>• قیمت نهایی پس از بررسی اعلام خواهد شد</li>
                      <li>• امکان بازدید از کالا قبل از تحویل وجود دارد</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* دکمه‌های عملیات */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  انصراف
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      در حال ثبت...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      ثبت درخواست سفارش
                    </div>
                  )}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
