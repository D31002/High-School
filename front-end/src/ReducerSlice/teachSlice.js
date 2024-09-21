import { createSlice } from '@reduxjs/toolkit';

const teachSlice = createSlice({
    name: 'teach',
    initialState: {
        teachs: [],
        lessons: [],
        teachLoading: false,
        error: null,
    },
    reducers: {
        FETCH_TEACHS_REQUEST: (state) => {
            state.teachLoading = true;
        },
        FETCH_TEACHS_SUCCESS: (state, action) => {
            state.teachLoading = false;
            state.error = null;
            state.teachs = action.payload;
        },
        FETCH_TEACHS_FAILURE: (state, action) => {
            state.teachLoading = false;
            state.error = action.payload;
        },
        FETCH_LESSONS_SUCCESS: (state, action) => {
            state.error = null;
            state.lessons = action.payload;
        },
        FETCH_LESSONS_FAILURE: (state, action) => {
            state.error = action.payload;
        },
    },
});

export default teachSlice;
