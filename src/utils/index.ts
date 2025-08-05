import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Tailwind CSS sınıflarını birleştirmek için
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Para formatı için
export function formatPrice(price: number | string): string {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(numPrice)
}

// Tarih formatı için
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(dateObj)
}

// Stok durumu kontrolü
export function getStockStatus(stock: number): {
  status: 'in-stock' | 'low-stock' | 'out-of-stock'
  label: string
  color: string
} {
  if (stock === 0) {
    return {
      status: 'out-of-stock',
      label: 'Stokta Yok',
      color: 'text-red-600 bg-red-50'
    }
  } else if (stock <= 10) {
    return {
      status: 'low-stock', 
      label: 'Az Stok',
      color: 'text-yellow-600 bg-yellow-50'
    }
  } else {
    return {
      status: 'in-stock',
      label: 'Stokta Var',
      color: 'text-green-600 bg-green-50'
    }
  }
}