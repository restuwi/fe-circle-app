import { createSlice } from "@reduxjs/toolkit";
import { IThread } from "../../types/app";
import { getThreadsAsync } from "../async/thread";

interface IThreadState {
    threads: IThread[]
    loading: boolean
} 

const initialState: IThreadState = {
    threads: [],
    loading: false
}

const threadSlice = createSlice({
    name: "thread",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getThreadsAsync.fulfilled, (state, action) => {
            state.threads = action.payload
            state.loading = false
        })

        builder.addCase(getThreadsAsync.pending, (state) => {
            state.threads = [],
            state.loading = true
        })
    }
})

export default threadSlice.reducer