import { createSlice } from "@reduxjs/toolkit";

const stagesSlice = createSlice({
    name: 'stages',
    initialState: {
        stages: [
            { id: 1, point: '681f7b184842dc852e405f6b' },
            { id: 2, point: '681f7ba54842dc852e405f6f' },
            { id: 3, point: '681f7c014842dc852e405f71' },
            { id: 4, point: '681f7c444842dc852e405f77' },
            { id: 5, point: '681f7c9a4842dc852e405f83' },
            { id: 6, point: '681f7cd54842dc852e405f85' },
            { id: 7, point: '681f7cfe4842dc852e405f89' },
            { id: 8, point: '681f7d1b4842dc852e405f8f' },
            { id: 9, point: '681f7d534842dc852e405f93' },
            { id: 10, point: '681f7d7c4842dc852e405f97' },
        ],
        activeStageId: 1,
    },
    reducers: {
        setActiveStage: (state, action) => {
            console.log(action.payload)
            state.activeStageId = action.payload;
        },
    }
});

export const { setActiveStage } = stagesSlice.actions;

export const stagesReducer = stagesSlice.reducer;