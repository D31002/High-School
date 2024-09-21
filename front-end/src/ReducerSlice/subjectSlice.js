import { createSlice } from '@reduxjs/toolkit';

const subjectSilce = createSlice({
    name: 'subject',
    initialState: {
        subjects: [],
        combination: [],
        loading: false,
        error: null,
    },
    reducers: {
        GET_ALL_SUBJECT_REQUEST: (state) => {
            state.loading = true;
        },
        GET_ALL_SUBJECT_SUCCESS: (state, action) => {
            state.subjects = action.payload;
            state.loading = false;
            state.error = null;
        },
        GET_ALL_SUBJECT_FAILURE: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        GET_ALL_COMBINATION_REQUEST: (state) => {
            state.loading = true;
        },
        GET_ALL_COMBINATION_SUCCESS: (state, action) => {
            state.combination = action.payload;
            state.loading = false;
            state.error = null;
        },
        GET_ALL_COMBINATION_FAILURE: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export default subjectSilce;
