import { createSlice } from '@reduxjs/toolkit';

const classesSlice = createSlice({
    name: 'class',
    initialState: {
        classes: [],
        currentPage: null,
        totalPages: null,
        pageSize: null,
        totalElements: null,
        classLoading: false,
        classError: null,
    },
    reducers: {
        FETCH_ALL_CLASSES_REQUEST: (state) => {
            state.classLoading = true;
        },
        FETCH_ALL_CLASSES_SUCCESS: (state, action) => {
            state.classes = action.payload.data;
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
            state.pageSize = action.payload.pageSize;
            state.totalElements = action.payload.totalElements;
            state.classLoading = false;
            state.classError = null;
        },
        FETCH_ALL_CLASSES_FAILURE: (state, action) => {
            state.classError = action.payload;
            state.classLoading = false;
        },
        ADD_ALL_TEACHER_TO_CLASSES: (state, action) => {
            state.classes = action.payload;
        },

        FETCH_ALL_CLASSES_NOT_PAGINATION_SUCCESS: (state, action) => {
            state.classes = action.payload;
            state.currentPage = null;
            state.totalPages = null;
            state.pageSize = null;
            state.totalElements = null;
            state.classLoading = false;
            state.classError = null;
        },
    },
});

export default classesSlice;
