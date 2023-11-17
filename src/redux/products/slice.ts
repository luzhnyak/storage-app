import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { getAllProducts, getProductById, removeProduct } from "./operations";
import { IProduct } from "../../types/index";

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
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllProducts.fulfilled,
        (state, action: PayloadAction<IProduct[]>) => {
          state.items = action.payload;
          state.error = null;
          state.isLoading = false;
        }
      )
      .addCase(getAllProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getProductById.fulfilled,
        (state, action: PayloadAction<IProduct>) => {
          state.currentProduct = action.payload;
          state.error = null;
          state.isLoading = false;
        }
      )
      .addCase(getProductById.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(removeProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        removeProduct.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(({ id }) => id !== action.payload);
          state.error = null;
          state.isLoading = false;
        }
      )
      .addCase(removeProduct.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      }),
});

export const productSliceReducer = productSlice.reducer;
