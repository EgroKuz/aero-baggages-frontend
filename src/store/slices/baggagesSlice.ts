import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { T_Baggage, T_BaggagesListResponse } from "../../modules/types.ts";
import  {saveTransfer}  from "./transfersSlice.ts";
import { api } from "../../api";
import { useSelector } from 'react-redux';
import { AxiosResponse } from "axios";
import { RootState, AppDispatch } from "../store";
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

export const fetchBaggages = createAsyncThunk<
    T_Baggage[],
    void,
    { state: RootState; rejectValue: string }
>('baggages/fetchBaggages', async (_, { getState, rejectWithValue }) => {
    try {
        const response = await api.baggages.baggagesList();
        console.log('API Response:', response); // Логирование ответа от API
        
        const data = response.data as T_BaggagesListResponse;
        if (!data || !Array.isArray(data.baggages)) {
            throw new Error('Invalid API data');
        }
        return data.baggages;
    } catch (error) {
        console.error('Error fetching baggages:', error);
        return rejectWithValue('Failed to fetch baggages');
    }
});

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
  async function(baggage_id) {
    await api.baggages.baggagesAddToTransferCreate(baggage_id);
}
);


export const createBaggage = createAsyncThunk<
    void,
    Omit<T_Baggage, 'id'>,
    { rejectValue: string }
>('baggages/createBaggage', async (baggageData, { dispatch, rejectWithValue }) => {
    try {
        const response = await api.baggages.baggagesCreateCreate(baggageData);
        if (!response.data) throw new Error('Failed to create operation');
        (dispatch as AppDispatch)(fetchBaggages());
    } catch (error) {
        console.error('Error creating operation:', error);
        return rejectWithValue('Failed to create operation');
    }
});

export const deleteBaggage = createAsyncThunk<
  void,
  number,
  { rejectValue: string }
>("baggages/deleteBaggage", async (id, { dispatch, rejectWithValue }) => {
  try {
    const response = await api.baggages.baggagesDeleteDelete(String(id));
    if (response.status !== 200) throw new Error("Failed to delete baggage");

    (dispatch as AppDispatch)(fetchBaggages());
  } catch (error) {
    console.error("Error deleting baggage:", error);
    return rejectWithValue("Failed to delete obit");
  }
});

export const updateBaggage = createAsyncThunk<
  void,
  T_Baggage,
  { rejectValue: string }
>('baggages/updateBaggage', async (baggage, { rejectWithValue }) => {
  try {
    console.log("API call with ID:", baggage.id); // Логирование перед запросом
    const response = await api.baggages.baggagesUpdateUpdate(String(baggage.id), baggage);
    if (!response.data) throw new Error('Failed to update baggage');
  } catch (error) {
    console.error('Error updating baggage:', error);
    return rejectWithValue('Failed to update baggage');
  }
});
export const updateBaggageImage = createAsyncThunk<
    string,
    { id: string; formData: FormData },
    { rejectValue: string }
>('baggages/updateBaggageImage', async ({ id, formData }, { rejectWithValue }) => {
    try {
        // Отправка formData на сервер
        const response = await api.baggages.baggagesUpdateImageCreate(id, formData);

        const data = response.data;

        // Проверяем, что image является строкой (URL)
        if (!data.image || typeof data.image !== 'string') {
            throw new Error('Invalid image URL');
        }

        // Возвращаем только имя файла (последнюю часть URL)
        return data.image.split('/').pop()!;
    } catch (error) {
        console.error('Error updating operation image:', error);
        return rejectWithValue('Failed to update image');
    }
});



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