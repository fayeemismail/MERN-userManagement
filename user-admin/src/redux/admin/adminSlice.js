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
        adminSignInFail: (state, action) => { // Corrected name here
            state.loading = false;
            state.error = action.payload;
        },
        clearAdminError: (state) => {
            state.error = null; // Reset the error state
        }
    }
});

export const {
    adminSigninStart,
    adminSignInSuccess,
    adminSignInFail,
    clearAdminError
} = adminSlice.actions;

export default adminSlice.reducer;
