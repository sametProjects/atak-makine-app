import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Product, ProductState, ProductFilters } from "../../store";

// API response type
interface FetchProductsResponse {
  products: Product[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export const fetchProducts = createAsyncThunk<
  FetchProductsResponse,
  Partial<ProductFilters>
>("products/fetchProducts", async (filters = {}) => {
  const queryParams = new URLSearchParams(filters as Record<string, string>);
  const response = await fetch(`/api/products?${queryParams}`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
});

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
  filters: {
    category: "",
    brand: "",
    priceRange: [0, 10000],
    searchTerm: "",
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<ProductFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.currentPage = 1;
    },

    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },

    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination.currentPage = 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          totalItems: action.payload.totalItems,
        };
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export const { setFilters, setCurrentPage, clearFilters } =
  productsSlice.actions;
export default productsSlice.reducer;
