import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { categorySchema } from '@/lib/validations'
import { ApiResponse } from '@/types'

// GET - Tüm kategorileri listele
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const includeProducts = searchParams.get('includeProducts') === 'true'

    const categories = await db.category.findMany({
      where: search
        ? {
            name: {
              contains: search,
              mode: 'insensitive'
            }
          }
        : undefined,
      include: includeProducts
        ? {
            products: true,
            _count: {
              select: { products: true }
            }
          }
        : {
            _count: {
              select: { products: true }
            }
          },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const response: ApiResponse = {
      success: true,
      data: categories
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Categories GET error:', error)
    const response: ApiResponse = {
      success: false,
      error: 'Kategoriler yüklenirken hata oluştu'
    }
    return NextResponse.json(response, { status: 500 })
  }
}

// POST - Yeni kategori oluştur
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validation
    const validatedData = categorySchema.parse(body)

    // Aynı isimde kategori var mı kontrol et
    const existingCategory = await db.category.findUnique({
      where: { name: validatedData.name }
    })

    if (existingCategory) {
      const response: ApiResponse = {
        success: false,
        error: 'Bu isimde bir kategori zaten mevcut'
      }
      return NextResponse.json(response, { status: 400 })
    }

    // Kategori oluştur
    const category = await db.category.create({
      data: validatedData,
      include: {
        _count: {
          select: { products: true }
        }
      }
    })

    const response: ApiResponse = {
      success: true,
      data: category,
      message: 'Kategori başarıyla oluşturuldu'
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('Categories POST error:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      const response: ApiResponse = {
        success: false,
        error: 'Geçersiz veri formatı'
      }
      return NextResponse.json(response, { status: 400 })
    }

    const response: ApiResponse = {
      success: false,
      error: 'Kategori oluşturulurken hata oluştu'
    }
    return NextResponse.json(response, { status: 500 })
  }
}