import { createSlice } from '@reduxjs/toolkit';

const teacherSlice = createSlice({
    name: 'teacher',
    initialState: {
        teachers: [],
        currentPage: null,
        totalPages: null,
        pageSize: null,
        totalElements: null,
        loading: false,
        error: null,
    },
    reducers: {
        FETCH_ALL_TEACHERS_REQUEST: (state, action) => {
            state.loading = true;
        },

        FETCH_ALL_TEACHERS_SUCCESS: (state, action) => {
            state.error = null;
            state.loading = false;
            state.teachers = action.payload.data;
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
            state.totalElements = action.payload.totalElements;
            state.pageSize = action.payload.pageSize;
        },

        FETCH_ALL_TEACHERS_FAILURE: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        FETCH_ALL_TEACHERS_NOT_PAGINATION_SUCCESS: (state, action) => {
            state.error = null;
            state.loading = false;
            state.teachers = action.payload;
            state.currentPage = null;
            state.totalPages = null;
            state.totalElements = null;
            state.pageSize = null;
        },
    },
});

export default teacherSlice;
