import {store} from '../store';
import { errorActions } from '../store/slices/error';
import { clearErrorAction } from '../store/thunks/error';


export const processErrorHandle = (message: string): void => {
  store.dispatch(errorActions.setError(message));
  store.dispatch(clearErrorAction());
};
