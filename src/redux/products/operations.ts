import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://storage-api-hpsd.onrender.com/api/";

interface IQuery {
  category_id: number;
  page: number;
}

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (query: IQuery, { rejectWithValue }) => {
    try {
      const { data } = await axios(
        `products?category_id=${query.category_id}&page=0`
      );
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
      await axios.delete(`products/${productId}`);
      return productId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
