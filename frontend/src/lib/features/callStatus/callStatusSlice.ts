import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RepositoriesState {
    status: string; 
}

const initialState: RepositoriesState = {
    status: "idle"
}

export const repositoriesSlice = createSlice({
    name: "callStatus", 
    initialState, 
    reducers: {
        updateCallStatus(state, action: PayloadAction<string>) {
            state.status = action.payload; 
        }, 
        getInitialState(state) {
            return initialState; 
        }
    }
})

export const { updateCallStatus, getInitialState } = repositoriesSlice.actions; 

export default repositoriesSlice.reducer; 