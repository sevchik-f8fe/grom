import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        phone: '+7',
        fullName: '',
        confOk: false,
        persOk: false,
    },
    reducers: {
        setPhone: (state, action) => {
            return { ...state, phone: action.payload };
        },
        setFullName: (state, action) => {
            return { ...state, fullName: action.payload };
        },
        setConf: (state, action) => {
            return { ...state, confOk: action.payload };
        },
        setPers: (state, action) => {
            return { ...state, persOk: action.payload };
        },
    }
});

export const { setPhone, setFullName, setConf, setPers } = authSlice.actions;

export const authReducer = authSlice.reducer;