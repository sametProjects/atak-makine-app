"use client";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "@/lib/redux/features/cart/cartSlice";

export default function Cart() {
  const { items, totalQuantity, totalAmount } = useAppSelector(
    (state) => state.cart
  );
  const dispatch = useAppDispatch();

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  return (
    <div className="cart">
      <h2>Sepetim ({totalQuantity} ürün)</h2>
      {items.map((item) => (
        <div key={item.id} className="cart-item">
          <h3>{item.name}</h3>
          <p>Parça Kodu: {item.partNumber}</p>
          <div>
            <button
              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
            >
              +
            </button>
          </div>
          <p>₺{item.totalPrice}</p>
          <button onClick={() => handleRemoveItem(item.id)}>Kaldır</button>
        </div>
      ))}
      <div>
        <h3>Toplam: ₺{totalAmount}</h3>
        <button onClick={() => dispatch(clearCart())}>Sepeti Temizle</button>
      </div>
    </div>
  );
}
