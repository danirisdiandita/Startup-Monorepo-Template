import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TeamForUserState {
    team_id: number;
    team_name: string;
    role: string;
    access: string;
    verified: boolean;
    selected: boolean;
}

export interface TeamState {
    team_user: TeamForUserState[];
}

const initialState: TeamState = {
    team_user: []
}

export const repositoriesSlice = createSlice({
    name: "team_user",
    initialState,
    reducers: {
        updateTeamUser(state, action: PayloadAction<TeamForUserState[]>) {
            return {
               team_user: action.payload
            }
        },
        selectTeamUser(state, action: PayloadAction<number>) {
            state.team_user.forEach(team => team.selected = team.team_id === action.payload);
        }
    }
})

export const { updateTeamUser, selectTeamUser } = repositoriesSlice.actions;
export default repositoriesSlice.reducer; 
