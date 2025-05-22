import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        teams: null,
    },
    reducers: {
        setTeams: (state, action) => {
            state.teams = action.payload;
        },
        updateTeam: (state, action) => {
            console.log('upd', action.payload)

            if (state?.teams) {
                state.teams = state.teams.map((team) => {
                    if (team.teaNname == action.payload.teamName) {
                        return { ...team, currentCoords: action.payload.currentCoords }
                    } else {
                        return team
                    }
                })
            }
        },
    }
});

export const { setTeams, updateTeam } = adminSlice.actions;

export const adminReducer = adminSlice.reducer;