import { createSlice } from '@reduxjs/toolkit';

const teachSlice = createSlice({
    name: 'academicResult',
    initialState: {
        academicResults: [],
        category: [],
        conduct: [],
        academicPerformance: [],
        currentPage: null,
        totalPages: null,
        pageSize: null,
        totalElements: null,
        Loading: false,
        error: null,
    },
    reducers: {
        FETCH_academicResults_REQUEST: (state) => {
            state.teachLoading = true;
        },
        FETCH_academicResults_SUCCESS: (state, action) => {
            state.teachLoading = false;
            state.error = null;
            state.academicResults = action.payload.data;
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
            state.totalElements = action.payload.totalElements;
            state.pageSize = action.payload.pageSize;
        },
        FETCH_academicResults_FAILURE: (state, action) => {
            state.teachLoading = false;
            state.error = action.payload;
        },
        FETCH_category_SUCCESS: (state, action) => {
            state.teachLoading = false;
            state.error = null;
            state.category = action.payload;
        },
        FETCH_conduct_SUCCESS: (state, action) => {
            state.teachLoading = false;
            state.error = null;
            state.conduct = action.payload;
        },
        FETCH_AcademicPerformance_SUCCESS: (state, action) => {
            state.teachLoading = false;
            state.error = null;
            state.academicPerformance = action.payload;
        },
    },
});

export default teachSlice;
