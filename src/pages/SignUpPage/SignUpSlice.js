import { createSlice } from "@reduxjs/toolkit";

const signUpSlice = createSlice({
    name: 'signup',
    initialState: {
        currentStep: 1,
        currentMember: 1,
        captain: {
            teamname: { value: '', error: false },
            phone: { value: '+7', error: false },
            email: { value: '', error: false },
            username: { value: '@', error: false },
            fullname: { value: '', error: false },
            password: { value: '', error: false },
            passwordRep: { value: '', error: false },
        },
        members: [
            {
                id: 1,
                phone: { value: '+7', error: false },
                email: { value: '', error: false },
                username: { value: '@', error: false },
            },
            {
                id: 2,
                phone: { value: '+7', error: false },
                email: { value: '', error: false },
                username: { value: '@', error: false },
            },
            {
                id: 3,
                phone: { value: '+7', error: false },
                email: { value: '', error: false },
                username: { value: '@', error: false },
            },
            {
                id: 4,
                phone: { value: '+7', error: false },
                email: { value: '', error: false },
                username: { value: '@', error: false },
            },
        ],
        confOk: false,
        persOk: false,
    },
    reducers: {
        setCurrentStep: (state, action) => {
            state.currentStep = action.payload;
        },
        setCurrentMember: (state, action) => {
            state.currentMember = action.payload;
        },
        setCaptainField: (state, action) => {
            const { field, value } = action.payload;
            state.captain[field].value = value;
        },
        setCaptainError: (state, action) => {
            const { field, error } = action.payload;
            state.captain[field].error = error;
        },
        setMemberField: (state, action) => {
            const { id, value, field } = action.payload;

            state.members = state.members.map(member => {
                if (member.id === id) {
                    member[field].value = value;
                }
                return member;
            });
        },
        setMemberError: (state, action) => {
            const { id, error, field } = action.payload;

            state.members = state.members.map(member => {
                if (member.id === id) {
                    member[field].error = error;
                }
                return member;
            });
        },
        setCheck: (state, action) => {
            state[action.payload.field] = action.payload.value;
        },
    }
});

export const { setCaptainField, setCaptainError, setMemberField, setCheck, setCurrentStep, setCurrentMember, setMemberError } = signUpSlice.actions;

export const signUpReducer = signUpSlice.reducer;