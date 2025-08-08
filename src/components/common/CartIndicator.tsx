"use client";
import { useAppSelector } from "../../lib/redux/hooks";

export default function CartIndicator() {
  const { items, totalQuantity, totalAmount } = useAppSelector(
    (state) => state.cart
  );

  return (
    <div className="space-y-4">
      {/* Özet Bilgiler */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Toplam Ürün</h3>
          <p className="text-2xl font-bold text-blue-600">{totalQuantity}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Çeşit Sayısı</h3>
          <p className="text-2xl font-bold text-green-600">{items.length}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Toplam Tutar</h3>
          <p className="text-2xl font-bold text-purple-600">₺{totalAmount}</p>
        </div>
      </div>

      {/* Sepet İçeriği */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3">Sepet İçeriği:</h3>
        {items.length === 0 ? (
          <p className="text-gray-500 italic">Sepet boş</p>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-2 bg-gray-50 rounded"
              >
                <div>
                  <span className="font-medium">{item.name}</span>
                  <span className="text-sm text-gray-500 ml-2">
                    ({item.partNumber})
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-medium">{item.quantity}x</span>
                  <span className="text-green-600 ml-2">
                    ₺{item.totalPrice}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* JSON Debug (Development için) */}
      <details className="bg-gray-100 p-4 rounded-lg">
        <summary className="cursor-pointer font-medium">
          🔍 Debug - Cart State (JSON)
        </summary>
        <pre className="text-xs mt-2 overflow-auto">
          {JSON.stringify({ items, totalQuantity, totalAmount }, null, 2)}
        </pre>
      </details>
    </div>
  );
}
