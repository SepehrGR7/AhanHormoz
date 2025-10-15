import React from 'react'
import { Input } from '@heroui/input'
import { Button } from '@heroui/button'
import { Search, X, RefreshCw } from 'lucide-react'
import { Select, SelectItem } from '@heroui/select'
import { PRODUCT_CATEGORIES } from '@/types/products'

interface Props {
  searchTerm: string
  setSearchTerm: (v: string) => void
  onSearch: () => void
  categoryFilter: string
  setCategoryFilter: (v: string) => void
  stockFilter: string
  setStockFilter: (v: string) => void
  categories: any[] | undefined
  selectedProductsCount: number
  onBulkOpen: () => void
  onDeleteOpen: () => void
  onClearFilters: () => void
}

export default function Filters({
  searchTerm,
  setSearchTerm,
  onSearch,
  categoryFilter,
  setCategoryFilter,
  stockFilter,
  setStockFilter,
  categories,
  selectedProductsCount,
  onBulkOpen,
  onDeleteOpen,
  onClearFilters,
}: Props) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
        <div className="md:col-span-2">
          <label className="block mb-2 text-sm font-medium text-right text-gray-700 dark:text-gray-300">
            جستجو
          </label>
          <div className="flex gap-2">
            <Input
              placeholder="جستجو بر اساس نام یا برند..."
              value={searchTerm}
              onChange={(e: any) => setSearchTerm(e.target.value)}
              onKeyPress={(e: any) => {
                if (e.key === 'Enter') onSearch()
              }}
              startContent={<Search className="w-4 h-4 text-gray-400" />}
              variant="bordered"
              classNames={{
                input: 'text-right',
                inputWrapper: 'border-gray-300 hover:border-primary h-10',
              }}
            />
            <Button
              isIconOnly
              color="primary"
              variant="flat"
              onPress={onSearch}
              className="h-10"
            >
              <Search className="w-4 h-4" />
            </Button>
            {searchTerm && (
              <Button
                isIconOnly
                color="default"
                variant="flat"
                onPress={() => {
                  setSearchTerm('')
                  onSearch()
                }}
                className="h-10"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
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
              const selectedKey = Array.from(keys)[0] as string
              setCategoryFilter(selectedKey || '')
            }}
            variant="bordered"
            disallowEmptySelection={false}
            classNames={{
              trigger: 'h-10 min-h-10',
              value: 'text-gray-900 dark:text-white',
            }}
          >
            {(categories || []).map((category: any) => {
              const categoryIcon =
                PRODUCT_CATEGORIES.find((c) => c.id === category.slug)?.icon ||
                '📦'
              return (
                <SelectItem
                  key={category.id}
                  startContent={
                    <span className="text-base">{categoryIcon}</span>
                  }
                >
                  {category.name}
                </SelectItem>
              )
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
              const selectedKey = Array.from(keys)[0] as string
              setStockFilter(selectedKey || '')
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
          {selectedProductsCount > 0 ? (
            <div className="flex h-10 gap-2">
              <Button
                size="md"
                variant="flat"
                color="primary"
                onClick={onBulkOpen}
                className="flex-1"
              >
                ویرایش ({selectedProductsCount})
              </Button>
              <Button
                size="md"
                color="danger"
                variant="flat"
                onClick={onDeleteOpen}
                className="flex-1"
              >
                حذف ({selectedProductsCount})
              </Button>
            </div>
          ) : (
            <Button
              size="md"
              variant="bordered"
              startContent={<RefreshCw className="w-4 h-4" />}
              onClick={onClearFilters}
              className="w-full h-10"
            >
              پاک کردن فیلترها
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
