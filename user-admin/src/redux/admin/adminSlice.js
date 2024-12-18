import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    adminData: null,
    loading: false,
    error: false,
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        adminSigninStart: (state) => {
            state.loading = true;
        },
        adminSignInSuccess: (state, action) => {
            state.adminData = action.payload;
            state.loading = false;
            state.error = false;
        },
        adminSignInFail: (state, action) => { 
            state.loading = false;
            state.error = action.payload;
        },
        clearAdminError: (state) => {
            state.error = null; 
        },
        adminSignOut: (state) => {
            state.adminData = null;
            state.loading = false;
            state.error = false;

        }
    }
});

export const {
    adminSigninStart,
    adminSignInSuccess,
    adminSignInFail,
    clearAdminError,
    adminSignOut,
} = adminSlice.actions;

export default adminSlice.reducer;
