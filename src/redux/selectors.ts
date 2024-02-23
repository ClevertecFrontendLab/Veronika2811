import { RootState } from './store';

export const registrationUserDataSelector = (state: RootState) => state.userInfoSlice.registerUser;
export const newPasswordSelector = (state: RootState) => state.userInfoSlice.newPassword;
export const verificationEmailSelector = (state: RootState) => state.userInfoSlice.verificationEmail;
export const isLoadingSelector = (state: RootState) => state.userInfoSlice.isLoading;
export const authUserSelector = (state: RootState) => state.userInfoSlice.isAuthUser;

export const previousLocationSelector = (state: RootState) => state.router.previousLocations;
