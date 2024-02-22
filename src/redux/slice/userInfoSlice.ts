import { createSlice } from '@reduxjs/toolkit';

interface TInitialState {
    isAuth: boolean,
    isLoading: boolean;
    registerUser: {
        email: string,
        password: string,
    },
    newPassword: {
        password: string,
        confirmPassword: string,
    },
    resetPasswordEmail: string,
}

const initialState: TInitialState = {
    isAuth: !!localStorage.getItem('token') || !!sessionStorage.getItem('token'),
    isLoading: false,
    registerUser: {
        email: '',
        password: '',
    },
    newPassword: {
        password: '',
        confirmPassword: '',
    },
    resetPasswordEmail: '',
};

const userInfoSlice = createSlice({
  name: 'USER_INFO_SLICE',
  initialState,
  reducers: {
    setUserLoggedIn: (state, action) => {
        state.isAuth = action.payload;
    },
    setIsLoading: (state, action) => {
        state.isLoading = action.payload
    },
    saveRegistrationData: (state, action) => {
      state.registerUser = action.payload;
    },
    saveChangedPassword: (state, action) => {
        state.newPassword = action.payload;
    },
    savePasswordRecoveryEmail: (state, action) => {
        state.resetPasswordEmail = action.payload;
    },
  },
});

const { actions, reducer } = userInfoSlice;

export const {
    setUserLoggedIn,
    setIsLoading,
    saveRegistrationData,
    saveChangedPassword,
    savePasswordRecoveryEmail,
} = actions;

export default reducer;
