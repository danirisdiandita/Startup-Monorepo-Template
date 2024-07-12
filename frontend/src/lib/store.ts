import { configureStore } from "@reduxjs/toolkit";
import callStatusSlice from "./features/callStatus/callStatusSlice";
import { pokemonApi } from "./services/pokemon";
import { setupListeners } from "@reduxjs/toolkit/query";
import { verificationApi } from "./services/verification";
import themeSlice from "./features/theme/themeSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      callStatus: callStatusSlice,
      theme: themeSlice, 
      [pokemonApi.reducerPath]: pokemonApi.reducer,
      [verificationApi.reducerPath]: verificationApi.reducer,
    },
    middleware: (getDefaultMiddleWare) =>
      getDefaultMiddleWare()
        .concat(pokemonApi.middleware)
        .concat(verificationApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

setupListeners(makeStore().dispatch);
