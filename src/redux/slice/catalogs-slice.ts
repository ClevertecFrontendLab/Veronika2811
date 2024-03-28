import { createSlice } from '@reduxjs/toolkit';

import {
    CatalogTariffListResponse,
    CatalogTrainingListResponse,
} from '@/types/catalogs/catalogs-api-data-types';

type TInitialState = {
    catalogTrainingList: CatalogTrainingListResponse[];
    catalogTariffList: CatalogTariffListResponse[];
};

const initialState: TInitialState = {
    catalogTrainingList: [],
    catalogTariffList: [],
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
    },
});

const { actions, reducer: reducerCatalogs } = catalogsSlice;

export const { setCatalogTrainingList, setCatalogTariffList } = actions;

export default reducerCatalogs;
