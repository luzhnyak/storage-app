import { RootState } from "../store";

export const selectAllCategories = (state: RootState) => state.categories.items;

export const selectCategory = (state: RootState) =>
  state.categories.currentCategory;
