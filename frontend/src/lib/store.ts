import { configureStore } from "@reduxjs/toolkit";
import callStatusSlice from "./features/callStatus/callStatusSlice";
import { pokemonApi } from "./services/pokemon";
import { setupListeners } from '@reduxjs/toolkit/query'
export const makeStore = () => {
  return configureStore({
    reducer: {
      callStatus: callStatusSlice,
      [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (getDefaultMiddleWare) =>
      getDefaultMiddleWare().concat(pokemonApi.middleware),
  });
};


export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

setupListeners(makeStore().dispatch)
