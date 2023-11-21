import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { getAllProducts, getProductById, removeProduct } from "./operations";
import { IProduct } from "../../types/types";

interface IInitialState {
  items: IProduct[];
  isLoading: boolean;
  error: any;
  currentProduct: IProduct | null;
}

const initialState: IInitialState = {
  items: [],
  isLoading: false,
  error: null,
  currentProduct: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCurrentProduct(state, action) {
      state.currentProduct = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(
        getAllProducts.fulfilled,
        (state, action: PayloadAction<IProduct[]>) => {
          state.items = action.payload;
        }
      )
      .addCase(
        getProductById.fulfilled,
        (state, action: PayloadAction<IProduct>) => {
          state.currentProduct = action.payload;
        }
      )
      .addCase(
        removeProduct.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(({ id }) => id !== action.payload);
        }
      )
      .addMatcher(
        isAnyOf(
          getAllProducts.pending,
          getProductById.pending,
          removeProduct.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getAllProducts.rejected,
          getProductById.rejected,
          removeProduct.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(
          getAllProducts.fulfilled,
          getProductById.fulfilled,
          removeProduct.fulfilled
        ),
        (state) => {
          state.error = null;
          state.isLoading = false;
        }
      ),
});

export const { setCurrentProduct } = productSlice.actions;
export const productSliceReducer = productSlice.reducer;
