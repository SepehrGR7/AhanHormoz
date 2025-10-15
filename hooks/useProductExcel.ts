import { useRef } from 'react'
import * as XLSX from 'xlsx'

interface Product {
  id: string
  name: string
  brand: string
  size: string
  price: number
  inStock: boolean
  category: {
    id: string
    name: string
  }
  subcategory: string
}

interface Category {
  id: string
  name: string
  slug: string
}

interface UseProductExcelReturn {
  fileInputRef: React.RefObject<HTMLInputElement>
  exportProducts: (products: Product[]) => void
  downloadTemplate: () => void
  handleFileImport: (
    event: React.ChangeEvent<HTMLInputElement>,
    categories: Category[] | undefined,
    mutateProducts: () => void,
    addToast: (toast: any) => void
  ) => Promise<void>
  handleImportClick: () => void
}

export function useProductExcel(): UseProductExcelReturn {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const exportProducts = (products: Product[]) => {
    const exportData = products.map((product: Product) => ({
      'نام محصول': product.name,
      برند: product.brand || '-',
      سایز: product.size || '-',
      'قیمت (تومان)': product.price,
      موجودی: product.inStock ? 'موجود' : 'ناموجود',
      دسته‌بندی: product.category?.name || '-',
      زیردسته: product.subcategory || '-',
    }))

    const ws = XLSX.utils.json_to_sheet(exportData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'محصولات')

    // Set column widths for better readability
    const colWidths = [
      { wch: 25 }, // Name
      { wch: 15 }, // Brand
      { wch: 15 }, // Size
      { wch: 15 }, // Price
      { wch: 12 }, // Stock
      { wch: 20 }, // Category
      { wch: 20 }, // Subcategory
    ]
    ws['!cols'] = colWidths

    XLSX.writeFile(wb, `محصولات_${new Date().toLocaleDateString('fa-IR')}.xlsx`)
  }

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
    ]

    const ws = XLSX.utils.json_to_sheet(templateData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'محصولات')

    const colWidths = [
      { wch: 25 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 12 },
      { wch: 20 },
      { wch: 20 },
    ]
    ws['!cols'] = colWidths

    XLSX.writeFile(wb, 'الگو_محصولات.xlsx')
  }

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileImport = async (
    event: React.ChangeEvent<HTMLInputElement>,
    categories: Category[] | undefined,
    mutateProducts: () => void,
    addToast: (toast: any) => void
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const data = await file.arrayBuffer()
      const workbook = XLSX.read(data)
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]
      const jsonData = XLSX.utils.sheet_to_json(worksheet)

      console.log('📊 Excel data loaded:', jsonData.length, 'rows')
      console.log(
        '📋 Available categories:',
        categories?.map((c) => c.name)
      )

      // Map imported data to products
      const importedProducts = jsonData.map((row: any, index: number) => {
        console.log(`Row ${index + 1}:`, row)

        // Find category by name (case-insensitive and trim spaces)
        const categoryName = String(row['دسته‌بندی'] || '').trim()
        const category = categories?.find(
          (cat) =>
            cat.name.toLowerCase().trim() === categoryName.toLowerCase().trim()
        )

        if (!category) {
          console.warn(`⚠️ Category not found for: "${categoryName}"`)
        } else {
          console.log(`✅ Found category: ${category.name} (${category.id})`)
        }

        // Parse stock status
        const stockText = String(row['موجودی'] || '').trim()
        const inStock = stockText === 'موجود'

        // Parse price - ensure it's a number
        let price = 0
        const priceValue = row['قیمت (تومان)']
        if (typeof priceValue === 'number') {
          price = priceValue
        } else if (typeof priceValue === 'string') {
          price = parseFloat(priceValue.replace(/,/g, '')) || 0
        }

        return {
          name: String(row['نام محصول'] || '').trim(),
          brand: String(row['برند'] || '').trim(),
          size: String(row['سایز'] || '').trim(),
          price: price,
          inStock: inStock,
          categoryId: category?.id || '',
          subcategory: String(row['زیردسته'] || '').trim(),
        }
      })

      console.log('📦 Processed products:', importedProducts)

      // Validate data
      const invalidProducts = importedProducts.filter(
        (p) =>
          !p.name || !p.brand || !p.categoryId || !p.subcategory || !p.price
      )

      if (invalidProducts.length > 0) {
        console.error('❌ Invalid products found:', invalidProducts)
        addToast({
          title: 'خطا',
          description: `${invalidProducts.length} محصول دارای اطلاعات ناقص است. لطفاً فایل را بررسی کنید.`,
          color: 'danger',
        })
        return
      }

      // Send to API
      const response = await fetch('/api/products/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products: importedProducts }),
      })

      if (response.ok) {
        const result = await response.json()
        mutateProducts()
        addToast({
          title: 'موفقیت',
          description: `${result.count} محصول با موفقیت وارد شدند`,
          color: 'success',
        })

        // Clear file input
        if (event.target) {
          event.target.value = ''
        }
      } else {
        const error = await response.json()
        console.error('API Error:', error)
        addToast({
          title: 'خطا',
          description: error.error || 'خطا در وارد کردن محصولات',
          color: 'danger',
        })
      }
    } catch (error) {
      console.error('Import failed:', error)
      addToast({
        title: 'خطا',
        description: 'خطا در خواندن فایل Excel',
        color: 'danger',
      })
    }
  }

  return {
    fileInputRef,
    exportProducts,
    downloadTemplate,
    handleFileImport,
    handleImportClick,
  }
}
