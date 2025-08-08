import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User, Address, UserState } from "../../store";

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  addresses: [],
  orders: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.addresses = [];
      state.orders = [];
    },

    updateUserInfo: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    addAddress: (state, action: PayloadAction<Address>) => {
      state.addresses.push(action.payload);
    },

    updateAddress: (state, action: PayloadAction<Address>) => {
      const { id, ...updatedData } = action.payload;
      const index = state.addresses.findIndex((addr) => addr.id === id);
      if (index !== -1) {
        state.addresses[index] = { ...state.addresses[index], ...updatedData };
      }
    },

    removeAddress: (state, action: PayloadAction<number>) => {
      state.addresses = state.addresses.filter(
        (addr) => addr.id !== action.payload
      );
    },
  },
});

export const {
  loginSuccess,
  logout,
  updateUserInfo,
  addAddress,
  updateAddress,
  removeAddress,
} = userSlice.actions;
export default userSlice.reducer;
