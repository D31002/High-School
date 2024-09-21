import { createSlice } from '@reduxjs/toolkit';

const gradeSlice = createSlice({
    name: 'grade',
    initialState: {
        grades: [],
        Loading: false,
        Error: null,
    },

    reducers: {
        FETCH_ALL_GRADES_REQUEST: (state) => {
            state.Loading = true;
        },
        FETCH_ALL_GRADES_SUCCESS: (state, action) => {
            state.Loading = false;
            state.grades = action.payload;
            state.Error = null;
        },
        FETCH_ALL_GRADES_FAILURE: (state, action) => {
            state.Loading = false;
            state.Error = action.payload;
        },
    },
});

export default gradeSlice;
