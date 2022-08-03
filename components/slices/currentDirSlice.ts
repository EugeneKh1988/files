import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {StoreType} from '../../store';

interface ICurrentDir {
  path: string;
}

const initialState: ICurrentDir = {
  path: '',
};

export const currentDirSlice = createSlice({
  name: 'currentDir',
  initialState,
  reducers: {
    setDir(state: ICurrentDir, action: PayloadAction<string>) {
      state.path = action.payload;
    },
  },
});

export const {setDir} = currentDirSlice.actions;
export const selectDir = (state: StoreType) => state.currentDir.path;
export default currentDirSlice.reducer;
