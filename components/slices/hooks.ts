import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {StoreType, DispatchType} from '../../store';

export const useAppDispatch: () => DispatchType = useDispatch;
export const useAppSelector: TypedUseSelectorHook<StoreType> = useSelector;
