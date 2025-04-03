import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./reducers/alert.reducer";
import { NODE_ENV } from "../utils/constants";
import cartSlice from "./cartSlice";

const store = configureStore({
  reducer: {
    alert: alertReducer,
    cart: cartSlice,
  },
  devTools: NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
