
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ThemeModeState {
  mode: "dark" | "light";
}

// const initialState: ThemeModeState = {
//   mode: window.matchMedia("(prefers-color-scheme: dark)").matches
//     ? "dark"
//     : "light",
// };

const initialState: ThemeModeState = {
    mode: 'dark'
}

export const repositoriesSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    updateThemeMode(state, action: PayloadAction<"dark" | "light">) {
      state.mode = action.payload;
    }, 
    getInitialState() {
        return initialState 
    }
  },
});

export const { updateThemeMode, getInitialState } = repositoriesSlice.actions;
export default repositoriesSlice.reducer;
