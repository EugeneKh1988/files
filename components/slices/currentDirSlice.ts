import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {StoreType} from '../../store';

interface ICurrentDir {
  path: string;
  selectedFiles: string[];
  selectedDirs: string[];
}

const initialState: ICurrentDir = {
  path: '',
  selectedFiles: [],
  selectedDirs: [],
};

export const currentDirSlice = createSlice({
  name: 'currentDir',
  initialState,
  reducers: {
    // set current dir
    setDir(state: ICurrentDir, action: PayloadAction<string>) {
      state.path = action.payload;
    },
    // add file or dir to selection
    select(
      state: ICurrentDir,
      action: PayloadAction<{path: string; isFile: boolean}>,
    ) {
      const {path, isFile} = action.payload;
      if (isFile) {
        !state.selectedFiles.includes(path)
          ? state.selectedFiles.push(path)
          : null;
      } else {
        !state.selectedDirs.includes(path)
          ? state.selectedDirs.push(path)
          : null;
      }
    },
    // delete file or dir from selection
    deselect(
      state: ICurrentDir,
      action: PayloadAction<{path: string; isFile: boolean}>,
    ) {
      const {path, isFile} = action.payload;
      if (isFile) {
        const fileIndex = state.selectedFiles.indexOf(path);
        fileIndex >= 0 ? state.selectedFiles.splice(fileIndex, 1) : null;
      } else {
        const dirIndex = state.selectedDirs.indexOf(path);
        dirIndex >= 0 ? state.selectedDirs.splice(dirIndex, 1) : null;
      }
    },
    // add to selection if file wasn't selected or delete from selection
    toggleSelection(
      state: ICurrentDir,
      action: PayloadAction<{path: string; isFile: boolean}>,
    ) {
      const {path, isFile} = action.payload;
      if (isFile) {
        const fileIndex = state.selectedFiles.indexOf(path);
        fileIndex >= 0
          ? state.selectedFiles.splice(fileIndex, 1)
          : state.selectedFiles.push(path);
      } else {
        const dirIndex = state.selectedDirs.indexOf(path);
        dirIndex >= 0
          ? state.selectedDirs.splice(dirIndex, 1)
          : state.selectedDirs.push(path);
      }
    },
    clearSelectedFiles(state: ICurrentDir) {
      state.selectedFiles = [];
    },
    clearSelectedDirs(state: ICurrentDir) {
      state.selectedDirs = [];
    },
    clearSelection(state: ICurrentDir) {
      state.selectedFiles = [];
      state.selectedDirs = [];
    },
  },
});

// export reducer functions
export const {setDir, select, deselect, toggleSelection, clearSelection} =
  currentDirSlice.actions;

// export selection store functions
export const selectDir = (state: StoreType) => state.currentDir.path;
export const selectedFiles = (state: StoreType) =>
  state.currentDir.selectedFiles;
export const selectedDirs = (state: StoreType) => state.currentDir.selectedDirs;
export default currentDirSlice.reducer;
