'use client'

import { useState, useMemo } from 'react'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { Card, CardBody } from '@heroui/card'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@heroui/table'
import { Checkbox } from '@heroui/checkbox'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@heroui/modal'
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
} from 'lucide-react'
import { useProducts, useCategories } from '@/hooks/useApi'

interface Product {
  id: string
  name: string
  brand: string
  price: number
  inStock: boolean
  category: {
    name: string
  }
  createdAt: string
}

interface BulkUpdateData {
  price?: number
  inStock?: boolean
  categoryId?: string
}

interface EditProductData {
  name: string
  brand: string
  size: string
  price: number
  inStock: boolean
  categoryId: string
  subcategory: string
}

export default function AdminProducts() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [stockFilter, setStockFilter] = useState('')
  const [bulkUpdateData, setBulkUpdateData] = useState<BulkUpdateData>({})
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [editProductData, setEditProductData] = useState<EditProductData>({
    name: '',
    brand: '',
    size: '',
    price: 0,
    inStock: true,
    categoryId: '',
    subcategory: '',
  })
  const [newProductData, setNewProductData] = useState<EditProductData>({
    name: '',
    brand: '',
    size: '',
    price: 0,
    inStock: true,
    categoryId: '',
    subcategory: '',
  })
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)
  const [sortDescriptor, setSortDescriptor] = useState({
    column: 'createdAt' as any,
    direction: 'descending' as 'ascending' | 'descending',
  })

  const formatPersianDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const {
    isOpen: isBulkModalOpen,
    onOpen: onBulkModalOpen,
    onOpenChange: onBulkModalOpenChange,
  } = useDisclosure()
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalOpenChange,
  } = useDisclosure()
  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onOpenChange: onEditModalOpenChange,
  } = useDisclosure()
  const {
    isOpen: isDeleteSingleModalOpen,
    onOpen: onDeleteSingleModalOpen,
    onOpenChange: onDeleteSingleModalOpenChange,
  } = useDisclosure()
  const {
    isOpen: isAddModalOpen,
    onOpen: onAddModalOpen,
    onOpenChange: onAddModalOpenChange,
  } = useDisclosure()

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
  })

  const { categories } = useCategories()

  const sortedProducts = useMemo(() => {
    if (!products) return []

    return [...products].sort((a, b) => {
      let aValue: any
      let bValue: any
      const column = String(sortDescriptor.column)

      switch (column) {
        case 'name':
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
        case 'brand':
          aValue = a.brand.toLowerCase()
          bValue = b.brand.toLowerCase()
          break
        case 'price':
          aValue = a.price
          bValue = b.price
          break
        case 'inStock':
          aValue = a.inStock
          bValue = b.inStock
          break
        case 'category':
          aValue = a.category.name.toLowerCase()
          bValue = b.category.name.toLowerCase()
          break
        case 'createdAt':
          aValue = new Date(a.createdAt).getTime()
          bValue = new Date(b.createdAt).getTime()
          break
        default:
          return 0
      }

      if (aValue < bValue) {
        return sortDescriptor.direction === 'ascending' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortDescriptor.direction === 'ascending' ? 1 : -1
      }
      return 0
    })
  }, [products, sortDescriptor])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(sortedProducts.map((p: Product) => p.id))
    } else {
      setSelectedProducts([])
    }
  }

  const handleSelectProduct = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId])
    } else {
      setSelectedProducts(selectedProducts.filter(id => id !== productId))
    }
  }

  const handleBulkUpdate = async () => {
    if (selectedProducts.length === 0) return

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
      })

      if (response.ok) {
        mutateProducts()
        setSelectedProducts([])
        setBulkUpdateData({})
        onBulkModalOpenChange()
      }
    } catch (error) {
      console.error('Bulk update failed:', error)
    }
  }

  const handleBulkDelete = async () => {
    if (selectedProducts.length === 0) return

    try {
      const response = await fetch('/api/products/bulk', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productIds: selectedProducts,
        }),
      })

      if (response.ok) {
        mutateProducts()
        setSelectedProducts([])
        onDeleteModalOpenChange()
      }
    } catch (error) {
      console.error('Bulk delete failed:', error)
    }
  }

  // Individual product handlers
  const handleEditProduct = (product: any) => {
    setEditingProduct(product)
    setEditProductData({
      name: product.name,
      brand: product.brand,
      size: product.size || '',
      price: product.price,
      inStock: product.inStock,
      categoryId: product.category?.id || '',
      subcategory: product.subcategory || '',
    })
    onEditModalOpen()
  }

  const handleSaveEdit = async () => {
    if (!editingProduct) return

    // Validate required fields
    if (
      !editProductData.name ||
      !editProductData.brand ||
      !editProductData.categoryId ||
      !editProductData.subcategory
    ) {
      alert('Please fill in all required fields')
      return
    }

    try {
      const response = await fetch(`/api/products/${editingProduct.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editProductData),
      })

      if (response.ok) {
        mutateProducts()
        setEditingProduct(null)
        onEditModalOpenChange()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to update product')
      }
    } catch (error) {
      console.error('Edit product failed:', error)
      alert('Failed to update product')
    }
  }

  const handleDeleteProduct = (product: Product) => {
    setProductToDelete(product)
    onDeleteSingleModalOpen()
  }

  const handleConfirmDelete = async () => {
    if (!productToDelete) return

    try {
      const response = await fetch(`/api/products/${productToDelete.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        mutateProducts()
        setProductToDelete(null)
        onDeleteSingleModalOpenChange()
      }
    } catch (error) {
      console.error('Delete product failed:', error)
    }
  }

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
    })
    onAddModalOpen()
  }

  const handleSaveNewProduct = async () => {
    // Validate required fields
    if (
      !newProductData.name ||
      !newProductData.brand ||
      !newProductData.categoryId ||
      !newProductData.subcategory
    ) {
      alert('Please fill in all required fields')
      return
    }

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProductData),
      })

      if (response.ok) {
        mutateProducts()
        setNewProductData({
          name: '',
          brand: '',
          size: '',
          price: 0,
          inStock: true,
          categoryId: '',
          subcategory: '',
        })
        onAddModalOpenChange()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to add product')
      }
    } catch (error) {
      console.error('Add product failed:', error)
      alert('Failed to add product')
    }
  }

  const exportProducts = () => {
    const csvContent = [
      [
        'ID',
        'Name',
        'Brand',
        'Price',
        'In Stock',
        'Category',
        'Created At',
      ].join(','),
      ...sortedProducts.map((product: Product) =>
        [
          product.id,
          `"${product.name}"`,
          `"${product.brand}"`,
          product.price,
          product.inStock,
          `"${product.category.name}"`,
          formatPersianDate(product.createdAt),
        ].join(','),
      ),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'products.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
          مدیریت محصولات
        </h1>
        <div className='flex gap-2'>
          <Button
            startContent={<Upload className='w-4 h-4' />}
            variant='bordered'
          >
            وارد کردن
          </Button>
          <Button
            startContent={<Download className='w-4 h-4' />}
            variant='bordered'
            onClick={exportProducts}
          >
            خروجی گرفتن
          </Button>
          <Button
            startContent={<Plus className='w-4 h-4' />}
            color='primary'
            onPress={handleAddProduct}
          >
            افزودن محصول
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardBody>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            <Input
              placeholder='جستجوی محصولات...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              startContent={<Search className='w-4 h-4' />}
            />
            <div className='flex flex-col gap-1'>
              <label className='text-sm font-medium text-gray-700'>
                دسته‌بندی
              </label>
              <select
                className='border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={categoryFilter || ''}
                onChange={e => setCategoryFilter(e.target.value)}
              >
                <option value=''>همه دسته‌بندی‌ها</option>
                {categories?.map((category: any) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-sm font-medium text-gray-700'>
                موجودی
              </label>
              <select
                className='border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={stockFilter || ''}
                onChange={e => setStockFilter(e.target.value)}
              >
                <option value=''>همه محصولات</option>
                <option value='true'>موجود</option>
                <option value='false'>ناموجود</option>
              </select>
            </div>
            <div className='flex gap-2'>
              {selectedProducts.length > 0 && (
                <>
                  <Button
                    variant='bordered'
                    startContent={<DollarSign className='w-4 h-4' />}
                    onClick={onBulkModalOpen}
                  >
                    ویرایش گروهی ({selectedProducts.length})
                  </Button>
                  <Button
                    color='danger'
                    variant='bordered'
                    startContent={<Trash2 className='w-4 h-4' />}
                    onClick={onDeleteModalOpen}
                  >
                    حذف ({selectedProducts.length})
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Products Table */}
      <Card>
        <CardBody className='px-20'>
          <Table
            aria-label='Products table'
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
          >
            <TableHeader>
              <TableColumn>
                <Checkbox
                  isSelected={
                    sortedProducts.length > 0 &&
                    selectedProducts.length === sortedProducts.length
                  }
                  onValueChange={handleSelectAll}
                />
              </TableColumn>
              <TableColumn key='name' allowsSorting>
                نام
              </TableColumn>
              <TableColumn key='brand' allowsSorting>
                برند
              </TableColumn>
              <TableColumn key='price' allowsSorting>
                قیمت
              </TableColumn>
              <TableColumn key='inStock' allowsSorting>
                موجودی
              </TableColumn>
              <TableColumn key='category' allowsSorting>
                دسته‌بندی
              </TableColumn>
              <TableColumn key='createdAt' allowsSorting>
                تاریخ ایجاد
              </TableColumn>
              <TableColumn>عملیات</TableColumn>
            </TableHeader>
            <TableBody isLoading={isLoading}>
              {sortedProducts.map((product: Product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Checkbox
                      isSelected={selectedProducts.includes(product.id)}
                      onValueChange={checked =>
                        handleSelectProduct(product.id, checked)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <Package className='w-4 h-4' />
                      <span className='font-medium'>{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>${product.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      {product.inStock ? (
                        <Eye className='w-4 h-4 text-green-500' />
                      ) : (
                        <EyeOff className='w-4 h-4 text-red-500' />
                      )}
                      {product.inStock ? 'موجود' : 'ناموجود'}
                    </div>
                  </TableCell>
                  <TableCell>{product.category.name}</TableCell>
                  <TableCell>{formatPersianDate(product.createdAt)}</TableCell>
                  <TableCell>
                    <div className='flex gap-2'>
                      <Button
                        size='sm'
                        variant='light'
                        startContent={<Edit className='w-4 h-4' />}
                        onPress={() => handleEditProduct(product)}
                      >
                        ویرایش
                      </Button>
                      <Button
                        size='sm'
                        color='danger'
                        variant='light'
                        startContent={<Trash2 className='w-4 h-4' />}
                        onPress={() => handleDeleteProduct(product)}
                      >
                        حذف
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
          {onClose => (
            <>
              <ModalHeader>
                <h3>
                  ویرایش گروهی محصولات ({selectedProducts.length} انتخاب شده)
                </h3>
              </ModalHeader>
              <ModalBody>
                <div className='space-y-4'>
                  <Input
                    type='number'
                    label='قیمت جدید'
                    placeholder='قیمت جدید را وارد کنید'
                    value={bulkUpdateData.price?.toString() || ''}
                    onChange={e =>
                      setBulkUpdateData({
                        ...bulkUpdateData,
                        price: e.target.value
                          ? parseFloat(e.target.value)
                          : undefined,
                      })
                    }
                  />
                  <div className='flex flex-col gap-1'>
                    <label className='text-sm font-medium text-gray-700'>
                      وضعیت موجودی
                    </label>
                    <select
                      className='border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                      value={
                        bulkUpdateData.inStock !== undefined
                          ? bulkUpdateData.inStock.toString()
                          : ''
                      }
                      onChange={e => {
                        setBulkUpdateData({
                          ...bulkUpdateData,
                          inStock:
                            e.target.value === 'true'
                              ? true
                              : e.target.value === 'false'
                                ? false
                                : undefined,
                        })
                      }}
                    >
                      <option value=''>بدون تغییر</option>
                      <option value='true'>موجود</option>
                      <option value='false'>ناموجود</option>
                    </select>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <label className='text-sm font-medium text-gray-700'>
                      دسته‌بندی
                    </label>
                    <select
                      className='border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                      value={bulkUpdateData.categoryId || ''}
                      onChange={e => {
                        setBulkUpdateData({
                          ...bulkUpdateData,
                          categoryId: e.target.value || undefined,
                        })
                      }}
                    >
                      <option value=''>بدون تغییر</option>
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
                <Button variant='light' onPress={onClose}>
                  لغو
                </Button>
                <Button color='primary' onPress={handleBulkUpdate}>
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
          {onClose => (
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
                <Button variant='light' onPress={onClose}>
                  لغو
                </Button>
                <Button color='danger' onPress={handleBulkDelete}>
                  حذف محصولات
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Edit Product Modal */}
      <Modal isOpen={isEditModalOpen} onOpenChange={onEditModalOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader>
                <h3>ویرایش محصول</h3>
              </ModalHeader>
              <ModalBody>
                <div className='space-y-4'>
                  <Input
                    label='نام محصول'
                    value={editProductData.name}
                    onChange={e =>
                      setEditProductData({
                        ...editProductData,
                        name: e.target.value,
                      })
                    }
                    isRequired
                  />
                  <Input
                    label='برند'
                    value={editProductData.brand}
                    onChange={e =>
                      setEditProductData({
                        ...editProductData,
                        brand: e.target.value,
                      })
                    }
                    isRequired
                  />
                  <Input
                    label='سایز'
                    value={editProductData.size}
                    onChange={e =>
                      setEditProductData({
                        ...editProductData,
                        size: e.target.value,
                      })
                    }
                    isRequired
                  />
                  <Input
                    label='قیمت'
                    type='number'
                    value={editProductData.price.toString()}
                    onChange={e =>
                      setEditProductData({
                        ...editProductData,
                        price: parseFloat(e.target.value) || 0,
                      })
                    }
                    isRequired
                  />
                  <div className='flex flex-col gap-1'>
                    <label className='text-sm font-medium text-gray-700'>
                      وضعیت موجودی
                    </label>
                    <select
                      className='border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                      value={editProductData.inStock.toString()}
                      onChange={e => {
                        setEditProductData({
                          ...editProductData,
                          inStock: e.target.value === 'true',
                        })
                      }}
                    >
                      <option value='true'>موجود</option>
                      <option value='false'>ناموجود</option>
                    </select>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <label className='text-sm font-medium text-gray-700'>
                      دسته‌بندی
                    </label>
                    <select
                      className='border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                      value={editProductData.categoryId || ''}
                      onChange={e => {
                        setEditProductData({
                          ...editProductData,
                          categoryId: e.target.value || '',
                          subcategory: '', // Reset subcategory when category changes
                        })
                      }}
                      required
                    >
                      <option value=''>انتخاب کنید</option>
                      {categories?.map((category: any) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <label className='text-sm font-medium text-gray-700'>
                      زیر دسته‌بندی
                    </label>
                    <select
                      className='border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400'
                      value={editProductData.subcategory || ''}
                      onChange={e => {
                        setEditProductData({
                          ...editProductData,
                          subcategory: e.target.value || '',
                        })
                      }}
                      disabled={!editProductData.categoryId}
                      required
                    >
                      <option value=''>انتخاب کنید</option>
                      {editProductData.categoryId &&
                        categories
                          ?.find(
                            (cat: any) => cat.id === editProductData.categoryId,
                          )
                          ?.subcategories?.map((subcategory: string) => (
                            <option key={subcategory} value={subcategory}>
                              {subcategory}
                            </option>
                          ))}
                    </select>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant='light' onPress={onClose}>
                  لغو
                </Button>
                <Button color='primary' onPress={handleSaveEdit}>
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
          {onClose => (
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
                <Button variant='light' onPress={onClose}>
                  لغو
                </Button>
                <Button color='danger' onPress={handleConfirmDelete}>
                  حذف محصول
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Add Product Modal */}
      <Modal isOpen={isAddModalOpen} onOpenChange={onAddModalOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader>
                <h3>افزودن محصول جدید</h3>
              </ModalHeader>
              <ModalBody>
                <div className='space-y-4'>
                  <Input
                    label='نام محصول'
                    placeholder='نام محصول را وارد کنید'
                    value={newProductData.name}
                    onChange={e =>
                      setNewProductData({
                        ...newProductData,
                        name: e.target.value,
                      })
                    }
                    isRequired
                  />
                  <Input
                    label='برند'
                    placeholder='نام برند را وارد کنید'
                    value={newProductData.brand}
                    onChange={e =>
                      setNewProductData({
                        ...newProductData,
                        brand: e.target.value,
                      })
                    }
                    isRequired
                  />
                  <Input
                    label='سایز'
                    placeholder='سایز محصول را وارد کنید'
                    value={newProductData.size}
                    onChange={e =>
                      setNewProductData({
                        ...newProductData,
                        size: e.target.value,
                      })
                    }
                    isRequired
                  />
                  <Input
                    label='قیمت'
                    type='number'
                    placeholder='قیمت را وارد کنید'
                    value={newProductData.price.toString()}
                    onChange={e =>
                      setNewProductData({
                        ...newProductData,
                        price: parseFloat(e.target.value) || 0,
                      })
                    }
                    isRequired
                  />
                  <div className='flex flex-col gap-1'>
                    <label className='text-sm font-medium text-gray-700'>
                      وضعیت موجودی
                    </label>
                    <select
                      className='border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                      value={newProductData.inStock.toString()}
                      onChange={e => {
                        setNewProductData({
                          ...newProductData,
                          inStock: e.target.value === 'true',
                        })
                      }}
                    >
                      <option value='true'>موجود</option>
                      <option value='false'>ناموجود</option>
                    </select>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <label className='text-sm font-medium text-gray-700'>
                      دسته‌بندی
                    </label>
                    <select
                      className='border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                      value={newProductData.categoryId || ''}
                      onChange={e => {
                        setNewProductData({
                          ...newProductData,
                          categoryId: e.target.value || '',
                          subcategory: '', // Reset subcategory when category changes
                        })
                      }}
                      required
                    >
                      <option value=''>دسته‌بندی را انتخاب کنید</option>
                      {categories?.map((category: any) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <label className='text-sm font-medium text-gray-700'>
                      زیر دسته‌بندی
                    </label>
                    <select
                      className='border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400'
                      value={newProductData.subcategory || ''}
                      onChange={e => {
                        setNewProductData({
                          ...newProductData,
                          subcategory: e.target.value || '',
                        })
                      }}
                      disabled={!newProductData.categoryId}
                      required
                    >
                      <option value=''>زیر دسته‌بندی را انتخاب کنید</option>
                      {newProductData.categoryId &&
                        categories
                          ?.find(
                            (cat: any) => cat.id === newProductData.categoryId,
                          )
                          ?.subcategories?.map((subcategory: string) => (
                            <option key={subcategory} value={subcategory}>
                              {subcategory}
                            </option>
                          ))}
                    </select>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant='light' onPress={onClose}>
                  لغو
                </Button>
                <Button color='primary' onPress={handleSaveNewProduct}>
                  افزودن محصول
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
