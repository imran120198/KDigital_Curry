// src/slices/filterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    product: "",
    material: "",
    grade: "",
  },
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setMaterial: (state, action) => {
      state.material = action.payload;
    },
    setGrade: (state, action) => {
      state.grade = action.payload;
    },
  },
});

export const { setProduct, setMaterial, setGrade } = filterSlice.actions;
export default filterSlice.reducer;
