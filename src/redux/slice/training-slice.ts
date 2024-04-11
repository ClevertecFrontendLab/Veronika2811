import { CurrentTraining } from '@components/calendar-custom/types/current-training';
import { createSlice } from '@reduxjs/toolkit';

import { Nullebel } from '@/types/nullebel';
import { TrainingCurrentEditData, TrainingResponse } from '@/types/training';
import { EditTrainingInfo } from '@/types/training/training-types';

type TInitialState = {
    userTrainingList: TrainingResponse[];
    userTrainingListError: Nullebel<string>;
    isModalVisible: boolean;
    isEditMode: boolean;
    editTraining: EditTrainingInfo;
    isDrawerVisible: boolean;
    typeTraining: Nullebel<string>;
    currentTraining: Nullebel<CurrentTraining[]>;
    editTrainingData: Nullebel<TrainingCurrentEditData>;
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
    editTrainingData: null,
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
        setEditTrainingData: (state, action) => {
            state.editTrainingData = action.payload;
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
    setEditTrainingData,
    resetEditMode,
    resetState,
} = actions;

export default reducerTraining;
