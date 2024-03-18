import { createSlice } from '@reduxjs/toolkit';

import { CatalogTrainingList } from '@redux/api/catalogs.api';

type TInitialState = {
    catalogTrainingList: CatalogTrainingList[];
};

const initialState: TInitialState = {
    catalogTrainingList: [],
};

const catalogsSlice = createSlice({
    name: 'CATALOGS_SLICE',
    initialState,
    reducers: {
        setCatalogTrainingList: (state, action) => {
            state.catalogTrainingList = action.payload;
        },
    },
});

const { actions, reducer: reducerCatalogs } = catalogsSlice;

export const { setCatalogTrainingList } = actions;

export default reducerCatalogs;
