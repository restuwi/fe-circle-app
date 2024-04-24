import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFollowers, getFollowing } from "../../libs/api/call/follow";

export const getFollowersAsync = createAsyncThunk(
    "follow/getFollowers",
    async (followingId: number) => {
        try {
            const res = await getFollowers(followingId)
            return res.data.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const getFollowingAsync = createAsyncThunk(
    "follow/getFollowing",
    async (followerId: number) => {
        try {
            const res = await getFollowing(followerId)
            return res.data.data
        } catch (error) {

        }
    }
)