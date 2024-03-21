import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { State, AppDispatch } from '../types/state';
import { ActionCreatorsMapObject, AsyncThunk, bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';

const useAppDispatch = useDispatch<AppDispatch>;
const useAppSelector: TypedUseSelectorHook<State> = useSelector;

const useActionCreators = <Actions extends ActionCreatorsMapObject>(actions: Actions): BoundActions<Actions> => {
  const dispatch = useAppDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => bindActionCreators(actions, dispatch), []);
};

type BoundActions<Actions extends ActionCreatorsMapObject> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any> ? BoundAsyncThunk<Actions[key]> : Actions[key]
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BoundAsyncThunk<Thunk extends AsyncThunk<any, any, any>> = (...args: Parameters<Thunk>) => ReturnType<ReturnType<Thunk>>

export { useAppDispatch, useAppSelector, useActionCreators };
