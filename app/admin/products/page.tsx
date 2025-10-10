'use client';

import { useState, useMemo, useRef } from 'react';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Card, CardBody, CardHeader } from '@heroui/card';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@heroui/table';
import { Checkbox } from '@heroui/checkbox';
import { Chip } from '@heroui/chip';
import { Select, SelectItem } from '@heroui/select';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@heroui/modal';
import { addToast } from '@heroui/toast';
import {
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  Download,
  Upload,
  DollarSign,
  Eye,
  EyeOff,
  Filter,
  RefreshCw,
  Layers,
} from 'lucide-react';
import { useProducts, useCategories } from '@/hooks/useApi';
import * as XLSX from 'xlsx';
import { PRODUCT_CATEGORIES } from '@/types/products';

interface Product {
  id: string;
  name: string;
  brand: string;
  size: string;
  price: number;
  inStock: boolean;
  category: {
    name: string;
  };
  subcategory: string;
  createdAt: string;
}

interface BulkUpdateData {
  price?: number;
  inStock?: boolean;
  categoryId?: string;
}

interface EditProductData {
  name: string;
  brand: string;
  size: string;
  price: number;
  inStock: boolean;
  categoryId: string;
  subcategory: string;
}

export default function AdminProducts() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [stockFilter, setStockFilter] = useState('');
  const [bulkUpdateData, setBulkUpdateData] = useState<BulkUpdateData>({});
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editProductData, setEditProductData] = useState<EditProductData>({
    name: '',
    brand: '',
    size: '',
    price: 0,
    inStock: true,
    categoryId: '',
    subcategory: '',
  });
  const [newProductData, setNewProductData] = useState<EditProductData>({
    name: '',
    brand: '',
    size: '',
    price: 0,
    inStock: true,
    categoryId: '',
    subcategory: '',
  });
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: 'createdAt' as any,
    direction: 'descending' as 'ascending' | 'descending',
  });

  // Inline price editing
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<string>('');

  const formatPersianDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const {
    isOpen: isBulkModalOpen,
    onOpen: onBulkModalOpen,
    onOpenChange: onBulkModalOpenChange,
  } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalOpenChange,
  } = useDisclosure();
  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onOpenChange: onEditModalOpenChange,
  } = useDisclosure();
  const {
    isOpen: isDeleteSingleModalOpen,
    onOpen: onDeleteSingleModalOpen,
    onOpenChange: onDeleteSingleModalOpenChange,
  } = useDisclosure();
  const {
    isOpen: isAddModalOpen,
    onOpen: onAddModalOpen,
    onOpenChange: onAddModalOpenChange,
  } = useDisclosure();

  const {
    products,
    isLoading,
    mutate: mutateProducts,
  } = useProducts({
    search: searchTerm,
    category: categoryFilter,
    inStock:
      stockFilter === 'true'
        ? true
        : stockFilter === 'false'
          ? false
          : undefined,
  });

  const { categories } = useCategories();

  const sortedProducts = useMemo(() => {
    if (!products) return [];

    return [...products].sort((a, b) => {
      let aValue: any;
      let bValue: any;
      const column = String(sortDescriptor.column);

      switch (column) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'brand':
          aValue = a.brand.toLowerCase();
          bValue = b.brand.toLowerCase();
          break;
        case 'size':
          aValue = a.size?.toLowerCase() || '';
          bValue = b.size?.toLowerCase() || '';
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'inStock':
          aValue = a.inStock;
          bValue = b.inStock;
          break;
        case 'category':
          aValue = a.category.name.toLowerCase();
          bValue = b.category.name.toLowerCase();
          break;
        case 'subcategory':
          aValue = a.subcategory?.toLowerCase() || '';
          bValue = b.subcategory?.toLowerCase() || '';
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        default:
          return 0;
      }

      if (aValue < bValue) {
        return sortDescriptor.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDescriptor.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [products, sortDescriptor]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(sortedProducts.map((p: Product) => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    }
  };

  const handleBulkUpdate = async () => {
    if (selectedProducts.length === 0) return;

    try {
      const response = await fetch('/api/products/bulk', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productIds: selectedProducts,
          updateData: bulkUpdateData,
        }),
      });

      if (response.ok) {
        mutateProducts();
        const count = selectedProducts.length;
        setSelectedProducts([]);
        setBulkUpdateData({});
        onBulkModalOpenChange();
        addToast({
          title: 'موفقیت',
          description: `${count} محصول با موفقیت بروزرسانی شدند`,
          color: 'success',
        });
      } else {
        const error = await response.json();
        addToast({
          title: 'خطا',
          description: error.error || 'خطا در بروزرسانی محصولات',
          color: 'danger',
        });
      }
    } catch (error) {
      console.error('Bulk update failed:', error);
      addToast({
        title: 'خطا',
        description: 'خطا در ارتباط با سرور',
        color: 'danger',
      });
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProducts.length === 0) return;

    try {
      const response = await fetch('/api/products/bulk', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productIds: selectedProducts,
        }),
      });

      if (response.ok) {
        mutateProducts();
        const count = selectedProducts.length;
        setSelectedProducts([]);
        onDeleteModalOpenChange();
        addToast({
          title: 'موفقیت',
          description: `${count} محصول با موفقیت حذف شدند`,
          color: 'success',
        });
      } else {
        const error = await response.json();
        addToast({
          title: 'خطا',
          description: error.error || 'خطا در حذف محصولات',
          color: 'danger',
        });
      }
    } catch (error) {
      console.error('Bulk delete failed:', error);
      addToast({
        title: 'خطا',
        description: 'خطا در ارتباط با سرور',
        color: 'danger',
      });
    }
  };

  // Individual product handlers
  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setEditProductData({
      name: product.name,
      brand: product.brand,
      size: product.size || '',
      price: product.price,
      inStock: product.inStock,
      categoryId: product.category?.id || '',
      subcategory: product.subcategory || '',
    });
    onEditModalOpen();
  };

  const handleSaveEdit = async () => {
    if (!editingProduct) return;

    // Validate required fields
    if (
      !editProductData.name ||
      !editProductData.brand ||
      !editProductData.categoryId ||
      !editProductData.subcategory
    ) {
      addToast({
        title: 'خطا',
        description: 'لطفاً تمام فیلدهای اجباری را پر کنید',
        color: 'warning',
      });
      return;
    }

    try {
      const response = await fetch(`/api/products/${editingProduct.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editProductData),
      });

      if (response.ok) {
        mutateProducts();
        setEditingProduct(null);
        onEditModalOpenChange();
        addToast({
          title: 'موفقیت',
          description: 'محصول با موفقیت بروزرسانی شد',
          color: 'success',
        });
      } else {
        const error = await response.json();
        addToast({
          title: 'خطا',
          description: error.error || 'خطا در بروزرسانی محصول',
          color: 'danger',
        });
      }
    } catch (error) {
      console.error('Edit product failed:', error);
      addToast({
        title: 'خطا',
        description: 'خطا در ارتباط با سرور',
        color: 'danger',
      });
    }
  };

  const handleDeleteProduct = (product: Product) => {
    setProductToDelete(product);
    onDeleteSingleModalOpen();
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    try {
      const response = await fetch(`/api/products/${productToDelete.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        mutateProducts();
        setProductToDelete(null);
        onDeleteSingleModalOpenChange();
        addToast({
          title: 'موفقیت',
          description: 'محصول با موفقیت حذف شد',
          color: 'success',
        });
      } else {
        const error = await response.json();
        addToast({
          title: 'خطا',
          description: error.error || 'خطا در حذف محصول',
          color: 'danger',
        });
      }
    } catch (error) {
      console.error('Delete product failed:', error);
      addToast({
        title: 'خطا',
        description: 'خطا در ارتباط با سرور',
        color: 'danger',
      });
    }
  };

  // Add product handlers
  const handleAddProduct = () => {
    setNewProductData({
      name: '',
      brand: '',
      size: '',
      price: 0,
      inStock: true,
      categoryId: '',
      subcategory: '',
    });
    onAddModalOpen();
  };

  const handleSaveNewProduct = async () => {
    // Validate required fields
    if (
      !newProductData.name ||
      !newProductData.brand ||
      !newProductData.categoryId ||
      !newProductData.subcategory
    ) {
      addToast({
        title: 'خطا',
        description: 'لطفاً تمام فیلدهای اجباری را پر کنید',
        color: 'warning',
      });
      return;
    }

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProductData),
      });

      const data = await response.json();

      if (response.ok) {
        mutateProducts();
        setNewProductData({
          name: '',
          brand: '',
          size: '',
          price: 0,
          inStock: true,
          categoryId: '',
          subcategory: '',
        });
        onAddModalOpenChange();
        addToast({
          title: 'موفقیت',
          description: 'محصول با موفقیت اضافه شد',
          color: 'success',
        });
      } else {
        console.error('Error response:', data);
        addToast({
          title: 'خطا',
          description: data.error || 'خطا در افزودن محصول',
          color: 'danger',
        });
        if (data.details) {
          console.error('Error details:', data.details);
        }
      }
    } catch (error) {
      console.error('Add product failed:', error);
      addToast({
        title: 'خطا',
        description: 'خطا در ارتباط با سرور',
        color: 'danger',
      });
    }
  };

  // Inline price editing handlers
  const handlePriceClick = (product: Product) => {
    setEditingPriceId(product.id);
    setTempPrice(product.price.toString());
  };

  const handlePriceBlur = async (product: Product) => {
    const newPrice = parseFloat(tempPrice);

    // If price hasn't changed or is invalid, just cancel editing
    if (isNaN(newPrice) || newPrice === product.price || newPrice <= 0) {
      setEditingPriceId(null);
      setTempPrice('');
      return;
    }

    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price: newPrice,
        }),
      });

      if (response.ok) {
        mutateProducts();
        setEditingPriceId(null);
        setTempPrice('');
        addToast({
          title: 'موفقیت',
          description: 'قیمت با موفقیت بروزرسانی شد',
          color: 'success',
        });
      } else {
        const error = await response.json();
        addToast({
          title: 'خطا',
          description: error.error || 'خطا در بروزرسانی قیمت',
          color: 'danger',
        });
        setEditingPriceId(null);
        setTempPrice('');
      }
    } catch (error) {
      console.error('Failed to update price:', error);
      addToast({
        title: 'خطا',
        description: 'خطا در ارتباط با سرور',
        color: 'danger',
      });
      setEditingPriceId(null);
      setTempPrice('');
    }
  };

  const handlePriceKeyDown = (e: React.KeyboardEvent, product: Product) => {
    if (e.key === 'Enter') {
      handlePriceBlur(product);
    } else if (e.key === 'Escape') {
      setEditingPriceId(null);
      setTempPrice('');
    }
  };

  // Inline stock status toggle
  const handleStockToggle = async (product: Product) => {
    const newStockStatus = !product.inStock;

    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inStock: newStockStatus,
        }),
      });

      if (response.ok) {
        mutateProducts();
        addToast({
          title: 'موفقیت',
          description: 'وضعیت موجودی با موفقیت بروزرسانی شد',
          color: 'success',
        });
      } else {
        const error = await response.json();
        addToast({
          title: 'خطا',
          description: error.error || 'خطا در بروزرسانی وضعیت موجودی',
          color: 'danger',
        });
      }
    } catch (error) {
      console.error('Failed to update stock status:', error);
      addToast({
        title: 'خطا',
        description: 'خطا در ارتباط با سرور',
        color: 'danger',
      });
    }
  };

  const exportProducts = () => {
    const exportData = sortedProducts.map((product: Product) => ({
      'نام محصول': product.name,
      برند: product.brand || '-',
      سایز: product.size || '-',
      'قیمت (تومان)': product.price,
      موجودی: product.inStock ? 'موجود' : 'ناموجود',
      دسته‌بندی: product.category?.name || '-',
      زیردسته: product.subcategory || '-',
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'محصولات');

    // Set column widths for better readability
    const colWidths = [
      { wch: 25 }, // Name
      { wch: 15 }, // Brand
      { wch: 15 }, // Size
      { wch: 15 }, // Price
      { wch: 12 }, // Stock
      { wch: 20 }, // Category
      { wch: 20 }, // Subcategory
    ];
    ws['!cols'] = colWidths;

    XLSX.writeFile(
      wb,
      `محصولات_${new Date().toLocaleDateString('fa-IR')}.xlsx`
    );
  };

  const downloadTemplate = () => {
    const templateData = [
      {
        'نام محصول': 'نمونه محصول',
        برند: 'نمونه برند',
        سایز: '10x20',
        'قیمت (تومان)': 1000000,
        موجودی: 'موجود',
        دسته‌بندی: 'تیرآهن',
        زیردسته: 'IPE',
      },
    ];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'محصولات');

    const colWidths = [
      { wch: 25 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 12 },
      { wch: 20 },
      { wch: 20 },
    ];
    ws['!cols'] = colWidths;

    XLSX.writeFile(wb, 'الگو_محصولات.xlsx');
  };

  // ...existing code...

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileImport = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      console.log('📊 Excel data loaded:', jsonData.length, 'rows');
      console.log(
        '📋 Available categories:',
        categories?.map((c) => c.name)
      );

      // Map imported data to products
      const importedProducts = jsonData.map((row: any, index: number) => {
        console.log(`Row ${index + 1}:`, row);

        // Find category by name (case-insensitive and trim spaces)
        const categoryName = String(row['دسته‌بندی'] || '').trim();
        const category = categories?.find(
          (cat) => cat.name.trim() === categoryName
        );

        // Support both 'قیمت (تومان)' and 'قیمت (ریال)' for backward compatibility
        const price = Number(row['قیمت (تومان)'] || row['قیمت (ریال)']) || 0;

        return {
          name: String(row['نام محصول'] || '').trim(),
          brand: String(row['برند'] || '').trim(),
          size: String(row['سایز'] || '').trim(),
          price: price,
          inStock: row['موجودی'] === 'موجود',
          categoryId: category?.id || '',
          categoryName: categoryName,
          subcategory: String(row['زیردسته'] || '').trim(),
          rowNumber: index + 2, // +2 because Excel is 1-indexed and has header
        };
      });

      // Validate and import products
      let successCount = 0;
      let errorCount = 0;
      const errors: string[] = [];

      for (const product of importedProducts) {
        // Validate required fields
        if (!product.name) {
          errorCount++;
          errors.push(`ردیف ${product.rowNumber}: نام محصول خالی است`);
          continue;
        }

        if (!product.brand) {
          errorCount++;
          errors.push(
            `ردیف ${product.rowNumber} (${product.name}): برند خالی است`
          );
          continue;
        }

        if (!product.categoryId) {
          errorCount++;
          const availableCategories =
            categories?.map((c) => c.name).join(', ') || 'هیچکدام';
          errors.push(
            `ردیف ${product.rowNumber} (${product.name}): دسته‌بندی "${product.categoryName}" یافت نشد. دسته‌های موجود: ${availableCategories}`
          );
          continue;
        }

        if (!product.subcategory) {
          errorCount++;
          errors.push(
            `ردیف ${product.rowNumber} (${product.name}): زیردسته خالی است`
          );
          continue;
        }

        // Validate subcategory
        const category = categories?.find(
          (cat) => cat.id === product.categoryId
        );

        if (category) {
          const subcategories = category.subcategories || [];
          if (!subcategories.includes(product.subcategory)) {
            errorCount++;
            const availableSubs = subcategories.join(', ') || 'هیچکدام';
            errors.push(
              `ردیف ${product.rowNumber} (${product.name}): زیردسته "${product.subcategory}" در دسته "${category.name}" موجود نیست. زیردسته‌های موجود: ${availableSubs}`
            );
            continue;
          }
        }

        if (product.price <= 0) {
          errorCount++;
          errors.push(
            `ردیف ${product.rowNumber} (${product.name}): قیمت باید بزرگتر از صفر باشد`
          );
          continue;
        }

        try {
          const response = await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: product.name,
              brand: product.brand,
              size: product.size,
              price: product.price,
              inStock: product.inStock,
              categoryId: product.categoryId,
              subcategory: product.subcategory,
            }),
          });

          if (response.ok) {
            successCount++;
            console.log(`✅ Successfully imported: ${product.name}`);
          } else {
            const errorData = await response.json();
            errorCount++;
            errors.push(
              `ردیف ${product.rowNumber} (${product.name}): ${errorData.error || 'خطای ناشناخته'}`
            );
            console.error(`❌ Failed to import: ${product.name}`, errorData);
          }
        } catch (error) {
          errorCount++;
          errors.push(
            `ردیف ${product.rowNumber} (${product.name}): خطا در ارتباط با سرور`
          );
          console.error(`❌ Network error for: ${product.name}`, error);
        }
      }

      mutateProducts();

      let message = `✅ موفق: ${successCount}\n❌ خطا: ${errorCount}`;

      if (errors.length > 0 && errors.length <= 5) {
        message += '\n\nخطاها:\n' + errors.join('\n');
      } else if (errors.length > 5) {
        message +=
          '\n\nنمونه خطاها:\n' +
          errors.slice(0, 5).join('\n') +
          `\n... و ${errors.length - 5} خطای دیگر`;
      }

      console.log('📊 Import summary:', { successCount, errorCount, errors });

      addToast({
        title: 'وارد سازی کامل شد',
        description: message,
        color: errorCount === 0 ? 'success' : 'warning',
      });
    } catch (error) {
      console.error('Import error:', error);
      addToast({
        title: 'خطا در وارد سازی',
        description: 'خطا در وارد سازی فایل. لطفاً فرمت فایل را بررسی کنید.',
        color: 'danger',
      });
    }

    // Reset file input
    if (event.target) {
      event.target.value = '';
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900 dark:text-white">
            <Package className="w-8 h-8 text-primary" />
            مدیریت محصولات
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            مشاهده، ویرایش و مدیریت تمام محصولات فروشگاه
          </p>
        </div>
        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileImport}
            className="hidden"
          />
          <Button
            startContent={<Upload className="w-4 h-4" />}
            variant="bordered"
            className="border-primary text-primary"
            onClick={handleImportClick}
          >
            وارد کردن Excel
          </Button>
          <Button
            startContent={<Download className="w-4 h-4" />}
            variant="bordered"
            onClick={exportProducts}
          >
            خروجی Excel
          </Button>
          <Button
            startContent={<Plus className="w-4 h-4" />}
            color="primary"
            onPress={handleAddProduct}
            className="font-semibold"
          >
            افزودن محصول جدید
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardBody className="flex flex-row items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                مجموع محصولات
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {sortedProducts.length}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900">
              <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </CardBody>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardBody className="flex flex-row items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                محصولات موجود
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {sortedProducts.filter((p: Product) => p.inStock).length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full dark:bg-green-900">
              <Eye className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </CardBody>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardBody className="flex flex-row items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                محصولات ناموجود
              </p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {sortedProducts.filter((p: Product) => !p.inStock).length}
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-full dark:bg-red-900">
              <EyeOff className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </CardBody>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardBody className="flex flex-row items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                انتخاب شده
              </p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {selectedProducts.length}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full dark:bg-purple-900">
              <Layers className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardBody className="py-3">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-right text-gray-700 dark:text-gray-300">
                جستجو
              </label>
              <Input
                placeholder="جستجو بر اساس نام یا برند..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                startContent={<Search className="w-4 h-4 text-gray-400" />}
                variant="bordered"
                classNames={{
                  input: 'text-right',
                  inputWrapper: 'border-gray-300 hover:border-primary h-10',
                }}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-right text-gray-700 dark:text-gray-300">
                دسته‌بندی
              </label>
              <Select
                placeholder="همه دسته‌بندی‌ها"
                selectedKeys={
                  categoryFilter ? new Set([categoryFilter]) : new Set()
                }
                onSelectionChange={(keys) => {
                  const selectedKey = Array.from(keys)[0] as string;
                  setCategoryFilter(selectedKey || '');
                }}
                variant="bordered"
                disallowEmptySelection={false}
                classNames={{
                  trigger: 'h-10 min-h-10',
                  value: 'text-gray-900 dark:text-white',
                }}
              >
                {categories?.map((category: any) => {
                  // Find matching icon from PRODUCT_CATEGORIES based on slug
                  const categoryIcon =
                    PRODUCT_CATEGORIES.find((c) => c.id === category.slug)
                      ?.icon || '📦';
                  return (
                    <SelectItem
                      key={category.id}
                      startContent={
                        <span className="text-base">{categoryIcon}</span>
                      }
                    >
                      {category.name}
                    </SelectItem>
                  );
                })}
              </Select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-right text-gray-700 dark:text-gray-300">
                وضعیت موجودی
              </label>
              <Select
                placeholder="همه محصولات"
                selectedKeys={stockFilter ? new Set([stockFilter]) : new Set()}
                onSelectionChange={(keys) => {
                  const selectedKey = Array.from(keys)[0] as string;
                  setStockFilter(selectedKey || '');
                }}
                variant="bordered"
                disallowEmptySelection={false}
                classNames={{
                  trigger: 'h-10 min-h-10',
                  value: 'text-gray-900 dark:text-white',
                }}
              >
                <SelectItem key="true">موجود</SelectItem>
                <SelectItem key="false">ناموجود</SelectItem>
              </Select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-right text-gray-700 dark:text-gray-300">
                عملیات
              </label>
              {selectedProducts.length > 0 ? (
                <div className="flex h-10 gap-2">
                  <Button
                    size="md"
                    variant="flat"
                    color="primary"
                    onClick={onBulkModalOpen}
                    className="flex-1"
                  >
                    ویرایش ({selectedProducts.length})
                  </Button>
                  <Button
                    size="md"
                    color="danger"
                    variant="flat"
                    startContent={<Trash2 className="w-4 h-4" />}
                    onClick={onDeleteModalOpen}
                    className="flex-1"
                  >
                    حذف ({selectedProducts.length})
                  </Button>
                </div>
              ) : (
                <Button
                  size="md"
                  variant="bordered"
                  startContent={<RefreshCw className="w-4 h-4" />}
                  onClick={() => {
                    setSearchTerm('');
                    setCategoryFilter('');
                    setStockFilter('');
                  }}
                  className="w-full h-10"
                >
                  پاک کردن فیلترها
                </Button>
              )}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader className="flex items-center gap-2 pb-3">
          <Package className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">
            لیست محصولات ({sortedProducts.length})
          </h3>
        </CardHeader>
        <CardBody className="overflow-x-auto">
          <Table
            aria-label="Products table"
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
            classNames={{
              wrapper: 'shadow-none',
              th: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold',
              td: 'py-4',
            }}
          >
            <TableHeader>
              <TableColumn width={50}>
                <Checkbox
                  isSelected={
                    sortedProducts.length > 0 &&
                    selectedProducts.length === sortedProducts.length
                  }
                  onValueChange={handleSelectAll}
                />
              </TableColumn>
              <TableColumn key="name" allowsSorting>
                نام محصول
              </TableColumn>
              <TableColumn key="brand" allowsSorting>
                برند
              </TableColumn>
              <TableColumn key="size" allowsSorting>
                سایز
              </TableColumn>
              <TableColumn key="price" allowsSorting>
                قیمت (تومان)
              </TableColumn>
              <TableColumn key="inStock" allowsSorting>
                موجودی
              </TableColumn>
              <TableColumn key="category" allowsSorting>
                دسته‌بندی
              </TableColumn>
              <TableColumn key="subcategory">زیردسته</TableColumn>
              <TableColumn width={150}>عملیات</TableColumn>
            </TableHeader>
            <TableBody isLoading={isLoading} emptyContent="هیچ محصولی یافت نشد">
              {sortedProducts.map((product: Product) => (
                <TableRow
                  key={product.id}
                  className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <TableCell>
                    <Checkbox
                      isSelected={selectedProducts.includes(product.id)}
                      onValueChange={(checked) =>
                        handleSelectProduct(product.id, checked)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                        <Package className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {product.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-600 dark:text-gray-400">
                      {product.brand}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {product.size || 'نامشخص'}
                    </span>
                  </TableCell>
                  <TableCell>
                    {editingPriceId === product.id ? (
                      <Input
                        type="number"
                        value={tempPrice}
                        onChange={(e) => setTempPrice(e.target.value)}
                        onBlur={() => handlePriceBlur(product)}
                        onKeyDown={(e) => handlePriceKeyDown(e, product)}
                        autoFocus
                        size="sm"
                        variant="bordered"
                        classNames={{
                          input:
                            'text-green-600 dark:text-green-400 font-bold text-right',
                          inputWrapper: 'h-8 min-h-8 border-green-500',
                        }}
                      />
                    ) : (
                      <span
                        className="font-bold text-green-600 cursor-pointer dark:text-green-400 hover:underline"
                        onClick={() => handlePriceClick(product)}
                        title="کلیک کنید برای ویرایش"
                      >
                        {product.price.toLocaleString('fa-IR')}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="sm"
                      variant="flat"
                      color={product.inStock ? 'success' : 'danger'}
                      onClick={() => handleStockToggle(product)}
                      className="transition-opacity cursor-pointer hover:opacity-80"
                      title="کلیک کنید برای تغییر وضعیت"
                    >
                      {product.inStock ? 'موجود' : 'ناموجود'}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Chip size="sm" variant="bordered">
                      {product.category.name}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {product.subcategory}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="light"
                        color="primary"
                        isIconOnly
                        onPress={() => handleEditProduct(product)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        color="danger"
                        variant="light"
                        isIconOnly
                        onPress={() => handleDeleteProduct(product)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Bulk Update Modal */}
      <Modal isOpen={isBulkModalOpen} onOpenChange={onBulkModalOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h3>
                  ویرایش گروهی محصولات ({selectedProducts.length} انتخاب شده)
                </h3>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <Input
                    type="number"
                    label="قیمت جدید"
                    placeholder="قیمت جدید را وارد کنید"
                    value={bulkUpdateData.price?.toString() || ''}
                    onChange={(e) =>
                      setBulkUpdateData({
                        ...bulkUpdateData,
                        price: e.target.value
                          ? parseFloat(e.target.value)
                          : undefined,
                      })
                    }
                  />
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                      وضعیت موجودی
                    </label>
                    <select
                      className="px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={
                        bulkUpdateData.inStock !== undefined
                          ? bulkUpdateData.inStock.toString()
                          : ''
                      }
                      onChange={(e) => {
                        setBulkUpdateData({
                          ...bulkUpdateData,
                          inStock:
                            e.target.value === 'true'
                              ? true
                              : e.target.value === 'false'
                                ? false
                                : undefined,
                        });
                      }}
                    >
                      <option value="">بدون تغییر</option>
                      <option value="true">موجود</option>
                      <option value="false">ناموجود</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">
                      دسته‌بندی
                    </label>
                    <select
                      className="px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={bulkUpdateData.categoryId || ''}
                      onChange={(e) => {
                        setBulkUpdateData({
                          ...bulkUpdateData,
                          categoryId: e.target.value || undefined,
                        });
                      }}
                    >
                      <option value="">بدون تغییر</option>
                      {categories?.map((category: any) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  لغو
                </Button>
                <Button color="primary" onPress={handleBulkUpdate}>
                  به‌روزرسانی محصولات
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Bulk Delete Modal */}
      <Modal isOpen={isDeleteModalOpen} onOpenChange={onDeleteModalOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h3>حذف محصولات</h3>
              </ModalHeader>
              <ModalBody>
                <p>
                  آیا مطمئن هستید که می‌خواهید {selectedProducts.length} محصول
                  انتخاب شده را حذف کنید؟ این عمل قابل بازگشت نیست.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  لغو
                </Button>
                <Button color="danger" onPress={handleBulkDelete}>
                  حذف محصولات
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Edit Product Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onOpenChange={onEditModalOpenChange}
        size="2xl"
        scrollBehavior="outside"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-xl font-bold">ویرایش محصول</h3>
                <p className="text-sm font-normal text-gray-500">
                  ویرایش اطلاعات "{editingProduct?.name}"
                </p>
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 gap-4">
                  <Input
                    label="نام محصول"
                    value={editProductData.name}
                    onChange={(e) =>
                      setEditProductData({
                        ...editProductData,
                        name: e.target.value,
                      })
                    }
                    isRequired
                    variant="bordered"
                    classNames={{
                      label: 'text-gray-700 dark:text-gray-300 font-medium',
                      input: 'text-gray-900 dark:text-white',
                    }}
                  />
                  <Input
                    label="برند"
                    value={editProductData.brand}
                    onChange={(e) =>
                      setEditProductData({
                        ...editProductData,
                        brand: e.target.value,
                      })
                    }
                    isRequired
                    variant="bordered"
                    classNames={{
                      label: 'text-gray-700 dark:text-gray-300 font-medium',
                      input: 'text-gray-900 dark:text-white',
                    }}
                  />
                  <Input
                    label="سایز"
                    value={editProductData.size}
                    onChange={(e) =>
                      setEditProductData({
                        ...editProductData,
                        size: e.target.value,
                      })
                    }
                    isRequired
                    variant="bordered"
                    classNames={{
                      label: 'text-gray-700 dark:text-gray-300 font-medium',
                      input: 'text-gray-900 dark:text-white',
                    }}
                  />
                  <Input
                    label="قیمت (تومان)"
                    type="number"
                    value={editProductData.price.toString()}
                    onChange={(e) =>
                      setEditProductData({
                        ...editProductData,
                        price: parseFloat(e.target.value) || 0,
                      })
                    }
                    isRequired
                    variant="bordered"
                    startContent={
                      <DollarSign className="w-4 h-4 text-gray-400" />
                    }
                    classNames={{
                      label: 'text-gray-700 dark:text-gray-300 font-medium',
                      input: 'text-gray-900 dark:text-white',
                    }}
                  />

                  <Select
                    label="دسته‌بندی"
                    placeholder="دسته‌بندی را انتخاب کنید"
                    selectedKeys={
                      editProductData.categoryId
                        ? new Set([editProductData.categoryId])
                        : new Set()
                    }
                    onSelectionChange={(keys) => {
                      const selectedKey = Array.from(keys)[0] as string;
                      setEditProductData({
                        ...editProductData,
                        categoryId: selectedKey || '',
                        subcategory: '', // Reset subcategory when category changes
                      });
                    }}
                    isRequired
                    variant="bordered"
                    disallowEmptySelection={false}
                    classNames={{
                      label: 'text-gray-700 dark:text-gray-300 font-medium',
                      value: 'text-gray-900 dark:text-white',
                    }}
                  >
                    {categories?.map((category: any) => (
                      <SelectItem key={category.id}>{category.name}</SelectItem>
                    ))}
                  </Select>

                  <Select
                    label="زیر دسته‌بندی"
                    placeholder="ابتدا دسته‌بندی را انتخاب کنید"
                    selectedKeys={
                      editProductData.subcategory
                        ? new Set([editProductData.subcategory])
                        : new Set()
                    }
                    onSelectionChange={(keys) => {
                      const selectedKey = Array.from(keys)[0] as string;
                      setEditProductData({
                        ...editProductData,
                        subcategory: selectedKey || '',
                      });
                    }}
                    isDisabled={!editProductData.categoryId}
                    isRequired
                    variant="bordered"
                    disallowEmptySelection={false}
                    classNames={{
                      label: 'text-gray-700 dark:text-gray-300 font-medium',
                      value: 'text-gray-900 dark:text-white',
                    }}
                  >
                    {editProductData.categoryId
                      ? categories
                          ?.find(
                            (cat: any) => cat.id === editProductData.categoryId
                          )
                          ?.subcategories?.map((subcategory: string) => (
                            <SelectItem key={subcategory}>
                              {subcategory}
                            </SelectItem>
                          )) || []
                      : []}
                  </Select>

                  <Select
                    label="وضعیت موجودی"
                    selectedKeys={new Set([editProductData.inStock.toString()])}
                    onSelectionChange={(keys) => {
                      const selectedKey = Array.from(keys)[0] as string;
                      setEditProductData({
                        ...editProductData,
                        inStock: selectedKey === 'true',
                      });
                    }}
                    variant="bordered"
                    disallowEmptySelection
                    classNames={{
                      label: 'text-gray-700 dark:text-gray-300 font-medium',
                      value: 'text-gray-900 dark:text-white',
                    }}
                  >
                    <SelectItem key="true">موجود</SelectItem>
                    <SelectItem key="false">ناموجود</SelectItem>
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  لغو
                </Button>
                <Button
                  color="primary"
                  onPress={handleSaveEdit}
                  startContent={<Edit className="w-4 h-4" />}
                >
                  ذخیره تغییرات
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Delete Single Product Modal */}
      <Modal
        isOpen={isDeleteSingleModalOpen}
        onOpenChange={onDeleteSingleModalOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h3>حذف محصول</h3>
              </ModalHeader>
              <ModalBody>
                <p>
                  آیا مطمئن هستید که می‌خواهید "{productToDelete?.name}" را حذف
                  کنید؟ این عمل قابل بازگشت نیست.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  لغو
                </Button>
                <Button color="danger" onPress={handleConfirmDelete}>
                  حذف محصول
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Add Product Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onOpenChange={onAddModalOpenChange}
        size="2xl"
        scrollBehavior="outside"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-xl font-bold">افزودن محصول جدید</h3>
                <p className="text-sm font-normal text-gray-500">
                  اطلاعات محصول را با دقت وارد کنید
                </p>
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 gap-4">
                  <Input
                    label="نام محصول"
                    placeholder="نام محصول را وارد کنید"
                    value={newProductData.name}
                    onChange={(e) =>
                      setNewProductData({
                        ...newProductData,
                        name: e.target.value,
                      })
                    }
                    isRequired
                    variant="bordered"
                    classNames={{
                      label: 'text-gray-700 dark:text-gray-300 font-medium',
                      input: 'text-gray-900 dark:text-white',
                    }}
                  />
                  <Input
                    label="برند"
                    placeholder="نام برند را وارد کنید"
                    value={newProductData.brand}
                    onChange={(e) =>
                      setNewProductData({
                        ...newProductData,
                        brand: e.target.value,
                      })
                    }
                    isRequired
                    variant="bordered"
                    classNames={{
                      label: 'text-gray-700 dark:text-gray-300 font-medium',
                      input: 'text-gray-900 dark:text-white',
                    }}
                  />
                  <Input
                    label="سایز"
                    placeholder="مثال: 12، 16، 20"
                    value={newProductData.size}
                    onChange={(e) =>
                      setNewProductData({
                        ...newProductData,
                        size: e.target.value,
                      })
                    }
                    isRequired
                    variant="bordered"
                    classNames={{
                      label: 'text-gray-700 dark:text-gray-300 font-medium',
                      input: 'text-gray-900 dark:text-white',
                    }}
                  />
                  <Input
                    label="قیمت (تومان)"
                    type="number"
                    placeholder="قیمت را وارد کنید"
                    value={newProductData.price.toString()}
                    onChange={(e) =>
                      setNewProductData({
                        ...newProductData,
                        price: parseFloat(e.target.value) || 0,
                      })
                    }
                    isRequired
                    variant="bordered"
                    startContent={
                      <DollarSign className="w-4 h-4 text-gray-400" />
                    }
                    classNames={{
                      label: 'text-gray-700 dark:text-gray-300 font-medium',
                      input: 'text-gray-900 dark:text-white',
                    }}
                  />

                  <Select
                    label="دسته‌بندی"
                    placeholder="دسته‌بندی را انتخاب کنید"
                    selectedKeys={
                      newProductData.categoryId
                        ? new Set([newProductData.categoryId])
                        : new Set()
                    }
                    onSelectionChange={(keys) => {
                      const selectedKey = Array.from(keys)[0] as string;
                      setNewProductData({
                        ...newProductData,
                        categoryId: selectedKey || '',
                        subcategory: '', // Reset subcategory when category changes
                      });
                    }}
                    isRequired
                    variant="bordered"
                    disallowEmptySelection={false}
                    classNames={{
                      label: 'text-gray-700 dark:text-gray-300 font-medium',
                      value: 'text-gray-900 dark:text-white',
                    }}
                  >
                    {categories?.map((category: any) => (
                      <SelectItem key={category.id}>{category.name}</SelectItem>
                    ))}
                  </Select>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Select
                      label="زیر دسته‌بندی"
                      placeholder="ابتدا دسته‌بندی را انتخاب کنید"
                      selectedKeys={
                        newProductData.subcategory
                          ? new Set([newProductData.subcategory])
                          : new Set()
                      }
                      onSelectionChange={(keys) => {
                        const selectedKey = Array.from(keys)[0] as string;
                        setNewProductData({
                          ...newProductData,
                          subcategory: selectedKey || '',
                        });
                      }}
                      isDisabled={!newProductData.categoryId}
                      isRequired
                      variant="bordered"
                      disallowEmptySelection={false}
                      classNames={{
                        label: 'text-gray-700 dark:text-gray-300 font-medium',
                        value: 'text-gray-900 dark:text-white',
                      }}
                    >
                      {newProductData.categoryId
                        ? categories
                            ?.find(
                              (cat: any) => cat.id === newProductData.categoryId
                            )
                            ?.subcategories?.map((subcategory: string) => (
                              <SelectItem key={subcategory}>
                                {subcategory}
                              </SelectItem>
                            )) || []
                        : []}
                    </Select>

                    <Select
                      label="وضعیت موجودی"
                      placeholder="انتخاب کنید"
                      selectedKeys={
                        new Set([newProductData.inStock.toString()])
                      }
                      onSelectionChange={(keys) => {
                        const selectedKey = Array.from(keys)[0] as string;
                        setNewProductData({
                          ...newProductData,
                          inStock: selectedKey === 'true',
                        });
                      }}
                      variant="bordered"
                      disallowEmptySelection
                      classNames={{
                        label: 'text-gray-700 dark:text-gray-300 font-medium',
                        value: 'text-gray-900 dark:text-white',
                      }}
                    >
                      <SelectItem
                        key="true"
                        startContent={
                          <Eye className="w-4 h-4 text-green-500" />
                        }
                      >
                        موجود
                      </SelectItem>
                      <SelectItem
                        key="false"
                        startContent={
                          <EyeOff className="w-4 h-4 text-red-500" />
                        }
                      >
                        ناموجود
                      </SelectItem>
                    </Select>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  لغو
                </Button>
                <Button
                  color="primary"
                  onPress={handleSaveNewProduct}
                  startContent={<Plus className="w-4 h-4" />}
                >
                  افزودن محصول
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
