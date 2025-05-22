import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        teams: null,
        points: [],
        currentTeam: null,
    },
    reducers: {
        setTeams: (state, action) => {
            state.teams = action.payload.map((team) => ({
                ...team,
                onClickHandle: () => {
                    return {
                        teamname: team.teamName,
                        username: team.captain.username,
                        fullname: team.captain.fullName,
                        currentPoint: team.currentPoint,
                    };
                },
            }));
        },
        setCurrentTeam: (state, action) => {
            console.log(action.payload)
            state.currentTeam = action.payload;
        },
        setPoints: (state, action) => {
            console.log(action.payload)

            state.points = action.payload.map((point) => ({
                ...point,
                onClickHandle: () => {
                    return {
                        id: point._id,
                        coords: `${point.lat} ${point.lon}`,
                    };
                },
            }));
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

export const { setTeams, updateTeam, setCurrentTeam, setPoints } = adminSlice.actions;

export const adminReducer = adminSlice.reducer;