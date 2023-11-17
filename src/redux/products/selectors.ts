import { RootState } from "../store";

export const selectAllProducts = (state: RootState) => state.products.items;

export const selectProduct = (state: RootState) =>
  state.products.currentProduct;
