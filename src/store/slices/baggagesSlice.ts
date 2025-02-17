import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { T_Baggage, T_BaggagesListResponse } from "../../modules/types.ts";
import  {saveTransfer}  from "./transfersSlice.ts";
import { api } from "../../api";
import { useSelector } from 'react-redux';
import { AxiosResponse } from "axios";
import { RootState } from "../store";
import { BAGGAGES_MOCK } from "../../modules/mock";

type T_BaggagesSlice = {
    weight: number;
    selectedBaggage: null | T_Baggage;
    baggages: T_Baggage[];
};

const initialState: T_BaggagesSlice = {
    weight: 0,
    selectedBaggage: null,
    baggages: [],
};


export const getBaggageById = createAsyncThunk<T_Baggage, string, { state: RootState }>(
"fetch_baggage",
async (id, { rejectWithValue }) => {
  try {
    const response = await api.baggages.baggagesRead(id);
    return response.data;
  } catch (error) {

    const mockBaggage = BAGGAGES_MOCK.baggages.find((baggage) => String(baggage.id) === id) as T_Baggage;
    if (mockBaggage) {
      return rejectWithValue(mockBaggage);
    }
    throw error;
  }
}
);


export const getBaggagesByWeight = createAsyncThunk<T_Baggage[], object, { state: RootState }>(
"fetch_baggages",
async function(_, thunkAPI) {
  const state = thunkAPI.getState() as RootState;
  const response = await api.baggages.baggagesList({
    baggage_weight: String(state.baggages.weight)
  }) as unknown as AxiosResponse<T_BaggagesListResponse>;

  thunkAPI.dispatch(saveTransfer({
    draft_transfer: response.data.draft_transfer,
    baggages_to_transfer: response.data.baggages_to_transfer
  }));

  return response.data.baggages;
}
);

export const addBaggageToTransfer = createAsyncThunk<void, string, { state: RootState }>(
  "baggages/add_baggage_to_transfer",
  async function (baggage_id, { getState, rejectWithValue }) {
    const state = getState();
    const token = state.user.token;

    try {
      await api.baggages.baggagesAddToTransferCreate(baggage_id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      return rejectWithValue("Ошибка при добавлении багажа в трансфер");
    }
  }
);


const baggagesSlice = createSlice({
  name: 'baggages',
  initialState: initialState,
  reducers: {
      setWeight: (state, action) => {
          state.weight = action.payload;
      },
      removeSelectedBaggage: (state) => {
          state.selectedBaggage = null;
      }
  },
  extraReducers: (builder) => {
      builder.addCase(getBaggagesByWeight.fulfilled, (state: T_BaggagesSlice, action: PayloadAction<T_Baggage[]>) => {
          state.baggages = action.payload;
      });
      builder.addCase(getBaggageById.fulfilled, (state: T_BaggagesSlice, action: PayloadAction<T_Baggage>) => {
          state.selectedBaggage = action.payload;
      });
      builder.addCase(getBaggageById.rejected, (state, action) => {
          if (action.payload && typeof action.payload === "object") {
            state.selectedBaggage = action.payload as T_Baggage;
          } else {
            state.selectedBaggage = null;
          }
        });
  }
});

export const useWeight = () => useSelector((state: RootState) => state.baggages.weight);

export const { setWeight, removeSelectedBaggage } = baggagesSlice.actions;

export default baggagesSlice.reducer;