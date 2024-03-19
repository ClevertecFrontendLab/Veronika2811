import { RootState } from './store';

export const previousLocationSelector = (state: RootState) => state.router.previousLocations;

export const authSlice = (state: RootState) => state.authSlice;

export const mainSlice = (state: RootState) => state.mainSlice;

export const trainingSlice = (state: RootState) => state.trainingSlice;

export const catalogTrainingListSelector = (state: RootState) =>
    state.catalogSlice.catalogTrainingList;
