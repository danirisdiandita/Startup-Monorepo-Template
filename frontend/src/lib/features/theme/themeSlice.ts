
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ThemeModeState {
  mode: "dark" | "light" | "system";
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
    updateThemeMode(state, action: PayloadAction<"dark" | "light" | "system">) {
      state.mode = action.payload;
    }
  },
});

export const { updateThemeMode } = repositoriesSlice.actions;
export default repositoriesSlice.reducer;
