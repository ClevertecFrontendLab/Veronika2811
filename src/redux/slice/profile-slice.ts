import { createSlice } from '@reduxjs/toolkit';

import { UserInfoResponse } from '@/types/profile/profile-api-data-types';

type TInitialState = {
    currentUserInfo: UserInfoResponse;
};

const initialState: TInitialState = {
    currentUserInfo: {
        email: '',
        firstName: '',
        lastName: '',
        birthday: '',
        imgSrc: '',
        readyForJointTraining: false,
        sendNotification: false,
        tariff: {
            tariffId: '',
            expired: '',
        },
    },
};

const profileSlice = createSlice({
    name: 'PROFILE_SLICE',
    initialState,
    reducers: {
        setCurrentUserInfo: (state, action) => {
            state.currentUserInfo = action.payload;
        },
        resetCurrentUserInfo: (state) => {
            Object.assign(state, {
                ...initialState,
                currentUserInfo: state.currentUserInfo,
            });
        },
    },
});

const { actions, reducer: reducerProfile } = profileSlice;

export const { setCurrentUserInfo, resetCurrentUserInfo } = actions;

export default reducerProfile;
