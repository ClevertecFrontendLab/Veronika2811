import { createSlice } from '@reduxjs/toolkit';
import { AlertProps } from 'antd';

import { Nullebel } from '@/types/nullebel';

type TInitialState = {
    isLoading: boolean;
    alertApp: Nullebel<{
        message: string;
        type: AlertProps['type'];
        testIds: string;
        container?: Element | DocumentFragment;
    }>;
};

const initialState: TInitialState = {
    isLoading: false,
    alertApp: null,
};

const mainSlice = createSlice({
    name: 'MAIN_SLICE',
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setAlertApp: (state, action) => {
            state.alertApp = action.payload;
        },
    },
});

const { actions, reducer: reducerMain } = mainSlice;

export const { setIsLoading, setAlertApp } = actions;

export default reducerMain;
