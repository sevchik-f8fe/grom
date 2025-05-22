import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
    name: 'global',
    initialState: {
        user: null,
        socketState: null,
        socketSendHandle: null,
        isAdmin: false,
        token: null,
        error: null,
        currentCoords: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setSocket: (state, action) => {
            console.log(action.payload)
            state.socketSendHandle = action.payload.send;
            state.socketState = action.payload.readyState;
        },
        setIsAdmin: (state, action) => {
            state.isAdmin = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setCoords: (state, action) => {
            state.currentCoords = action.payload;
        },
    }
});

export const { setUser, setIsAdmin, setToken, setError, setSocket, setCoords } = globalSlice.actions;

export const globalReducer = globalSlice.reducer;