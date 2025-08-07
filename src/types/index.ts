import { Category, Product } from '@/lib/prisma'

// Prisma modellerinden türetilmiş tipler
export type CategoryWithProducts = Category & {
  products: Product[]
  _count?: {
    products: number
  }
}

export type ProductWithCategory = Product & {
  category: Category
}

// Basit product tipi (dashboard için)
export type SimpleProduct = {
  id: string
  name: string
  isActive: boolean
  stock: number
}

// Form tipler
export type CategoryFormData = {
  name: string
  isActive: boolean
}

// ProductFormData artık zod schema'dan çıkarılacak

// API Response tipler
export type ApiResponse<T = undefined> = {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Sayfalama tipi
export type PaginationParams = {
  page?: number
  limit?: number
  search?: string
}