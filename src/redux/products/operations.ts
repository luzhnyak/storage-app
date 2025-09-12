import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IQueryProducts } from "../../types/types";
import { BASE_API_URL } from "../../constants";

axios.defaults.baseURL = `${BASE_API_URL}/api/`;

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (query: IQueryProducts, { rejectWithValue }) => {
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
