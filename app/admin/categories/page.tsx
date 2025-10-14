'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  FolderTree,
  Package,
  ChevronDown,
  ChevronRight,
  Layers,
  AlertCircle,
  RefreshCw,
  X,
  Save,
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@heroui/input';
import { addToast } from '@heroui/toast';

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  description: string | null;
  subcategories: string[];
  _count: {
    products: number;
  };
  createdAt: string;
  updatedAt: string;
}

export default function CategoriesPage() {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  // Form data for edit modal
  const [editForm, setEditForm] = useState({
    name: '',
    slug: '',
    description: '',
    subcategories: [] as string[],
  });

  // Fetch categories
  const fetchCategories = async (search = '') => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        ...(search && { search }),
      });

      const response = await fetch(`/api/categories?${params}`);
      const result = await response.json();

      if (result.success) {
        setCategories(result.data);
      } else {
        alert('خطا در دریافت اطلاعات دسته‌بندی‌ها');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      alert('خطا در برقراری ارتباط با سرور');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle search
  const handleSearch = () => {
    fetchCategories(searchQuery);
  };

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  // Handle edit
  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setEditForm({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      subcategories: [...category.subcategories],
    });
    setEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedCategory) return;

    // Validation
    if (!editForm.name.trim()) {
      alert('نام دسته‌بندی الزامی است');
      return;
    }

    try {
      setSaveLoading(true);
      const response = await fetch(`/api/categories/${selectedCategory.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editForm.name.trim(),
          slug:
            editForm.slug.trim() || editForm.name.trim().replace(/\s+/g, '-'),
          description: editForm.description.trim() || null,
          subcategories: editForm.subcategories.filter((s) => s.trim()),
        }),
      });

      const result = await response.json();

      if (result.success) {
        addToast({
          title: 'موفقیت',
          description: 'دسته‌بندی با موفقیت بروزرسانی شد',
          color: 'success',
        });
        setEditModalOpen(false);
        fetchCategories(searchQuery);
      } else {
        addToast({
          title: 'خطا',
          description: result.error || 'خطا در بروزرسانی دسته‌بندی',
          color: 'danger',
        });
      }
    } catch (error) {
      console.error('Error updating category:', error);
      addToast({
        title: 'خطا',
        description: 'خطا در ارتباط با سرور',
        color: 'danger',
      });
    } finally {
      setSaveLoading(false);
    }
  };

  const handleAddSubcategory = () => {
    setEditForm({
      ...editForm,
      subcategories: [...editForm.subcategories, ''],
    });
  };

  const handleRemoveSubcategory = (index: number) => {
    const newSubs = editForm.subcategories.filter((_, i) => i !== index);
    setEditForm({
      ...editForm,
      subcategories: newSubs,
    });
  };

  const handleSubcategoryChange = (index: number, value: string) => {
    const newSubs = [...editForm.subcategories];
    newSubs[index] = value;
    setEditForm({
      ...editForm,
      subcategories: newSubs,
    });
  };

  // Handle delete
  const handleDeleteClick = (category: Category) => {
    setSelectedCategory(category);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedCategory) return;

    try {
      setDeleteLoading(true);
      const response = await fetch(`/api/categories/${selectedCategory.id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        addToast({
          title: 'موفقیت',
          description: 'دسته‌بندی با موفقیت حذف شد',
          color: 'success',
        });
        setDeleteModalOpen(false);
        fetchCategories(searchQuery);
      } else {
        addToast({
          title: 'خطا',
          description: result.error || 'خطا در حذف دسته‌بندی',
          color: 'danger',
        });
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      addToast({
        title: 'خطا',
        description: 'خطا در حذف دسته‌بندی',
        color: 'danger',
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  // Calculate statistics
  const totalProducts = categories.reduce(
    (sum, cat) => sum + cat._count.products,
    0
  );
  const totalSubcategories = categories.reduce(
    (sum, cat) => sum + cat.subcategories.length,
    0
  );

  return (
    <div className="container px-6 py-8 mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 rounded-xl">
            <FolderTree className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              مدیریت دسته‌بندی‌ها
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              مدیریت دسته‌بندی‌ها و زیردسته‌های محصولات
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  کل دسته‌بندی‌ها
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {categories.length}
                </p>
              </div>
              <FolderTree className="w-12 h-12 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  کل زیردسته‌ها
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {totalSubcategories}
                </p>
              </div>
              <Layers className="w-12 h-12 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  کل محصولات
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {totalProducts}
                </p>
              </div>
              <Package className="w-12 h-12 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Actions */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <Input
                placeholder="جستجو در دسته‌بندی‌ها..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startContent={<Search className="w-4 h-4 text-gray-400" />}
                variant="bordered"
                classNames={{
                  input: 'text-right',
                  inputWrapper: 'border-gray-300 hover:border-blue-500 h-10',
                }}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleSearch}>
                <Search className="w-4 h-4 ml-2" />
                جستجو
              </Button>
              {searchQuery && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    fetchCategories('');
                  }}
                >
                  پاک کردن
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => fetchCategories(searchQuery)}
              >
                <RefreshCw className="w-4 h-4 ml-2" />
                بروزرسانی
              </Button>
              <Button
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400"
                onClick={() => router.push('/admin/categories/new')}
              >
                <Plus className="w-4 h-4 ml-2" />
                افزودن دسته‌بندی
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <RefreshCw className="w-12 h-12 text-blue-600 animate-spin" />
        </div>
      ) : categories.length === 0 ? (
        <Card>
          <CardContent className="py-20 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
              <FolderTree className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              هیچ دسته‌بندی‌ای یافت نشد
            </h3>
            <p className="mb-6 text-gray-500">
              {searchQuery
                ? 'نتیجه‌ای برای جستجوی شما یافت نشد'
                : 'برای شروع، اولین دسته‌بندی را اضافه کنید'}
            </p>
            <Button
              className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400"
              onClick={() => router.push('/admin/categories/new')}
            >
              <Plus className="w-4 h-4 ml-2" />
              افزودن دسته‌بندی جدید
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => {
            const isExpanded = expandedCategories.has(category.id);
            const hasSubcategories = category.subcategories.length > 0;

            return (
              <Card
                key={category.id}
                className="transition-all hover:shadow-xl"
              >
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="mb-4">
                    <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                      {category.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className="text-white bg-blue-500">
                        <Package className="w-3.5 h-3.5 ml-1" />
                        {category._count.products} محصول
                      </Badge>
                      {hasSubcategories && (
                        <Badge className="text-white bg-cyan-500">
                          <FolderTree className="w-3.5 h-3.5 ml-1" />
                          {category.subcategories.length} زیردسته
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  {category.description && (
                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {category.description}
                    </p>
                  )}

                  {/* Subcategories */}
                  {hasSubcategories && (
                    <div className="mb-4">
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className="flex items-center gap-2 mb-3 text-sm font-medium text-blue-600 transition-colors dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                        {isExpanded ? 'بستن' : 'نمایش'} زیردسته‌ها
                      </button>

                      {isExpanded && (
                        <div className="space-y-2">
                          {category.subcategories.map((sub, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-gray-50 dark:bg-gray-800"
                            >
                              <ChevronRight className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-700 dark:text-gray-300">
                                {sub}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Divider */}
                  <div className="h-px my-4 bg-gray-200 dark:bg-gray-700"></div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleEditClick(category)}
                    >
                      <Edit className="w-4 h-4 ml-2" />
                      ویرایش
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={() => handleDeleteClick(category)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-100 rounded-full dark:bg-red-900/20">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  حذف دسته‌بندی
                </h3>
              </div>

              <p className="mb-4 text-gray-700 dark:text-gray-300">
                آیا از حذف دسته‌بندی <strong>{selectedCategory?.name}</strong>{' '}
                اطمینان دارید؟
              </p>

              {selectedCategory && selectedCategory._count.products > 0 && (
                <div className="p-3 mb-4 border border-orange-200 rounded-lg bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800">
                  <p className="text-sm text-orange-700 dark:text-orange-400">
                    ⚠️ این دسته‌بندی دارای {selectedCategory._count.products}{' '}
                    محصول است. با حذف این دسته‌بندی، محصولات مرتبط نیز حذف
                    می‌شوند.
                  </p>
                </div>
              )}

              <p className="mb-6 text-sm text-gray-500">
                این عملیات قابل بازگشت نیست.
              </p>

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setDeleteModalOpen(false)}
                >
                  انصراف
                </Button>
                <Button
                  className="bg-red-600 hover:bg-red-700"
                  onClick={confirmDelete}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? (
                    <RefreshCw className="w-4 h-4 ml-2 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4 ml-2" />
                  )}
                  حذف
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="sticky top-0 z-10 bg-white border-b dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-xl font-bold">
                  <Edit className="w-5 h-5" />
                  ویرایش دسته‌بندی
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditModalOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Name Field */}
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    نام دسته‌بندی
                  </label>
                  <Input
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    placeholder="نام دسته‌بندی را وارد کنید"
                  />
                </div>

                {/* Slug Field */}
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    شناسه (Slug)
                  </label>
                  <Input
                    value={editForm.slug}
                    onChange={(e) =>
                      setEditForm({ ...editForm, slug: e.target.value })
                    }
                    placeholder="slug-example"
                    dir="ltr"
                  />
                </div>

                {/* Description Field */}
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    توضیحات
                  </label>
                  <textarea
                    value={editForm.description || ''}
                    onChange={(e) =>
                      setEditForm({ ...editForm, description: e.target.value })
                    }
                    placeholder="توضیحات دسته‌بندی را وارد کنید"
                    className="w-full min-h-[100px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
                  />
                </div>

                {/* Subcategories */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium">
                      زیردسته‌ها
                    </label>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleAddSubcategory}
                    >
                      <Plus className="w-4 h-4 ml-2" />
                      افزودن زیردسته
                    </Button>
                  </div>
                  {editForm.subcategories.length > 0 ? (
                    <div className="space-y-2">
                      {editForm.subcategories.map((sub, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={sub}
                            onChange={(e) =>
                              handleSubcategoryChange(index, e.target.value)
                            }
                            placeholder={`زیردسته ${index + 1}`}
                            className="flex-1"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                            onClick={() => handleRemoveSubcategory(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="py-4 text-sm text-center text-gray-500">
                      زیردسته‌ای وجود ندارد
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-6 mt-6 border-t">
                <Button
                  variant="outline"
                  onClick={() => setEditModalOpen(false)}
                  disabled={saveLoading}
                >
                  انصراف
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={handleSaveEdit}
                  disabled={saveLoading}
                >
                  {saveLoading ? (
                    <RefreshCw className="w-4 h-4 ml-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 ml-2" />
                  )}
                  ذخیره تغییرات
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
