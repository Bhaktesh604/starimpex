import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type AlertState = {
  message: string | null;
  variant: EVariant | null;
  timeout?: number;
};

export enum EVariant {
  SUCCESS = 'success',
  ERROR = 'error',
}

export const initialState: AlertState = {
  message: '',
  variant: null,
  timeout: 4000,
};

export const AlertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state: AlertState, action: PayloadAction<AlertState>) => {
      state.message = action.payload.message;
      state.variant = action.payload.variant;
      state.timeout = action.payload?.timeout
        ? action.payload.timeout
        : state.timeout;
    },
    clearAlert: (state) => {
      (state.message = null), (state.variant = null);
    },
  },
});

export const { showAlert, clearAlert } = AlertSlice.actions;
export default AlertSlice.reducer;
