import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const url = "https://api4286.s3.ap-south-1.amazonaws.com/products.json";
const initialState = {
  productItem: [],
  isLoading: true,
};

export const getProductItems = createAsyncThunk(
  "product/getProductItems",
  async () => {
    return fetch(url)
      .then((resp) => {
        return resp.json();
      })
      .catch((err) => console.log(err));
  }
);
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    //     addToCart: (state, action) => {
    productFilter: (state, action) => {
      console.log("productFilter" + action.payload);
      state.productItem = state.productItem.filter(
        (item) => item.type === action.payload
      );
    },
  },
  extraReducers: {
    [getProductItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getProductItems.fulfilled]: (state, action) => {
      state.productItem = action.payload;
      state.isLoading = false;
    },
    [getProductItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});
export const { productFilter } = productSlice.actions;
export default productSlice.reducer;
