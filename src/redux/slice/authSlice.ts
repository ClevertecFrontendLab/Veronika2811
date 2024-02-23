import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { AUTH_BASE_URL, LOGIN, REGISTRATION } from '@constants/authConstants/auth';
import { AuthError, LoginData, RegistrationData } from '@interfaces/auth/authForm';
import {
    CheckEmailResponse,
    EmailVerificationData,
    LoginResponse,
    PasswordConfirmationData,
} from '@interfaces/auth/authSliceTypes';

export const authSlice = createApi({
    reducerPath: 'AUTH_SLICE',
    baseQuery: fetchBaseQuery({
        baseUrl: AUTH_BASE_URL,
        credentials: 'include',
    }),
    endpoints: (build) => ({
        registerUser: build.mutation<AuthError, RegistrationData>({
            query: (body: RegistrationData) => ({
                url: `/${REGISTRATION}`,
                method: 'POST',
                body,
            }),
        }),
        loginUser: build.mutation<LoginResponse, LoginData>({
            query: (body: LoginData) => ({
                url: `/${LOGIN}`,
                method: 'POST',
                body,
            }),
        }),
        checkEmailExistence: build.mutation<CheckEmailResponse, { email: string }>({
            query: (body: { email: string }) => ({
                url: '/check-email',
                method: 'POST',
                body,
            }),
        }),
        checkVerificationCode: build.mutation<CheckEmailResponse, EmailVerificationData>({
            query: (body: EmailVerificationData) => ({
                url: '/confirm-email',
                method: 'POST',
                body,
            }),
        }),
        updatePassword: build.mutation<CheckEmailResponse, PasswordConfirmationData>({
            query: (body: PasswordConfirmationData) => ({
                url: '/change-password',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useCheckEmailExistenceMutation,
    useCheckVerificationCodeMutation,
    useUpdatePasswordMutation,
} = authSlice;
