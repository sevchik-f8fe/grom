import { createSlice } from "@reduxjs/toolkit";

const stagesSlice = createSlice({
    name: 'stages',
    initialState: {
        stages: [
            '681f7b184842dc852e405f6b',
            '681f7ba54842dc852e405f6f',
            '681f7c014842dc852e405f71',
            '681f7c444842dc852e405f77',
            '681f7c9a4842dc852e405f83',
            '681f7cd54842dc852e405f85',
            '681f7cfe4842dc852e405f89',
            '681f7d1b4842dc852e405f8f',
            '681f7d534842dc852e405f93',
            '681f7d7c4842dc852e405f97'
        ],
        activeStageId: '681f7b184842dc852e405f6b',
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