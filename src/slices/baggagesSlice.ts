import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BaggagesState {
    weight: string; 
}

const initialState: BaggagesState = {
    weight: '', 
};

const baggagesSlice = createSlice({
    name: 'baggages',
    initialState,
    reducers: {
        setWeight(state, action: PayloadAction<string>) {
            state.weight = action.payload;
        },
    },
});

export const { setWeight } = baggagesSlice.actions;
export default baggagesSlice.reducer;