import { createSlice } from '@reduxjs/toolkit';

type TInitialState = {
    activeMenuKey: [string];
    isLoading: boolean;
};

const initialState: TInitialState = {
    activeMenuKey: [''],
    isLoading: false,
};

const mainSlice = createSlice({
    name: 'MAIN_SLICE',
    initialState,
    reducers: {
        setActiveMenuKey: (state, action) => {
            state.activeMenuKey = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

const { actions, reducer: reducerMain } = mainSlice;

export const { setActiveMenuKey, setIsLoading } = actions;

export default reducerMain;
