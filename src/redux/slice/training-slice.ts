import { CurrentTraining } from '@components/calendar-custom/types/current-training';
import { createSlice } from '@reduxjs/toolkit';

import { TrainingResponse } from '@/types/training/training-api-data-types';
import { EditTrainingInfo } from '@/types/training/training-types';

type TInitialState = {
    userTrainingList: TrainingResponse[];
    userTrainingListError: string | null;
    isModalVisible: boolean;
    isEditMode: boolean;
    editTraining: EditTrainingInfo;
    isDrawerVisible: boolean;
    typeTraining: string | null;
    currentTraining: CurrentTraining[] | null;
};

const initialState: TInitialState = {
    userTrainingList: [],
    userTrainingListError: null,
    isModalVisible: false,
    isEditMode: false,
    editTraining: null,
    isDrawerVisible: false,
    typeTraining: null,
    currentTraining: null,
};

const trainingSlice = createSlice({
    name: 'TRAINING_SLICE',
    initialState,
    reducers: {
        setUserTrainingList: (state, action) => {
            state.userTrainingList = action.payload;
        },
        setUserTrainingListError: (state, action) => {
            state.userTrainingListError = action.payload;
        },
        setModalVisible: (state, action) => {
            state.isModalVisible = action.payload;
        },
        setEditMode: (state, action) => {
            state.isEditMode = action.payload;
        },
        setEditTraining: (state, action) => {
            state.editTraining = action.payload;
        },
        setDrawerVisible: (state, action) => {
            state.isDrawerVisible = action.payload;
        },
        setTypeTraining: (state, action) => {
            state.typeTraining = action.payload;
        },
        setCurrentTraining: (state, action) => {
            state.currentTraining = action.payload;
        },
        resetEditMode: (state) => {
            Object.assign(state, {
                isEditMode: initialState.isEditMode,
                typeTraining: initialState.typeTraining,
                currentTraining: initialState.currentTraining,
            });
        },
        resetState: (state) => {
            Object.assign(state, {
                ...initialState,
                userTrainingList: state.userTrainingList,
            });
        },
    },
});

const { actions, reducer: reducerTraining } = trainingSlice;

export const {
    setUserTrainingList,
    setUserTrainingListError,
    setModalVisible,
    setEditMode,
    setEditTraining,
    setDrawerVisible,
    setTypeTraining,
    setCurrentTraining,
    resetEditMode,
    resetState,
} = actions;

export default reducerTraining;
