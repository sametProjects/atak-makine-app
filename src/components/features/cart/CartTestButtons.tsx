"use client";
import { useAppDispatch } from "../../../lib/redux/hooks";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../../lib/redux/features/cart/cartSlice";

export default function CartTestButtons() {
  const dispatch = useAppDispatch();

  // Test ürünleri
  const testProducts = [
    {
      id: 1,
      name: "Fren Diski",
      partNumber: "BD-12345",
      brand: "Bosch",
      price: 250,
      image: "/images/fren-diski.jpg",
    },
    {
      id: 2,
      name: "Motor Yağı",
      partNumber: "MY-67890",
      brand: "Castrol",
      price: 85,
      image: "/images/motor-yagi.jpg",
    },
    {
      id: 3,
      name: "Amortisör",
      partNumber: "AM-11111",
      brand: "Sachs",
      price: 320,
      image: "/images/amortisör.jpg",
    },
  ];

  const handleAddProduct = (product: (typeof testProducts)[0]) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        partNumber: product.partNumber,
        image: product.image,
      })
    );
  };

  const handleRemoveProduct = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="space-y-6">
      {/* Ürün Ekleme Butonları */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Ürün Ekle:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow border"
            >
              <h4 className="font-medium">{product.name}</h4>
              <p className="text-sm text-gray-500">Kod: {product.partNumber}</p>
              <p className="text-sm text-gray-500">Marka: {product.brand}</p>
              <p className="font-bold text-green-600">₺{product.price}</p>
              <button
                onClick={() => handleAddProduct(product)}
                className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Sepete Ekle
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Miktar Güncelleme Butonları */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Miktar İşlemleri:</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleUpdateQuantity(1, 3)}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Fren Diski → 3 Adet
          </button>
          <button
            onClick={() => handleUpdateQuantity(2, 5)}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Motor Yağı → 5 Adet
          </button>
          <button
            onClick={() => handleUpdateQuantity(3, 1)}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Amortisör → 1 Adet
          </button>
        </div>
      </div>

      {/* Silme İşlemleri */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Silme İşlemleri:</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleRemoveProduct(1)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Fren Diski Sil
          </button>
          <button
            onClick={() => handleRemoveProduct(2)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Motor Yağı Sil
          </button>
          <button
            onClick={() => handleRemoveProduct(3)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Amortisör Sil
          </button>
          <button
            onClick={handleClearCart}
            className="bg-red-800 text-white px-6 py-2 rounded hover:bg-red-900 font-bold"
          >
            Sepeti Tamamen Temizle
          </button>
        </div>
      </div>

      {/* Test Senaryoları */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Hızlı Test Senaryoları:</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              testProducts.forEach((product) => handleAddProduct(product));
            }}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Tüm Ürünleri Ekle
          </button>
          <button
            onClick={() => {
              handleAddProduct(testProducts[0]);
              handleAddProduct(testProducts[0]);
              handleAddProduct(testProducts[1]);
            }}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Mix Test (2 Fren + 1 Yağ)
          </button>
        </div>
      </div>
    </div>
  );
}
