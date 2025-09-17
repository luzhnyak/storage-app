import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  getAllTransactions,
  getTransactionById,
  removeTransaction,
  addTransaction,
  addTransactionProduct,
  removeTransactionProduct,
  updateTransactionProduct,
} from "./operations";
import type { ITransaction, ITransactionProduct } from "../../types/types";

interface IInitialState {
  items: ITransaction[];
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: Error | any;
  currentTransaction: ITransaction | null;
  // currentTransactionItems: ITransactionProduct[];
}

const initialState: IInitialState = {
  items: [],
  isLoading: false,
  error: null,
  currentTransaction: null,
  // currentTransactionItems: [],
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    // setCurrentTransaction(state, action) {
    //   state.currentTransaction = action.payload;
    // },
  },
  extraReducers: (builder) =>
    builder
      .addCase(
        getAllTransactions.fulfilled,
        (state, action: PayloadAction<ITransaction[]>) => {
          state.items = action.payload;
        }
      )
      .addCase(
        getTransactionById.fulfilled,
        (state, action: PayloadAction<ITransaction>) => {
          state.currentTransaction = action.payload;
        }
      )
      .addCase(
        removeTransaction.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(({ id }) => id !== action.payload);
        }
      )
      .addCase(
        addTransaction.fulfilled,
        (state, action: PayloadAction<ITransaction>) => {
          state.items.push(action.payload);
        }
      )
      .addCase(
        removeTransactionProduct.fulfilled,
        (state, action: PayloadAction<number>) => {
          if (
            !state.currentTransaction ||
            state.currentTransaction.transaction_products === undefined
          )
            return;

          state.currentTransaction.transaction_products =
            state.currentTransaction.transaction_products.filter(
              ({ productId }) => productId !== action.payload
            );
        }
      )
      .addCase(
        addTransactionProduct.fulfilled,
        (state, action: PayloadAction<ITransactionProduct>) => {
          if (state.currentTransaction?.transaction_products) {
            state.currentTransaction.transaction_products = [
              // eslint-disable-next-line no-unsafe-optional-chaining
              ...state.currentTransaction?.transaction_products.filter(
                (product) => product.id !== action.payload.id
              ),
              action.payload,
            ];
          }
        }
      )
      .addCase(
        updateTransactionProduct.fulfilled,
        (state, action: PayloadAction<ITransactionProduct>) => {
          if (state.currentTransaction?.transaction_products) {
            const foundProduct =
              state.currentTransaction.transaction_products.find(
                (product) => product.id === action.payload.id
              );

            if (foundProduct) {
              foundProduct.quantity = action.payload.quantity;
            }
          }
        }
      )
      .addMatcher(
        isAnyOf(
          getAllTransactions.pending,
          getTransactionById.pending,
          removeTransaction.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getAllTransactions.rejected,
          getTransactionById.rejected,
          removeTransaction.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(
          getAllTransactions.fulfilled,
          getTransactionById.fulfilled,
          removeTransaction.fulfilled
        ),
        (state) => {
          state.error = null;
          state.isLoading = false;
        }
      ),
});

// export const { setCurrentTransaction } = transactionSlice.actions;
export const TransactionSliceReducer = transactionSlice.reducer;
