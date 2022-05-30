import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import productReducer from "../features/product/productSlice";
import searchReducer from "../features/Search/searchSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    search: searchReducer,
  },
});
