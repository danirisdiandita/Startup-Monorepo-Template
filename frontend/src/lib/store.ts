import { configureStore } from "@reduxjs/toolkit"
import callStatusSlice from "./features/callStatus/callStatusSlice"



export const makeStore = () => {
    return configureStore({
        reducer: {
            callStatus: callStatusSlice
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>; 
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch']; 