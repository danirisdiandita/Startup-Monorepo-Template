import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TeamForUserState {
    team_id: number;
    team_name: string;
    role: string;
    access: string;
    verified: boolean;
    selected: boolean;
}

const initialState: TeamForUserState[] = [];

export const repositoriesSlice = createSlice({
    name: "team_user",
    initialState,
    reducers: {
        updateTeamUser(state, action: PayloadAction<TeamForUserState[]>) {
            state = action.payload;
        }
    }
})

export const { updateTeamUser } = repositoriesSlice.actions;
export default repositoriesSlice.reducer; 
