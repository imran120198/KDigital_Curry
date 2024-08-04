
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://kdigital-curry-backend.onrender.com/product");
    return response.json();
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
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
      .addCase(fetchProducts.pending, (state) => {})
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { updateProduct, bulkUpdateProducts } = productsSlice.actions;
export default productsSlice.reducer;
