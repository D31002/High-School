import { createSlice } from '@reduxjs/toolkit';

const attendanceSlice = createSlice({
    name: 'attendance',
    initialState: {
        attendanceStatus: [],
        session: [],
        loading: false,
        error: null,
    },
    reducers: {
        FETCH_REQUEST: (state) => {
            state.loading = true;
        },
        FETCH_attendanceStatus_SUCCESS: (state, action) => {
            state.loading = false;
            state.error = null;
            state.attendanceStatus = action.payload;
        },
        FETCH_session_SUCCESS: (state, action) => {
            state.loading = false;
            state.error = null;
            state.session = action.payload;
        },
        FETCH_FAILURE: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export default attendanceSlice;
