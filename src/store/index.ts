import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./slice/auth";
import threadReducer from "./slice/thread";
import followReducer from "./slice/follow"

export const store = configureStore({
   reducer: {
      auth: authReducer,
      thread: threadReducer,
      follow: followReducer
   },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
