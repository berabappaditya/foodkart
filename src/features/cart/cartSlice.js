import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let itemObj = action.payload;
      itemObj = {
        ...itemObj,
        quantity: 1,
      };
      state.cartItem.push(itemObj);
      state.amount += 1;
      state.total += action.payload.price;
    },
    removeFromCart: (state, action) => {
      let price = 0;
      let quantity = 0;
      state.cartItem = state.cartItem.filter((item) => {
        if (item.id === action.payload) {
          price = item.price;
          quantity = item.quantity;
        }
        return item.id !== action.payload;
      });
      state.amount -= quantity;
      state.total -= price * quantity;
    },
    removeAllFromCart: (state) => {
      state.cartItem = [];
      state.amount = 0;
      state.total = 0;
    },
    increaseQuantity: (state, action) => {
      state.cartItem.map((item) => {
        if (item.id === action.payload.id) {
          item.quantity += 1;
        }
        return "";
      });
      state.amount += 1;
      state.total += action.payload.price;
    },
    decreaseQuantity: (state, action) => {
      state.cartItem.map((item) => {
        if (item.id === action.payload.id) {
          item.quantity -= 1;
        }
        return "";
      });
      state.amount -= 1;
      state.total -= action.payload.price;
    },
  },
  // extraReducers: {
  //     [addToCart.pending]: (state, action) => {
  //         state.isLoading = true;
  //     },
  //     [addToCart.fulfilled]: (state, action) => {
  //         state.isLoading = false;
  //     }
});
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
