import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        phone: { value: '+7', error: false },
        password: { value: '', error: false },
        coords: { value: [], error: false },
    },
    reducers: {
        setAuthField: (state, action) => {
            const { field, value } = action.payload;
            state[field].value = value;
        },
        setAuthError: (state, action) => {
            const { field, error } = action.payload;
            state[field].error = error;
        },
    }
});

export const { setAuthField, setAuthError } = authSlice.actions;

export const authReducer = authSlice.reducer;