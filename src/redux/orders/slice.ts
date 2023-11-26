import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  getAllOrders,
  getOrderById,
  removeOrder,
  addOrder,
  addOrderProduct,
  removeOrderProduct,
} from "./operations";
import { IOrder, IOrderProduct } from "../../types/types";

interface IInitialState {
  items: IOrder[];
  isLoading: boolean;
  error: Error | any;
  currentOrder: IOrder | null;
  // currentOrderItems: IOrderProduct[];
}

const initialState: IInitialState = {
  items: [],
  isLoading: false,
  error: null,
  currentOrder: null,
  // currentOrderItems: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setCurrentOrder(state, action) {
      state.currentOrder = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(
        getAllOrders.fulfilled,
        (state, action: PayloadAction<IOrder[]>) => {
          state.items = action.payload;
        }
      )
      .addCase(
        getOrderById.fulfilled,
        (state, action: PayloadAction<IOrder>) => {
          state.currentOrder = action.payload;
        }
      )
      .addCase(
        removeOrder.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.items = state.items.filter(({ id }) => id !== action.payload);
        }
      )
      .addCase(addOrder.fulfilled, (state, action: PayloadAction<IOrder>) => {
        state.items.push(action.payload);
      })
      .addCase(
        removeOrderProduct.fulfilled,
        (state, action: PayloadAction<number>) => {
          if (
            !state.currentOrder ||
            state.currentOrder.order_products === undefined
          )
            return;

          state.currentOrder.order_products =
            state.currentOrder.order_products.filter(
              ({ id }) => id !== action.payload
            );
        }
      )
      .addCase(
        addOrderProduct.fulfilled,
        (state, action: PayloadAction<IOrderProduct>) => {
          if (state.currentOrder?.order_products) {
            state.currentOrder?.order_products.push(action.payload);
          }
        }
      )
      .addMatcher(
        isAnyOf(
          getAllOrders.pending,
          getOrderById.pending,
          removeOrder.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getAllOrders.rejected,
          getOrderById.rejected,
          removeOrder.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(
          getAllOrders.fulfilled,
          getOrderById.fulfilled,
          removeOrder.fulfilled
        ),
        (state) => {
          state.error = null;
          state.isLoading = false;
        }
      ),
});

export const { setCurrentOrder } = orderSlice.actions;
export const OrderSliceReducer = orderSlice.reducer;
