import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  getAllCategories,
  getCategoryById,
  removeCategory,
} from "./operations";
import { ICategory } from "../../types/index";

interface IInitialState {
  items: ICategory[];
  isLoading: boolean;
  error: any;
  currentCategory: ICategory | null;
}

const initialState: IInitialState = {
  items: [],
  isLoading: false,
  error: null,
  currentCategory: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllCategories.fulfilled,
        (state, action: PayloadAction<ICategory[]>) => {
          state.items = action.payload;
          state.error = null;
          state.isLoading = false;
        }
      )
      .addCase(getAllCategories.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getCategoryById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getCategoryById.fulfilled,
        (state, action: PayloadAction<ICategory>) => {
          state.currentCategory = action.payload;
          state.error = null;
          state.isLoading = false;
        }
      )
      .addCase(getCategoryById.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(removeCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        removeCategory.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(({ id }) => id !== action.payload);
          state.error = null;
          state.isLoading = false;
        }
      )
      .addCase(removeCategory.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      }),
});

export const categorySliceReducer = categorySlice.reducer;
