import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch(
      "https://kdigital-curry-backend.onrender.com/product"
    );
    return response.json();
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, details }) => {
    const response = await fetch(
      `https://kdigital-curry-backend.onrender.com/product/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update product");
    }
    return { id, details };
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    error: null,
    limit: 5,
  },
  reducers: {
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
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

export const { addProduct, setLimit, bulkUpdateProducts } =
  productsSlice.actions;
export default productsSlice.reducer;
