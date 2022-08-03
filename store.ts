import {configureStore} from '@reduxjs/toolkit';
import currentDirReducer from './components/slices/currentDirSlice';

const store = configureStore({
  reducer: {
    currentDir: currentDirReducer,
  },
});

export type StoreType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
export default store;
