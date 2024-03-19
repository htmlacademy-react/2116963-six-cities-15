import { AxiosInstance } from 'axios';
import { store } from '../store/index.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type ThunkApi = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
