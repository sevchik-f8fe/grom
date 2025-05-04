import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        phone: '+7',
        password: '',
    },
    reducers: {
        setPhone: (state, action) => {
            return { ...state, phone: action.payload };
        },
        setPassword: (state, action) => {
            return { ...state, password: action.payload };
        },
    }
});

export const { setPhone, setPassword } = authSlice.actions;

export const authReducer = authSlice.reducer;