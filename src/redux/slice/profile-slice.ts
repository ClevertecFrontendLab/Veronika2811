import { createSlice } from '@reduxjs/toolkit';

import { UserInfoResponse } from '@/types/user/user-api-data-types';

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
    },
});

const { actions, reducer: reducerProfile } = profileSlice;

export const { setCurrentUserInfo } = actions;

export default reducerProfile;
