import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import productsReducer from "./features/products/productsSlice";
import userReducer from "./features/user/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      products: productsReducer,
      user: userReducer,
    },
  });
};

// Store Types
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// Data Types (Tüm interface'leri burada tanımlıyoruz)
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
  partNumber: string;
  image: string;
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

export interface Product {
  id: number;
  name: string;
  partNumber: string;
  brand: string;
  price: number;
  category: string;
  image: string;
  description?: string;
  stock?: number;
}

export interface ProductFilters {
  category: string;
  brand: string;
  priceRange: [number, number];
  searchTerm: string;
}

export interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
  filters: ProductFilters;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

export interface Address {
  id: number;
  title: string;
  address: string;
  city: string;
  district: string;
  postalCode: string;
  isDefault: boolean;
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  addresses: Address[];
  orders: any[];
}
