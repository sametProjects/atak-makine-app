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

// Form tipler
export type CategoryFormData = {
  name: string
  isActive: boolean
}

export type ProductFormData = {
  name: string
  description?: string
  price: number
  stock: number
  categoryId: string
  isActive: boolean
}

// API Response tipler
export type ApiResponse<T = unknown> = {
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