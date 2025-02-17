import { configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import baggagesReducer from "./slices/baggagesSlice.ts";
import userReducer from "./slices/userSlice";
import transfersReducer from "./slices/transfersSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const store = configureStore({
    reducer: {
        baggages: baggagesReducer,
        user: userReducer,
        transfers: transfersReducer
    }
});
export type AppThunkDispatch = ThunkDispatch<RootState, never, never>
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;