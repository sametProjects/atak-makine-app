import { z } from 'zod'

// Kategori validation şeması
export const categorySchema = z.object({
  name: z
    .string()
    .min(2, 'Kategori adı en az 2 karakter olmalıdır')
    .max(50, 'Kategori adı en fazla 50 karakter olabilir')
    .trim(),
  isActive: z.boolean()
})

// Ürün validation şeması  
export const productSchema = z.object({
  name: z
    .string()
    .min(2, 'Ürün adı en az 2 karakter olmalıdır')
    .max(100, 'Ürün adı en fazla 100 karakter olabilir')
    .trim(),
  description: z
    .string()
    .max(500, 'Açıklama en fazla 500 karakter olabilir')
    .optional()
    .or(z.literal('')),
  price: z
    .number()
    .min(0.01, 'Fiyat 0.01 TL\'den büyük olmalıdır')
    .max(999999.99, 'Fiyat çok yüksek'),
  stock: z
    .number()
    .int('Stok sayısı tam sayı olmalıdır')
    .min(0, 'Stok negatif olamaz'),
  categoryId: z
    .string()
    .min(1, 'Kategori seçimi zorunludur'),
  isActive: z.boolean()
})

// API parametreleri için validation
export const paginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
  search: z.string().optional()
})