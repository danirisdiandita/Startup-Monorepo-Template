
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ThemeModeState {
  mode: "dark" | "light" | "system";
}

// const getThemeFromLocalStorage = (): "dark" | "light" | "system" => {
  // const theme = localStorage.getItem('theme');
  // return theme === "dark" || theme === "light" || theme === "system" ? theme : 'system';
//   return 
// }

const initialState: ThemeModeState = {
    mode: "system"
}

export const repositoriesSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    updateThemeMode(state, action: PayloadAction<"dark" | "light" | "system">) {
      // localStorage.setItem('theme', action.payload)
      state.mode = action.payload;
    }
  },
});

export const { updateThemeMode } = repositoriesSlice.actions;
export default repositoriesSlice.reducer;
