import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ITransactionProduct } from "../../types/types";
import { BASE_API_URL } from "../../constants";

axios.defaults.baseURL = `${BASE_API_URL}/api/`;

export const getAllTransactions = createAsyncThunk(
  "transactions/getAllTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios("transactions");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getTransactionById = createAsyncThunk(
  "transactions/getTransactionById",
  async (TransactionId: number, { rejectWithValue }) => {
    try {
      const { data } = await axios(`transactions/${TransactionId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`transactions`, {
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

export const addTransactionProduct = createAsyncThunk(
  "transactions/addTransactionProduct",
  async (
    newTransactionProduct: Omit<ITransactionProduct, "id" | "name">,
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.put(
        `transactions/${newTransactionProduct.transactionId}`,
        {
          productId: newTransactionProduct.productId,
          quantity: newTransactionProduct.quantity,
          price: newTransactionProduct.price,
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateTransactionProduct = createAsyncThunk(
  "transactions/updateTransactionProduct",
  async (
    ids: { transactionId: number; productId: number; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.patch(
        `transactions/${ids.transactionId}/${ids.productId}`,
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

export const removeTransactionProduct = createAsyncThunk(
  "transactions/removeTransactionProduct",
  async (
    ids: { transactionId: number; productId: number },
    { rejectWithValue }
  ) => {
    try {
      await axios.delete(`transactions/${ids.transactionId}/${ids.productId}`);

      return ids.productId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeTransaction = createAsyncThunk(
  "transactions/removeTransaction",
  async (TransactionId: number, { rejectWithValue }) => {
    try {
      await axios.delete(`transactions/${TransactionId}`);
      return TransactionId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
