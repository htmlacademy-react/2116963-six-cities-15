import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '..';
import { TIMEOUT_SHOW_ERROR } from '../../const';
import { errorActions } from '../slices/error';

export const clearErrorAction = createAsyncThunk(
  'error/clearError',
  () => {
    setTimeout(
      () => store.dispatch(errorActions.setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);
