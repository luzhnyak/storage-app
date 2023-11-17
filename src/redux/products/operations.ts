import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://storage-api-hpsd.onrender.com/api/";

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios("products");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (productId: number, { rejectWithValue }) => {
    try {
      const { data } = await axios(`products/${productId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async (productId: number, { rejectWithValue }) => {
    try {
      await axios.delete(`categories/${productId}`);
      return productId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
