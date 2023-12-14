import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_API_URL } from "../../constants";

axios.defaults.baseURL = `${BASE_API_URL}/api/`;

export const getAllBrands = createAsyncThunk(
  "brands/getAllBrands",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios("brands");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getBrandById = createAsyncThunk(
  "brands/getBrandById",
  async (brandId: number, { rejectWithValue }) => {
    try {
      const { data } = await axios(`brands/${brandId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeBrand = createAsyncThunk(
  "brands/removeBrand",
  async (brandId: number, { rejectWithValue }) => {
    try {
      await axios.delete(`brands/${brandId}`);
      return brandId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
