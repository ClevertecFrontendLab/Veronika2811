import { createSlice } from '@reduxjs/toolkit';

import { ACCESS_TOKEN_KEY } from '@constants/storageKeys';

type TInitialState = {
    isLoading: boolean;
    accessToken: string | null;
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
    isLoading: false,
    accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
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

const authSlice = createSlice({
    name: 'AUTH_SLICE',
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
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

const { actions, reducer } = authSlice;

export const {
    setIsLoading,
    setAccessToken,
    saveRegistrationData,
    saveChangedPassword,
    saveEmailRecoveryPassword,
} = actions;

export default reducer;
