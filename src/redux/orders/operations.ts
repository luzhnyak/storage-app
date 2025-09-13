import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IOrderProduct } from "../../types/types";
import { BASE_API_URL } from "../../constants";

axios.defaults.baseURL = `${BASE_API_URL}/api/`;

export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios("orders");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getOrderById = createAsyncThunk(
  "orders/getOrderById",
  async (OrderId: number, { rejectWithValue }) => {
    try {
      const { data } = await axios(`orders/${OrderId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`orders`, {
        userId: 1,
        contragentId: 1,
        comment: "test",
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addOrderProduct = createAsyncThunk(
  "orders/addOrderProduct",
  async (
    newOrderProduct: Omit<IOrderProduct, "id" | "name">,
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.put(`orders/${newOrderProduct.orderId}`, {
        productId: newOrderProduct.productId,
        quantity: newOrderProduct.quantity,
        price: newOrderProduct.price,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateOrderProduct = createAsyncThunk(
  "orders/updateOrderProduct",
  async (
    ids: { orderId: number; productId: number; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.patch(
        `orders/${ids.orderId}/${ids.productId}`,
        {
          quantity: ids.quantity,
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeOrderProduct = createAsyncThunk(
  "orders/removeOrderProduct",
  async (ids: { orderId: number; productId: number }, { rejectWithValue }) => {
    try {
      await axios.delete(`orders/${ids.orderId}/${ids.productId}`);

      return ids.productId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeOrder = createAsyncThunk(
  "orders/removeOrder",
  async (OrderId: number, { rejectWithValue }) => {
    try {
      await axios.delete(`orders/${OrderId}`);
      return OrderId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
