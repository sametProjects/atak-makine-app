import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { productSchema } from '@/lib/validations'
import { ApiResponse } from '@/types'

// GET - Tüm ürünleri listele
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const categoryId = searchParams.get('categoryId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const where = {
      AND: [
        search
          ? {
              OR: [
                { name: { contains: search, mode: 'insensitive' as const } },
                { description: { contains: search, mode: 'insensitive' as const } }
              ]
            }
          : {},
        categoryId ? { categoryId } : {}
      ]
    }

    const [products, total] = await Promise.all([
      db.product.findMany({
        where,
        include: {
          category: true
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit
      }),
      db.product.count({ where })
    ])

    const response: ApiResponse = {
      success: true,
      data: {
        products,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Products GET error:', error)
    const response: ApiResponse = {
      success: false,
      error: 'Ürünler yüklenirken hata oluştu'
    }
    return NextResponse.json(response, { status: 500 })
  }
}

// POST - Yeni ürün oluştur
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validation
    const validatedData = productSchema.parse(body)

    // Kategori var mı kontrol et
    const category = await db.category.findUnique({
      where: { id: validatedData.categoryId }
    })

    if (!category) {
      const response: ApiResponse = {
        success: false,
        error: 'Seçilen kategori bulunamadı'
      }
      return NextResponse.json(response, { status: 400 })
    }

    // Ürün oluştur
    const product = await db.product.create({
      data: validatedData,
      include: {
        category: true
      }
    })

    const response: ApiResponse = {
      success: true,
      data: product,
      message: 'Ürün başarıyla oluşturuldu'
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('Products POST error:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      const response: ApiResponse = {
        success: false,
        error: 'Geçersiz veri formatı'
      }
      return NextResponse.json(response, { status: 400 })
    }

    const response: ApiResponse = {
      success: false,
      error: 'Ürün oluşturulurken hata oluştu'
    }
    return NextResponse.json(response, { status: 500 })
  }
}