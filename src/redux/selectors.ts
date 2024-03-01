import { RootState } from './store';

export const registrationUserDataSelector = (state: RootState) => state.authSlice.registerUser;
export const newPasswordSelector = (state: RootState) => state.authSlice.newPassword;
export const verificationEmailSelector = (state: RootState) => state.authSlice.verificationEmail;
export const isLoadingSelector = (state: RootState) => state.authSlice.isLoading;
export const accessTokenSelector = (state: RootState) => state.authSlice.accessToken;

export const previousLocationSelector = (state: RootState) => state.router.previousLocations;
