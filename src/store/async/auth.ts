import { createAsyncThunk } from "@reduxjs/toolkit";
import { APILogin, AuthCheck } from "../../libs/api/call/auth";


export const loginAsync = createAsyncThunk(
    "auth/login",
    async (body: { username: string, password: string }, thunkAPI) => {
        try {
            const res = await APILogin(body)
            const token = res.data.token
            localStorage.setItem("token", token)
            return token
        } catch (error) {
            const err = error as unknown as Error
            thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const checkAsync = createAsyncThunk(
    "auth/check",
    async (token: string) => {
        try {
            const res = await AuthCheck(token)
            return res.data.data

        } catch (error) {
            console.log(error);
            
        }
    }
)