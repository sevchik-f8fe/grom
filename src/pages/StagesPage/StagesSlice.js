import { createSlice } from "@reduxjs/toolkit";

const stagesSlice = createSlice({
    name: 'stages',
    initialState: {
        stages: [
            { id: 1, completed: false },
            { id: 2, completed: false },
            { id: 3, completed: false },
            { id: 4, completed: false },
            { id: 5, completed: false },
            { id: 6, completed: false },
            { id: 7, completed: false },
            { id: 8, completed: false },
            { id: 9, completed: false },
            { id: 10, completed: false },
        ],
        activeStageId: 1,
    },
    reducers: {
        setActive: (state, action) => {
            state.activeStageId = action.payload;
        },
        setStageCompleted: (state, action) => {
            state.stages = state.stages.map((elem) => {
                if (elem.id === action.payload) {
                    return { id: elem.id, completed: true }
                } else {
                    return elem
                }
            });
        },
    }
});

export const { setActive, setStageCompleted } = stagesSlice.actions;

export const stagesReducer = stagesSlice.reducer;