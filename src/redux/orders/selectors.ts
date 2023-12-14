import { RootState } from "../store";

export const selectAllOrders = (state: RootState) => state.orders.items;

export const selectCurrentOrder = (state: RootState) =>
  state.orders.currentOrder;
