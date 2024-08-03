// src/slices/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("http://localhost:5000/products");
    return response.json();
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {
    updateProduct: (state, action) => {
      const { id, details } = action.payload;
      const existingProduct = state.products.find(
        (product) => product.id === id
      );
      if (existingProduct) {
        Object.assign(existingProduct, details);
      }
    },
    bulkUpdateProducts: (state, action) => {
      const { ids, details } = action.payload;
      ids.forEach((id) => {
        const existingProduct = state.products.find(
          (product) => product.id === id
        );
        if (existingProduct) {
          Object.assign(existingProduct, details);
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateProduct, bulkUpdateProducts } = productsSlice.actions;
export default productsSlice.reducer;
