import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types";

type CartItem = { product: Product; quantity: number };

type CartState = { items: CartItem[]; shipping: number };
const initialState: CartState = { items: [], shipping: 120 };

const findIndex = (items: CartItem[], id: string) =>
  items.findIndex((i) => i.product._id === id);

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; quantity?: number }>
    ) => {
      const { product, quantity = 1 } = action.payload;
      const idx = findIndex(state.items, product._id);
      if (idx === -1)
        state.items.push({
          product,
          quantity: Math.min(quantity, product.stock),
        });
      else
        state.items[idx].quantity = Math.min(
          state.items[idx].quantity + quantity,
          product.stock
        );
    },
    setQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const idx = findIndex(state.items, action.payload.id);
      if (idx !== -1) {
        const stock = state.items[idx].product.stock;
        state.items[idx].quantity = Math.min(
          Math.max(action.payload.quantity, 1),
          stock
        );
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.product._id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    setShipping: (state, action: PayloadAction<number>) => {
      state.shipping = action.payload;
    },
  },
});

export const {
  addToCart,
  setQuantity,
  removeFromCart,
  clearCart,
  setShipping,
} = slice.actions;
export default slice.reducer;
