import { createSlice } from "@reduxjs/toolkit";

const initState = {
    isLoggedIn: false,
    user: null,
    accessToken: null,
} 

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: initState,
    reducers: {
        login: (state, action) => { //(상태,파라미터)
            state.isLoggedIn = true;
            state.user = action.payload.user;
            console.log(action.payload);
            state.accessToken = action.payload.accessToken;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            state.accessToken = null;
        },
    },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;