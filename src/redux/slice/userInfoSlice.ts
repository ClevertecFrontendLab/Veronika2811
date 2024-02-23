import { createSlice } from '@reduxjs/toolkit';

interface TInitialState {
    isAuthUser: boolean;
    isLoading: boolean;
    registerUser: {
        email: string;
        password: string;
    };
    newPassword: {
        password: string;
        confirmPassword: string;
    };
    verificationEmail: string;
}

const initialState: TInitialState = {
    isAuthUser: !!localStorage.getItem('token') || !!sessionStorage.getItem('token'),
    isLoading: false,
    registerUser: {
        email: '',
        password: '',
    },
    newPassword: {
        password: '',
        confirmPassword: '',
    },
    verificationEmail: '',
};

const userInfoSlice = createSlice({
    name: 'USER_INFO_SLICE',
    initialState,
    reducers: {
        setUserLoggedIn: (state, action) => {
            state.isAuthUser = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        saveRegistrationData: (state, action) => {
            state.registerUser = action.payload;
        },
        saveChangedPassword: (state, action) => {
            state.newPassword = action.payload;
        },
        saveEmailRecoveryPassword: (state, action) => {
            state.verificationEmail = action.payload;
        },
    },
});

const { actions, reducer } = userInfoSlice;

export const {
    setUserLoggedIn,
    setIsLoading,
    saveRegistrationData,
    saveChangedPassword,
    saveEmailRecoveryPassword,
} = actions;

export default reducer;
