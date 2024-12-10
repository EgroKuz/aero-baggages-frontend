import { configureStore } from '@reduxjs/toolkit';
import baggagesReducer from './slices/baggagesSlice';

const store = configureStore({
    reducer: {
        baggages: baggagesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;