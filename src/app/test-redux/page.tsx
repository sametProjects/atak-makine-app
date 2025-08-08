"use client";
import { CartTestButtons } from "../../components/features/cart";
import { CartIndicator } from "../../components/common";

export default function TestReduxPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Redux State Test</h1>

      {/* Sepet Göstergesi */}
      <div className="mb-8 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Sepet Durumu:</h2>
        <CartIndicator />
      </div>

      {/* Test Butonları */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Test İşlemleri:</h2>
        <CartTestButtons />
      </div>
    </div>
  );
}
