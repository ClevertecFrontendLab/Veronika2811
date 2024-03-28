import { createSlice } from '@reduxjs/toolkit';

type TInitialState = {
    currentTab: 'workouts' | 'joint-training' | 'marathons';
};

const initialState: TInitialState = {
    currentTab: 'workouts',
};

const workoutsSlice = createSlice({
    name: 'WORKOUTS_SLICE',
    initialState,
    reducers: {
        setCurrentTab: (state, action) => {
            state.currentTab = action.payload;
        },
    },
});

const { actions, reducer: reducerWorkouts } = workoutsSlice;

export const { setCurrentTab } = actions;

export default reducerWorkouts;
