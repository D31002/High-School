import { createSlice } from '@reduxjs/toolkit';

const newsSlice = createSlice({
    name: 'news',
    initialState: {
        news: [],
        currentPage: null,
        totalPages: null,
        pageSize: null,
        totalElements: null,
        loading: false,
        error: null,
    },
    reducers: {
        FETCH_ALL_NEWS_REQUEST: (state) => {
            state.loading = true;
        },
        FETCH_ALL_NEWS_SUCCESS: (state, action) => {
            state.loading = false;
            state.news = action.payload.data;
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
            state.totalElements = action.payload.totalElements;
            state.pageSize = action.payload.pageSize;
        },
        FETCH_ALL_NEWS_FAILURE: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export default newsSlice;
