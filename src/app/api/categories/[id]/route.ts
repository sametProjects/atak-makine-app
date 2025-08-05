import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { categorySchema } from '@/lib/validations'
import { ApiResponse } from '@/types'

type Params = {
  params: {
    id: string
  }
}

// GET - Tek kategori getir
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const category = await db.category.findUnique({
      where: { id: params.id },
      include: {
        products: true,
        _count: {
          select: { products: true }
        }
      }
    })

    if (!category) {
      const response: ApiResponse = {
        success: false,
        error: 'Kategori bulunamadı'
      }
      return NextResponse.json(response, { status: 404 })
    }

    const response: ApiResponse = {
      success: true,
      data: category
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Category GET error:', error)
    const response: ApiResponse = {
      success: false,
      error: 'Kategori yüklenirken hata oluştu'
    }
    return NextResponse.json(response, { status: 500 })
  }
}

// PUT - Kategori güncelle
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const body = await request.json()
    const validatedData = categorySchema.parse(body)

    // Kategori var mı kontrol et
    const existingCategory = await db.category.findUnique({
      where: { id: params.id }
    })

    if (!existingCategory) {
      const response: ApiResponse = {
        success: false,
        error: 'Kategori bulunamadı'
      }
      return NextResponse.json(response, { status: 404 })
    }

    // Aynı isimde başka kategori var mı kontrol et
    if (validatedData.name !== existingCategory.name) {
      const duplicateCategory = await db.category.findUnique({
        where: { name: validatedData.name }
      })

      if (duplicateCategory) {
        const response: ApiResponse = {
          success: false,
          error: 'Bu isimde bir kategori zaten mevcut'
        }
        return NextResponse.json(response, { status: 400 })
      }
    }

    // Kategori güncelle
    const updatedCategory = await db.category.update({
      where: { id: params.id },
      data: validatedData,
      include: {
        _count: {
          select: { products: true }
        }
      }
    })

    const response: ApiResponse = {
      success: true,
      data: updatedCategory,
      message: 'Kategori başarıyla güncellendi'
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Category PUT error:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      const response: ApiResponse = {
        success: false,
        error: 'Geçersiz veri formatı'
      }
      return NextResponse.json(response, { status: 400 })
    }

    const response: ApiResponse = {
      success: false,
      error: 'Kategori güncellenirken hata oluştu'
    }
    return NextResponse.json(response, { status: 500 })
  }
}

// DELETE - Kategori sil
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    // Kategori var mı ve ürünleri var mı kontrol et
    const category = await db.category.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { products: true }
        }
      }
    })

    if (!category) {
      const response: ApiResponse = {
        success: false,
        error: 'Kategori bulunamadı'
      }
      return NextResponse.json(response, { status: 404 })
    }

    // Kategoride ürün varsa silmeye izin verme
    if (category._count.products > 0) {
      const response: ApiResponse = {
        success: false,
        error: 'Bu kategoride ürünler bulunduğu için silinemez'  
      }
      return NextResponse.json(response, { status: 400 })
    }

    // Kategori sil
    await db.category.delete({
      where: { id: params.id }
    })

    const response: ApiResponse = {
      success: true,
      message: 'Kategori başarıyla silindi'
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Category DELETE error:', error)
    const response: ApiResponse = {
      success: false,
      error: 'Kategori silinirken hata oluştu'
    }
    return NextResponse.json(response, { status: 500 })
  }
}