import { createSlice } from '@reduxjs/toolkit';

const studentSlice = createSlice({
    name: 'student',
    initialState: {
        students: [],
        currentPage: null,
        totalPages: null,
        pageSize: null,
        totalElements: null,
        status: null,
        error: null,
        loading: false,
    },
    reducers: {
        GET_STUDENTS_SUCCESS: (state, action) => {
            state.error = null;
            state.students = action.payload.data;
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
            state.totalElements = action.payload.totalElements;
            state.pageSize = action.payload.pageSize;
            state.loading = false;
        },
        GET_STUDENTS_FAILURE: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        GET_STUDENTS_LOADING: (state) => {
            state.loading = true;
        },
        GET_STATUS_SUCCESS: (state, action) => {
            state.error = null;
            state.status = action.payload;
            state.loading = false;
        },
    },
});
export default studentSlice;
