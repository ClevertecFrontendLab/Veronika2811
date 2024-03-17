import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from './constants/baseUrl';

import { Paths } from '@routes/constants/Paths';
import {
    CheckEmailResponse,
    EmailData,
    EmailVerificationData,
    LoginData,
    LoginResponse,
    PasswordConfirmationData,
    RegistrationData,
} from '@/types/auth';
import { ErrorTypes } from '@/types/errorTypes';
import { LOGIN, REGISTRATION } from '@constants/auth/authConstants';

export const authApi = createApi({
    reducerPath: 'AUTH_API',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}${Paths.AUTH_MAIN}`,
        credentials: 'include',
    }),
    endpoints: (build) => ({
        registerUser: build.mutation<ErrorTypes, RegistrationData>({
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
        checkEmailExistence: build.mutation<CheckEmailResponse, EmailData>({
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
} = authApi;
