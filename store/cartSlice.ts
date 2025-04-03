import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: number;
}

const initialState: CartState = {
  items: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = Math.max(0, state.items - action.payload);
    },
    setItems: (state, action: PayloadAction<number>) => {
      state.items = action.payload;
    },
  },
});

export const { removeItem, setItems } = cartSlice.actions;
export default cartSlice.reducer;
