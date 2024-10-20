import {
  useSelector as useReactSelector,
  useDispatch as useReactDispatch,
  TypedUseSelectorHook,
} from 'react-redux';
import { RootState, RootDispatch } from './store';

export const useSelector: TypedUseSelectorHook<RootState> = useReactSelector;
export const useDispatch = () => useReactDispatch<RootDispatch>();
