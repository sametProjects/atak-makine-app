import Link from 'next/link'
import { Package, Tag, ShoppingCart, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Atak Makine
              </h1>
            </div>
            <nav className="flex space-x-4">
              <Link href="/admin/categories">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Admin Panel
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Atak Makine
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-blue-200 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Modern e-ticaret yönetim sistemi. Ürünlerinizi ve kategorilerinizi kolayca yönetin.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <Link href="/admin/categories">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Admin Panele Git
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Özellikler</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Güçlü Yönetim Paneli
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Next.js, Prisma ORM ve PostgreSQL ile geliştirilmiş modern CRUD sistemi.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Tag className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Kategori Yönetimi</p>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Ürün kategorilerini ekleyin, düzenleyin ve yönetin. Aktif/pasif durumlarını kontrol edin.
                </dd>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Package className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Ürün Yönetimi</p>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Ürünleri ekleyin, fiyatlarını belirleyin, stok takibi yapın ve kategorilere atayın.
                </dd>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <ShoppingCart className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Stok Takibi</p>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Gerçek zamanlı stok durumu, düşük stok uyarıları ve envanter yönetimi.
                </dd>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Settings className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Kolay Yönetim</p>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Kullanıcı dostu arayüz ile tüm işlemlerinizi kolayca gerçekleştirin.
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Hemen başlayın!</span>
            <span className="block text-blue-600">Admin paneline göz atın.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link href="/admin/categories">
                <Button size="lg">
                  Kategoriler
                </Button>
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link href="/admin/products">
                <Button variant="outline" size="lg">
                  Ürünler
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}