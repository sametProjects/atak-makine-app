'use client'

import { useState, useEffect } from 'react'
import { Package, Tag, ShoppingCart, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SimpleProduct } from '@/types'

interface DashboardStats {
  totalProducts: number
  totalCategories: number
  activeProducts: number
  lowStockProducts: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalCategories: 0,
    activeProducts: 0,
    lowStockProducts: 0
  })
  const [loading, setLoading] = useState(true)

  const loadStats = async () => {
    try {
      setLoading(true)
      
      // Kategoriler ve ürünleri paralel olarak yükle
      const [categoriesRes, productsRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/products?limit=1000') // Tüm ürünleri al
      ])

      const [categoriesData, productsData] = await Promise.all([
        categoriesRes.json(),
        productsRes.json()
      ])

      if (categoriesData.success && productsData.success) {
        const products: SimpleProduct[] = productsData.data?.products || []
        const categories = categoriesData.data || []

        setStats({
          totalProducts: products.length,
          totalCategories: categories.length,
          activeProducts: products.filter((p: SimpleProduct) => p.isActive).length,
          lowStockProducts: products.filter((p: SimpleProduct) => p.stock <= 10).length
        })
      }
    } catch (error) {
      console.error('İstatistikler yüklenirken hata:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStats()
  }, [])

  const statCards = [
    {
      title: 'Toplam Ürün',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-blue-500',
      link: '/admin/products'
    },
    {
      title: 'Toplam Kategori', 
      value: stats.totalCategories,
      icon: Tag,
      color: 'bg-green-500',
      link: '/admin/categories'
    },
    {
      title: 'Aktif Ürünler',
      value: stats.activeProducts,
      icon: ShoppingCart,
      color: 'bg-purple-500',
      link: '/admin/products'
    },
    {
      title: 'Düşük Stok',
      value: stats.lowStockProducts,
      icon: AlertTriangle,
      color: 'bg-red-500',
      link: '/admin/products'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Atak Makine yönetim paneline hoş geldiniz</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.title} href={stat.link}>
              <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <dt>
                  <div className={`absolute ${stat.color} rounded-md p-3`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                    {stat.title}
                  </p>
                </dt>
                <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                  <p className="text-2xl font-semibold text-gray-900">
                    {loading ? '...' : stat.value}
                  </p>
                </dd>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Hızlı İşlemler</h3>
        </div>
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link href="/admin/categories">
              <Button variant="outline" className="w-full justify-start">
                <Tag className="w-4 h-4 mr-2" />
                Kategori Yönetimi
              </Button>
            </Link>
            <Link href="/admin/products">
              <Button variant="outline" className="w-full justify-start">
                <Package className="w-4 h-4 mr-2" />
                Ürün Yönetimi  
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Son Aktiviteler</h3>
        </div>
        <div className="px-6 py-4">
          <p className="text-gray-500 text-center py-8">
            Son aktivite özelliği gelecek güncellemelerde eklenecek
          </p>
        </div>
      </div>
    </div>
  )
}