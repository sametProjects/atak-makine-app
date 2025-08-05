'use client'

import { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { categorySchema } from '@/lib/validations'
import { CategoryWithProducts, ApiResponse } from '@/types'

// Zod schema'dan tip çıkar
type CategoryFormData = z.infer<typeof categorySchema>

interface CategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  category?: CategoryWithProducts | null
}

export function CategoryModal({ isOpen, onClose, onSuccess, category }: CategoryModalProps) {
  const [loading, setLoading] = useState(false)
  const isEditing = !!category

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      isActive: true
    }
  })

  // Modal açıldığında form değerlerini ayarla
  useEffect(() => {
    if (isOpen) {
      if (category) {
        setValue('name', category.name)
        setValue('isActive', category.isActive)
      } else {
        reset({
          name: '',
          isActive: true
        })
      }
    }
  }, [isOpen, category, setValue, reset])

  const onSubmit: SubmitHandler<CategoryFormData> = async (data) => {
    setLoading(true)
    try {
      const url = isEditing ? `/api/categories/${category.id}` : '/api/categories'
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
        alert(result.message || `Kategori başarıyla ${isEditing ? 'güncellendi' : 'oluşturuldu'}`)
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
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            {isEditing ? 'Kategori Düzenle' : 'Yeni Kategori'}
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
            label="Kategori Adı"
            placeholder="Örn: Elektronik"
            {...register('name')}
            error={errors.name?.message}
            required
          />

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