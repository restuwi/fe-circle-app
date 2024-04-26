import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/app";
import { checkAsync, loginAsync } from "../async/auth";

export interface IAuthState {
    user: IUser | null | undefined;
    token: string,
    loading: boolean
    errorMessage: string
}

const initialState: IAuthState = {
    user: undefined,
    token: "",
    loading: false,
    errorMessage: ""
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_LOGIN: (
            state, action: PayloadAction<{ user: IUser, token: string, message: string}>
        ) => {
            state.user = action.payload.user
            state.token = action.payload.token
            state.errorMessage = action.payload.message
        },
        SET_LOGOUT: (state) => {
            localStorage.removeItem("token")
            state.user = undefined
            state.token = ""
        }
    },
    extraReducers(builder) {
        builder.addCase(loginAsync.pending, (state) => {
            state.token = "";
            state.loading = true
        })

        builder.addCase(loginAsync.fulfilled, (state, action) => {
            state.loading = false
            state.token = action.payload
        })

        builder.addCase(loginAsync.rejected, (state, action) => {
            state.loading = false
            state.user = undefined
            state.token = ""
            state.errorMessage = action.payload as string
        })

        builder.addCase(checkAsync.pending, (state) => {
            state.user = undefined;
            state.loading = true;
        });

        builder.addCase(checkAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        });

        builder.addCase(checkAsync.rejected, (state, action) => {
            state.loading = false;
            state.user = undefined;
            state.token = "";
            state.errorMessage = action.payload as string;
        });
    }

})

export const { SET_LOGIN, SET_LOGOUT } = authSlice.actions;
export default authSlice.reducer;