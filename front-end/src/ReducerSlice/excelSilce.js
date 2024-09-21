import { createSlice } from '@reduxjs/toolkit';

const excelSlice = createSlice({
    name: 'excel',
    initialState: {
        dataExcel: [],
        loading: false,
        error: null,
    },
    reducers: {
        PUT_DATA_SUCCESS: (state, action) => {
            state.dataExcel = action.payload;
            state.error = null;
            state.loading = false;
        },
        PUT_DATA_FAILURE: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        IMPORT_DATA_LOADING: (state) => {
            state.loading = true;
        },
        IMPORT_DATA_LOADING_SUCCES: (state) => {
            state.loading = false;
            state.dataExcel = [];
        },
    },
});

export default excelSlice;
