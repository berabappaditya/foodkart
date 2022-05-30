import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResult: [],
  isLoading: true,
};
export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchFetch: (state, action) => {
      const searchString = action.payload.searchString;
      const ProductItem = action.payload.productItem;
      state.searchResult = ProductItem.filter((item) => {
        return item.title.toLowerCase().includes(searchString.toLowerCase());
      });
      state.isLoading = false;
    },
  },
});
export const { searchFetch } = searchSlice.actions;
export default searchSlice.reducer;
