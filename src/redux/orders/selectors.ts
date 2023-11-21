import { RootState } from "../store";

export const selectAllOrders = (state: RootState) => state.orders.items;

export const selectOrder = (state: RootState) => state.orders.currentOrder;
