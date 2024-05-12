import { createAsyncThunk } from "@reduxjs/toolkit";
import { APILogin, AuthCheck } from "../../libs/api/call/auth";
import { AxiosError } from "axios";

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (body: { username: string; password: string }, thunkAPI) => {
    try {
      const res = await APILogin(body);
      const token = res.data.token;
      localStorage.setItem("token", token);
      return token;
    } catch (error) {
      const err = error as unknown as AxiosError;
      const { message } = err.response?.data as { message: string };
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const checkAsync = createAsyncThunk(
  "auth/check",
  async (token: string, thunkAPI) => {
    try {
      const res = await AuthCheck(token);
      return res.data.data;
    } catch (error) {
      const err = error as unknown as Error;
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
