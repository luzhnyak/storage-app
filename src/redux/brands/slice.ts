import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { getAllBrands, getBrandById, removeBrand } from "./operations";
import { IBrand } from "../../types/index";

interface IInitialState {
  items: IBrand[];
  isLoading: boolean;
  error: any;
  currentBrand: IBrand | null;
}

const initialState: IInitialState = {
  items: [],
  isLoading: false,
  error: null,
  currentBrand: null,
};

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(
        getAllBrands.fulfilled,
        (state, action: PayloadAction<IBrand[]>) => {
          state.items = action.payload;
          state.error = null;
          state.isLoading = false;
        }
      )
      .addCase(
        getBrandById.fulfilled,
        (state, action: PayloadAction<IBrand>) => {
          state.currentBrand = action.payload;
          state.error = null;
          state.isLoading = false;
        }
      )
      .addCase(
        removeBrand.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(({ id }) => id !== action.payload);
          state.error = null;
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          getAllBrands.pending,
          getBrandById.pending,
          removeBrand.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getAllBrands.rejected,
          getBrandById.rejected,
          removeBrand.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      ),
});

export const brandSliceReducer = brandSlice.reducer;
