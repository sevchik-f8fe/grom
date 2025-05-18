import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        teams: null,
        listIsOpen: false,
        openTeamId: null,
    },
    reducers: {
        setTeams: (state, action) => {
            console.log(action.payload)
            state.teams = action.payload;
        },
        setListIsOpen: (state, action) => {
            console.log(action.payload)
            state.listIsOpen = action.payload;
        },
        setOpenTeamId: (state, action) => {
            console.log(action.payload)
            state.openTeamId = action.payload;
        },
        setCloseTeam: (state, action) => {
            console.log(action.payload)
            state.openTeamId = null;
        },
    }
});

export const { setTeams, setListIsOpen, setOpenTeamId, setCloseTeam } = adminSlice.actions;

export const adminReducer = adminSlice.reducer;