import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  getAllCategories,
  getCategoryById,
  removeCategory,
} from "./operations";
import { ICategory } from "../../types/types";

interface IInitialState {
  items: ICategory[];
  isLoading: boolean;
  error: Error | any;
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
  reducers: {
    setCurrentCategory(state, action) {
      state.currentCategory = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(
        getAllCategories.fulfilled,
        (state, action: PayloadAction<ICategory[]>) => {
          state.items = action.payload;
        }
      )
      .addCase(
        getCategoryById.fulfilled,
        (state, action: PayloadAction<ICategory>) => {
          state.currentCategory = action.payload;
        }
      )
      .addCase(
        removeCategory.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(({ id }) => id !== action.payload);
        }
      )
      .addMatcher(
        isAnyOf(
          getAllCategories.pending,
          getCategoryById.pending,
          removeCategory.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getAllCategories.rejected,
          getCategoryById.rejected,
          removeCategory.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(
          getAllCategories.fulfilled,
          getCategoryById.fulfilled,
          removeCategory.fulfilled
        ),
        (state) => {
          state.error = null;
          state.isLoading = false;
        }
      ),
});

export const { setCurrentCategory } = categorySlice.actions;
export const categorySliceReducer = categorySlice.reducer;
