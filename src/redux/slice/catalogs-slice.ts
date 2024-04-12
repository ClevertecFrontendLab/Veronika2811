import { createSlice } from '@reduxjs/toolkit';

import {
    CatalogTariffListResponse,
    CatalogTrainingListResponse,
    CatalogTrainingPalsResponse,
} from '@/types/catalogs';

type TInitialState = {
    catalogTrainingList: CatalogTrainingListResponse[];
    catalogTariffList: CatalogTariffListResponse[];
    userJoinTrainingList: CatalogTrainingPalsResponse[];
    trainingPals: CatalogTrainingPalsResponse[];
};

const initialState: TInitialState = {
    catalogTrainingList: [],
    catalogTariffList: [],
    userJoinTrainingList: [],
    trainingPals: [],
};

const catalogsSlice = createSlice({
    name: 'CATALOGS_SLICE',
    initialState,
    reducers: {
        setCatalogTrainingList: (state, action) => {
            state.catalogTrainingList = action.payload;
        },
        setCatalogTariffList: (state, action) => {
            state.catalogTariffList = action.payload;
        },
        setCatalogUserJoinTrainingList: (state, action) => {
            state.userJoinTrainingList = action.payload;
        },
        setCatalogUserJointTrainingStatus: (state, action) => {
            const { id, status } = action.payload;

            state.userJoinTrainingList = state.userJoinTrainingList.map((el) =>
                el.id === id ? { ...el, status } : el,
            );
        },
        setCatalogTrainingPals: (state, action) => {
            state.trainingPals = action.payload;
        },
        deleteCatalogTrainingPals: (state, action) => {
            const { inviteId } = action.payload;

            state.trainingPals = state.trainingPals.filter((el) => el.inviteId !== inviteId);
        },
    },
});

const { actions, reducer: reducerCatalogs } = catalogsSlice;

export const {
    setCatalogTrainingList,
    setCatalogTariffList,
    setCatalogUserJoinTrainingList,
    setCatalogUserJointTrainingStatus,
    setCatalogTrainingPals,
    deleteCatalogTrainingPals,
} = actions;

export default reducerCatalogs;
