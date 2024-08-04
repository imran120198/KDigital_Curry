import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import filterReducer from "./filterSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filter: filterReducer,
  },
});
