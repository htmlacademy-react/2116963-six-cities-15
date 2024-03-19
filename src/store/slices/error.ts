import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  error: string | null;
}

const initialState: InitialState = {
  error: null
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  },
  selectors: {
    error: (state) => state.error,
  },
});

const errorActions = errorSlice.actions;
const errorSelectors = errorSlice.selectors;

export { errorSlice, errorActions, errorSelectors };
