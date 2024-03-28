import { setIsLoading } from '@redux/slice/main-slice';

import { ApiEndpoints } from './constants/api-endpoints';
import emptyApi from './empty-api';

import {
    CheckEmailResponse,
    EmailData,
    EmailVerificationData,
    LoginData,
    LoginResponse,
    PasswordConfirmationData,
    RegistrationData,
} from '@/types/auth';
import { ErrorTypeResponse } from '@/types/error-types';

const commonExtraOptions = {
    auth: true,
};

export const authApi = emptyApi.injectEndpoints({
    endpoints: (build) => ({
        loginUser: build.mutation<LoginResponse, LoginData>({
            query: (body: LoginData) => ({
                url: ApiEndpoints.AUTH_LOGIN,
                method: 'POST',
                body,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                dispatch(setIsLoading(true));
                try {
                    await queryFulfilled;
                    dispatch(setIsLoading(false));
                } catch (err) {
                    dispatch(setIsLoading(false));
                }
            },
            extraOptions: commonExtraOptions,
        }),
        registerUser: build.mutation<ErrorTypeResponse, RegistrationData>({
            query: (body: RegistrationData) => ({
                url: ApiEndpoints.AUTH_REGISTRATION,
                method: 'POST',
                body,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                dispatch(setIsLoading(true));
                try {
                    await queryFulfilled;
                    dispatch(setIsLoading(false));
                } catch (err) {
                    dispatch(setIsLoading(false));
                }
            },
            extraOptions: commonExtraOptions,
        }),
        checkEmailExistence: build.mutation<CheckEmailResponse, EmailData>({
            query: (body: { email: string }) => ({
                url: ApiEndpoints.AUTH_CHECK_EMAIL,
                method: 'POST',
                body,
            }),
            extraOptions: commonExtraOptions,
        }),
        checkVerificationCode: build.mutation<CheckEmailResponse, EmailVerificationData>({
            query: (body: EmailVerificationData) => ({
                url: ApiEndpoints.AUTH_CONFIRM_EMAIL,
                method: 'POST',
                body,
            }),
            extraOptions: commonExtraOptions,
        }),
        updatePassword: build.mutation<CheckEmailResponse, PasswordConfirmationData>({
            query: (body: PasswordConfirmationData) => ({
                url: ApiEndpoints.AUTH_CHANGE_PASSWORD,
                method: 'POST',
                body,
            }),
            extraOptions: commonExtraOptions,
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useCheckEmailExistenceMutation,
    useCheckVerificationCodeMutation,
    useUpdatePasswordMutation,
} = authApi;
