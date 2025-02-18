import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { T_Transfer, T_Baggage } from "../../modules/types.ts";
import { AxiosResponse } from "axios";
import { NEXT_YEAR, PREV_YEAR } from "../../utils/consts";
import { api } from "../../api";


type T_TransfersState = {
  draft_transfer: number | null;
  baggages_to_transfer: number | null;
  transfer: T_Transfer | null;
  transfers: T_Transfer[];
  filters: T_TransfersFilters;
  save_mm: boolean;
};

export type T_TransfersFilters = {
  date_formation_start: string;
  date_formation_end: string;
  status: string;
  author: string;
};

const initialState: T_TransfersState = {
  draft_transfer: null,
  baggages_to_transfer: null,
  transfer: null,
  transfers: [],
  filters: {
    author: "",
    status: "",
    date_formation_start: PREV_YEAR.toISOString().split("T")[0],
    date_formation_end: NEXT_YEAR.toISOString().split("T")[0],
  },
  save_mm: false,
};

export const fetchTransfer = createAsyncThunk<T_Transfer, string>(
  "transfers/fetchTransfer",
  async (transfer_id) => {
    const response = (await api.transfers.transfersRead(transfer_id)) as unknown as AxiosResponse<T_Transfer>;
    console.log(transfer_id)
    return response.data;
  }
);

export const fetchTransfers = createAsyncThunk<T_Transfer[], void, { state: { transfers: T_TransfersState } }>(
  "transfers/fetchtransfers",
  async (_, { getState }) => {
    const { filters } = getState().transfers;
    const response = (await api.transfers.transfersList ({
        status: filters.status,
        date_formation_start: filters.date_formation_start,
        date_formation_end: filters.date_formation_end,
    })) as unknown as AxiosResponse<T_Transfer[]>;
    return response.data;
  }
);

export const removeBaggageFromDraftTransfer = createAsyncThunk<T_Baggage[], string, { state: { transfers: T_TransfersState } }>(
    "transfers/removeBaggageFromDraftTransfer",
    async (baggage_id, { getState }) => {
      const { transfer } = getState().transfers;
  
      if (!transfer?.id) {
        throw new Error("Transfer ID is required to remove a baggage.");
      }
  
      const response = (await api.transfer.transferDeleteBaggageFromTransferDelete (String(transfer.id), baggage_id)) as AxiosResponse<T_Baggage[]>;
      return response.data;
    }
  );
  
  export const deleteDraftTransfer = createAsyncThunk<void, void, { state: { transfers: T_TransfersState } }>(
    "transfers/deleteDraftTransfer",
    async (_, { getState }) => {
      const { transfer } = getState().transfers;
  
      if (!transfer?.id) {
        throw new Error("Shipment ID is required to delete a draft shipment.");
      }
  
      await api.transfers.transfersDeleteDelete(String(transfer.id));
    }
  );
  
export const sendDraftTransfer = createAsyncThunk<
  void, 
  void, 
  { state: { transfers: T_TransfersState } }
>(
  "transfers/sendDraftTransfer",
  async (_, { getState }) => {
    console.log("sendDraftTransfer: Начало выполнения");

    const { transfer } = getState().transfers;

    console.log("sendDraftTransfer: Текущее состояние transfer:", transfer);

    if (!transfer?.id) {
      console.error("sendDraftTransfer: Ошибка - отсутствует ID перехода.");
      throw new Error("Transfer ID is required to send a draft transfer.");
    }

    console.log(`sendDraftTransfer: Переход ID перехода: ${transfer.id}`);

    try {
      await api.transfers.transfersUpdateStatusUserUpdate(String(transfer.id));
      console.log("sendDraftTransfer: Успешно обновлен статус отправки.");
    } catch (error) {
      console.error("sendDraftTransfer: Ошибка при обновлении статуса перехода:", error);
      throw error; // Пробрасываем ошибку дальше
    }
  }
);

  
export const updateTransfer = createAsyncThunk<void, Partial<T_Transfer>, { state: { transfers: T_TransfersState } }>(
  "transfers/updateTransfer",
  async (data, { getState }) => {
    const { transfer } = getState().transfers;
    if (!transfer?.id) {
      throw new Error("Transfer ID is required to update a transfer.");
    }
    try {
      await api.transfers.transfersUpdateUpdate(String(transfer.id), { ...data });
    } catch (error) {
      throw error;
    }
  }
);

  
  export const updateBaggagePosition = createAsyncThunk<void, { baggage_id: string }, { state: { transfers: T_TransfersState } }>(
    "transfers/updateBaggagePosition",
    async ({ baggage_id }, { getState }) => {
      const { transfer } = getState().transfers;
  
      if (!transfer?.id) {
        throw new Error("Transfer ID is required to update baggage position.");
      }
  
      await api.transfer.transferUpdateBaggageTransferUpdate(String(transfer.id), baggage_id);
    }
  );

  export const completeTransfer = createAsyncThunk("transfers/completeTransfer", async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.transfers.transfersUpdateStatusAdminUpdate(String(id), { status: "completed" });
      if (!response.data) {
        throw new Error("Не удалось завершить заявку");
      }
      return id;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(`Ошибка при завершении заявки с ID ${id}: ${error.message}`);
      } else {
        return rejectWithValue("Неизвестная ошибка при завершении заявки.");
      }
    }
  });

  export const rejectTransfer = createAsyncThunk("transfers/rejectTransfer", async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.transfers.transfersUpdateStatusAdminUpdate(String(id), { status: "rejected" });
      if (!response.data) {
        throw new Error("Не удалось отклонить заявку");
      }
      return id;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(`Ошибка при отклонении заявки с ID ${id}: ${error.message}`);
      } else {
        return rejectWithValue("Неизвестная ошибка при отклонении заявки.");
      }
    }
  });

const transfersSlice = createSlice({
  name: "transfers",
  initialState,
  reducers: {
    saveTransfer: (state, action: PayloadAction<{ draft_transfer: number; baggages_to_transfer: number }>) => {
      state.draft_transfer = action.payload.draft_transfer;
      state.baggages_to_transfer = action.payload.baggages_to_transfer;
    },
    removeTransfer: (state) => {
      state.transfer = null;
    },
    triggerUpdateMM: (state) => {
      state.save_mm = !state.save_mm;
    },
    updateFilters: (state, action: PayloadAction<T_TransfersFilters>) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransfer.fulfilled, (state, action: PayloadAction<T_Transfer>) => {
        state.transfer = action.payload;
      })
      .addCase(fetchTransfers.fulfilled, (state, action: PayloadAction<T_Transfer[]>) => {
        state.transfers = action.payload;
      })
      .addCase(removeBaggageFromDraftTransfer.fulfilled, (state, action: PayloadAction<T_Baggage[]>) => {
        if (state.transfer) {
          state.transfer.baggages = action.payload;
        }
      })
      .addCase(sendDraftTransfer.fulfilled, (state) => {
        state.transfer = null;
      });
  },
});

export const { saveTransfer, removeTransfer, triggerUpdateMM, updateFilters } = transfersSlice.actions;
export default transfersSlice.reducer;