import { WORKOUTS_TABS } from '@constants/workouts/workouts-tabs';
import { createSlice } from '@reduxjs/toolkit';

import { CatalogTrainingPalsResponse } from '@/types/catalogs';
import { Nullebel } from '@/types/nullebel';

type TInitialState = {
    currentTab:
        | typeof WORKOUTS_TABS.workouts
        | typeof WORKOUTS_TABS.joinTraining
        | typeof WORKOUTS_TABS.marathons;
    selectedUser: Nullebel<CatalogTrainingPalsResponse>;
};

const initialState: TInitialState = {
    currentTab: WORKOUTS_TABS.workouts,
    selectedUser: null,
};

const workoutsSlice = createSlice({
    name: 'WORKOUTS_SLICE',
    initialState,
    reducers: {
        setCurrentTab: (state, action) => {
            state.currentTab = action.payload;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
    },
});

const { actions, reducer: reducerWorkouts } = workoutsSlice;

export const { setCurrentTab, setSelectedUser } = actions;

export default reducerWorkouts;
