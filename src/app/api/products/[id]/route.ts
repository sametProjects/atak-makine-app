import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { productSchema } from '@/lib/validations'
import { ApiResponse } from '@/types'

type Params = {
  params: {
    id: string
  }
}

// GET - Tek ürün getir
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const product = await db.product.findUnique({
      where: { id: params.id },
      include: {
        category: true
      }
    })

    if (!product) {
      const response: ApiResponse = {
        success: false,
        error: 'Ürün bulunamadı'
      }
      return NextResponse.json(response, { status: 404 })
    }

    const response: ApiResponse = {
      success: true,
      data: product
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Product GET error:', error)
    const response: ApiResponse = {
      success: false,
      error: 'Ürün yüklenirken hata oluştu'
    }
    return NextResponse.json(response, { status: 500 })
  }
}

// PUT - Ürün güncelle
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const body = await request.json()
    const validatedData = productSchema.parse(body)

    // Ürün var mı kontrol et
    const existingProduct = await db.product.findUnique({
      where: { id: params.id }
    })

    if (!existingProduct) {
      const response: ApiResponse = {
        success: false,
        error: 'Ürün bulunamadı'
      }
      return NextResponse.json(response, { status: 404 })
    }

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

    // Ürün güncelle
    const updatedProduct = await db.product.update({
      where: { id: params.id },
      data: validatedData,
      include: {
        category: true
      }
    })

    const response: ApiResponse = {
      success: true,
      data: updatedProduct,
      message: 'Ürün başarıyla güncellendi'
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Product PUT error:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      const response: ApiResponse = {
        success: false,
        error: 'Geçersiz veri formatı'
      }
      return NextResponse.json(response, { status: 400 })
    }

    const response: ApiResponse = {
      success: false,
      error: 'Ürün güncellenirken hata oluştu'
    }
    return NextResponse.json(response, { status: 500 })
  }
}

// DELETE - Ürün sil
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    // Ürün var mı kontrol et
    const product = await db.product.findUnique({
      where: { id: params.id }
    })

    if (!product) {
      const response: ApiResponse = {
        success: false,
        error: 'Ürün bulunamadı'
      }
      return NextResponse.json(response, { status: 404 })
    }

    // Ürün sil
    await db.product.delete({
      where: { id: params.id }
    })

    const response: ApiResponse = {
      success: true,
      message: 'Ürün başarıyla silindi'
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Product DELETE error:', error)
    const response: ApiResponse = {
      success: false,
      error: 'Ürün silinirken hata oluştu'
    }
    return NextResponse.json(response, { status: 500 })
  }
}