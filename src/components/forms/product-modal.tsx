'use client'

import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { productSchema } from '@/lib/validations'
import { ProductWithCategory, CategoryWithProducts, ApiResponse } from '@/types'

// Zod schema'dan tip çıkar
type ProductFormData = z.infer<typeof productSchema>

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  product?: ProductWithCategory | null
}

export function ProductModal({ isOpen, onClose, onSuccess, product }: ProductModalProps) {
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<CategoryWithProducts[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const isEditing = !!product

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      categoryId: '',
      isActive: true
    }
  })

  // Kategorileri yükle
  const loadCategories = async () => {
    try {
      setLoadingCategories(true)
      const response = await fetch('/api/categories')
      const data: ApiResponse<CategoryWithProducts[]> = await response.json()

      if (data.success && data.data) {
        // Sadece aktif kategorileri göster
        const activeCategories = data.data.filter(cat => cat.isActive)
        setCategories(activeCategories)
      }
    } catch (error) {
      console.error('Kategoriler yüklenirken hata:', error)
    } finally {
      setLoadingCategories(false)
    }
  }

  // Modal açıldığında kategorileri yükle ve form değerlerini ayarla
  useEffect(() => {
    if (isOpen) {
      loadCategories()
      
      if (product) {
        setValue('name', product.name)
        setValue('description', product.description || '')
        setValue('price', parseFloat(product.price.toString()))
        setValue('stock', product.stock)
        setValue('categoryId', product.categoryId)
        setValue('isActive', product.isActive)
      } else {
        reset({
          name: '',
          description: '',
          price: 0,
          stock: 0,
          categoryId: '',
          isActive: true
        })
      }
    }
  }, [isOpen, product, setValue, reset])

  const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
    setLoading(true)
    try {
      const url = isEditing ? `/api/products/${product.id}` : '/api/products'
      const method = isEditing ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result: ApiResponse = await response.json()

      if (result.success) {
        alert(result.message || `Ürün başarıyla ${isEditing ? 'güncellendi' : 'oluşturuldu'}`)
        onSuccess()
        onClose()
      } else {
        alert(result.error || 'Bir hata oluştu')
      }
    } catch (error) {
      console.error('Form submit error:', error)
      alert('Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            {isEditing ? 'Ürün Düzenle' : 'Yeni Ürün'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <Input
            label="Ürün Adı"
            placeholder="Örn: MacBook Pro 13"
            {...register('name')}
            error={errors.name?.message}
            required
          />

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Açıklama
            </label>
            <textarea
              {...register('description')}
              placeholder="Ürün açıklaması..."
              rows={3}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Fiyat (₺)"
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register('price', { valueAsNumber: true })}
              error={errors.price?.message}
              required
            />

            <Input
              label="Stok"
              type="number"
              placeholder="0"
              {...register('stock', { valueAsNumber: true })}
              error={errors.stock?.message}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Kategori <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              {...register('categoryId')}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Kategori seçin</option>
              {loadingCategories ? (
                <option disabled>Kategoriler yükleniyor...</option>
              ) : (
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))
              )}
            </select>
            {errors.categoryId && (
              <p className="text-sm text-red-600">{errors.categoryId.message}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isActive"
              {...register('isActive')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
              Aktif
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              İptal
            </Button>
            <Button
              type="submit"
              loading={loading}
            >
              {isEditing ? 'Güncelle' : 'Kaydet'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}