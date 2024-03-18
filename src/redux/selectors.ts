import { RootState } from './store';

export const previousLocationSelector = (state: RootState) => state.router.previousLocations;

export const registrationUserDataSelector = (state: RootState) => state.authSlice.registerUser;
export const newPasswordSelector = (state: RootState) => state.authSlice.newPassword;
export const verificationEmailSelector = (state: RootState) => state.authSlice.verificationEmail;
export const accessTokenSelector = (state: RootState) => state.authSlice.accessToken;

export const activeKeyMenuSelector = (state: RootState) => state.mainSlice.activeMenuKey;
export const isLoadingSelector = (state: RootState) => state.mainSlice.isLoading;

export const userTrainingListSelector = (state: RootState) => state.trainingSlice.userTrainingList;
export const userTrainingListErrorSelector = (state: RootState) =>
    state.trainingSlice.userTrainingListError;
export const isModalVisibleSelector = (state: RootState) => state.trainingSlice.isModalVisible;
export const isEditModeSelector = (state: RootState) => state.trainingSlice.isEditMode;
export const editTrainingSelector = (state: RootState) => state.trainingSlice.editTraining;
export const isDrawerVisibleSelector = (state: RootState) => state.trainingSlice.isDrawerVisible;
export const typeTrainingSelector = (state: RootState) => state.trainingSlice.typeTraining;
export const currentTrainingSelector = (state: RootState) => state.trainingSlice.currentTraining;

export const catalogTrainingListSelector = (state: RootState) =>
    state.catalogSlice.catalogTrainingList;
