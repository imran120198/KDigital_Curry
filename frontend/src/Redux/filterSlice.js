import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    productType: "",
    material: "",
    grade: "",
  },
  reducers: {
    setProductType: (state, action) => {
      state.productType = action.payload;
    },
    setMaterial: (state, action) => {
      state.material = action.payload;
    },
    setGrade: (state, action) => {
      state.grade = action.payload;
    },
  },
});

export const { setProductType, setMaterial, setGrade } = filterSlice.actions;
export default filterSlice.reducer;
