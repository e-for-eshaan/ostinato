import { useSelector as useReactSelector, useDispatch as useReactDispatch } from 'react-redux';
import { RootState, RootDispatch } from './store';

export const useSelector = useReactSelector<RootState>;
export const useDispatch = useReactDispatch<RootDispatch>;
