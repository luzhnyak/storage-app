import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_API_URL } from "../../constants";

axios.defaults.baseURL = `${BASE_API_URL}/api/`;

export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios("categories");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCategoryById = createAsyncThunk(
  "categories/getCategoryById",
  async (categoryId: number, { rejectWithValue }) => {
    try {
      const { data } = await axios(`categories/${categoryId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeCategory = createAsyncThunk(
  "categories/removeCategory",
  async (categoryId: number, { rejectWithValue }) => {
    try {
      await axios.delete(`categories/${categoryId}`);
      return categoryId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
