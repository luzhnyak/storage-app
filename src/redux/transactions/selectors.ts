import type { RootState } from "../store";

export const selectAllTransactions = (state: RootState) =>
  state.transactions.items;

export const selectCurrentTransaction = (state: RootState) =>
  state.transactions.currentTransaction;
