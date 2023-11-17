import { RootState } from "../store";

export const selectAllBrands = (state: RootState) => state.brands.items;

export const selectBrand = (state: RootState) => state.brands.currentBrand;
