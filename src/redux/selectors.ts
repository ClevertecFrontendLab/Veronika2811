import { RootState } from './store';

export const previousLocationSelector = (state: RootState) => state.router.previousLocations;

export const authSelector = (state: RootState) => state.authSlice;

export const mainSelector = (state: RootState) => state.mainSlice;

export const trainingSelector = (state: RootState) => state.trainingSlice;

export const catalogSelector = (state: RootState) => state.catalogSlice;

export const workoutsSelector = (state: RootState) => state.workoutsSlice;

export const profileSelector = (state: RootState) => state.profileSlice;

export const inviteSelector = (state: RootState) => state.inviteSlice;
