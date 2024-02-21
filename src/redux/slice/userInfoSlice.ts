import { createSlice } from '@reduxjs/toolkit';

interface TInitialState {
    registerUser: {
        email: string,
        password: string,
    },
    userAuth: boolean,
}

const initialState: TInitialState = {
    registerUser: {
        email: '',
        password: '',
    },
    userAuth: !!localStorage.getItem('token'),
};

const userInfoSlice = createSlice({
  name: 'USER_INFO_SLICE',
  initialState,
  reducers: {
    registerUserCredentials: (state, action) => {
      state.registerUser = action.payload;
    },
    clearUserCredentials: (state) => {
      state.registerUser = initialState.registerUser;
    },
    changeUserAuth: (state, action) => {
        state.userAuth = action.payload;
    },
  },
});

const { actions, reducer } = userInfoSlice;

export const {
    registerUserCredentials,
    clearUserCredentials,
    changeUserAuth,
} = actions;

export default reducer;
