import { createSlice } from '@reduxjs/toolkit';

const getUserFromLocalStorage = () => {
    try {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    } catch (error) {
        return null;
    }
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: getUserFromLocalStorage(),
        token: localStorage.getItem('token') || null,
        loading: false,
        error: null,
    },
    reducers: {
        LOGIN_REQUEST: (state) => {
            state.loading = true;
        },
        LOGIN_SUCCESS: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.loading = false;
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('DateNow', Date.now());
        },
        LOGIN_FAILURE: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        LOGOUT_SUCCESS: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('expiryTime');
        },

        REFESH_TOKEN: (state, action) => {
            localStorage.removeItem('token');
            localStorage.removeItem('DateNow');
            localStorage.setItem('token', action.payload);
            localStorage.setItem('DateNow', Date.now());
            state.token = action.payload;
        },
        UPDATE_USER: (state, action) => {
            state.user = { ...action.payload };
            localStorage.setItem('user', JSON.stringify(state.user));
        },
    },
});
export default authSlice;
