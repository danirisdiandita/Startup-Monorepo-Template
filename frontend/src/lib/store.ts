import { combineReducers, configureStore } from "@reduxjs/toolkit";
import callStatusSlice from "./features/callStatus/callStatusSlice";
import { pokemonApi } from "./services/pokemon";
import { setupListeners } from "@reduxjs/toolkit/query";
import { verificationApi } from "./services/verification";
import themeSlice from "./features/theme/themeSlice";
import storage from "./ssr-safe-storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist";
import { memberApi } from "./services/member";
import teamSlice from "./features/team/teamSlice";

const rootReducer = combineReducers({
  callStatus: callStatusSlice,
  theme: themeSlice,
  team: teamSlice,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  [verificationApi.reducerPath]: verificationApi.reducer,
  [memberApi.reducerPath]: memberApi.reducer,
});

export const persistConfig = {
  key: "root",
  storage,
  whitelist: ["theme", "team"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleWare) =>
      getDefaultMiddleWare({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
        .concat(pokemonApi.middleware)
        .concat(verificationApi.middleware).concat(memberApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

setupListeners(makeStore().dispatch);
