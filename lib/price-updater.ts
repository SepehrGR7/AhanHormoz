import { prisma } from './prisma';

/**
 * تابع برای آپدیت قیمت محصول و ثبت تاریخچه تغییرات
 * @param productId - شناسه محصول
 * @param newPrice - قیمت جدید
 * @param notes - یادداشت اختیاری
 * @returns نتیجه عملیات
 */
export async function updateProductPrice(
  productId: string,
  newPrice: number,
  notes?: string
) {
  try {
    // دریافت اطلاعات فعلی محصول
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error('محصول یافت نشد');
    }

    const oldPrice = product.price;

    // محاسبه تغییرات
    const changeAmount = Math.abs(newPrice - oldPrice);
    let changeType = 'ثابت';

    if (newPrice > oldPrice) {
      changeType = 'افزایش';
    } else if (newPrice < oldPrice) {
      changeType = 'کاهش';
    }

    // ثبت در تاریخچه تغییرات قیمت
    await prisma.priceHistory.create({
      data: {
        productId,
        oldPrice,
        newPrice,
        changeType,
        changeAmount,
        notes,
        changedAt: new Date(),
      },
    });

    // آپدیت اطلاعات محصول
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        price: newPrice,
        previousPrice: oldPrice,
        changeType:
          changeType === 'ثابت'
            ? 'stable'
            : changeType === 'افزایش'
              ? 'increase'
              : 'decrease',
        changeAmount,
        lastPriceChange:
          changeType !== 'ثابت' ? new Date() : product.lastPriceChange,
      },
    });

    return {
      success: true,
      product: updatedProduct,
      change: {
        oldPrice,
        newPrice,
        changeType,
        changeAmount,
      },
    };
  } catch (error) {
    console.error('Error updating product price:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'خطا در بروزرسانی قیمت',
    };
  }
}

/**
 * تابع برای آپدیت دسته‌ای قیمت محصولات
 * @param updates - آرایه‌ای از آپدیت‌ها شامل productId و newPrice
 * @returns نتیجه عملیات
 */
export async function bulkUpdateProductPrices(
  updates: Array<{ productId: string; newPrice: number; notes?: string }>
) {
  const results = {
    success: 0,
    failed: 0,
    errors: [] as string[],
  };

  for (const update of updates) {
    const result = await updateProductPrice(
      update.productId,
      update.newPrice,
      update.notes
    );

    if (result.success) {
      results.success++;
    } else {
      results.failed++;
      results.errors.push(`محصول ${update.productId}: ${result.error}`);
    }
  }

  return results;
}
