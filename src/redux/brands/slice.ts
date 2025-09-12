import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { getAllBrands, getBrandById, removeBrand } from "./operations";
import type { IBrand } from "../../types/types";

interface IInitialState {
  items: IBrand[];
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: Error | any;
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
        }
      )
      .addCase(
        getBrandById.fulfilled,
        (state, action: PayloadAction<IBrand>) => {
          state.currentBrand = action.payload;
        }
      )
      .addCase(
        removeBrand.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(({ id }) => id !== action.payload);
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
      )
      .addMatcher(
        isAnyOf(
          getAllBrands.fulfilled,
          getBrandById.fulfilled,
          removeBrand.fulfilled
        ),
        (state) => {
          state.error = null;
          state.isLoading = false;
        }
      ),
});

export const brandSliceReducer = brandSlice.reducer;
