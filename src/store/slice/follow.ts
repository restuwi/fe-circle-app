import { createSlice } from "@reduxjs/toolkit";
import { IFollows} from "../../types/app";
import { getFollowersAsync, getFollowingAsync } from "../async/follow";

interface IFollowsState {
    followers: IFollows[],
    following: IFollows[]
    loading: boolean
}


const initialState: IFollowsState = {
    followers: [],
    following: [],
    loading: false
}


const followSlice = createSlice({
    name: "follow",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getFollowersAsync.fulfilled, (state, action) => {
            state.followers = action.payload
        })

        builder.addCase(getFollowersAsync.pending, (state) => {
            state.followers = []
            state.loading = true
        })

        builder.addCase(getFollowingAsync.fulfilled, (state, action) => {
            state.following = action.payload
        })

        builder.addCase(getFollowingAsync.pending, (state) => {
            state.loading = true
        })
    }
})

export default followSlice.reducer
