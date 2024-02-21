import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { auth } from '@constants/index';

interface AuthenticationData {
    email: string;
    password: string;
    remember?: boolean;
}

// LOGIN RESPONSE
interface LoginSuccessResponse {
    accessToken: string;
}

interface LoginErrorResponse {
    statusCode: number;
    error: string;
    message: string;
}

type LoginResponse = LoginSuccessResponse | LoginErrorResponse;

// REGISTER RESPONSE
interface RegistrationErrorResponse {
    statusCode: number;
    error: string;
    message: string;
}

export const authSlice = createApi({
    reducerPath: 'AUTH_SLICE',
    baseQuery: fetchBaseQuery({
        baseUrl: auth.AUTH_BASE_URL,
    }),
    endpoints: (build) => ({
        registrationUser: build.mutation<RegistrationErrorResponse, AuthenticationData>({
            query: (data: AuthenticationData) => ({
                url: `/${auth.REGISTRATION}`,
                method: 'POST',
                body: data,
            }),
        }),
        loginUser: build.mutation<LoginResponse, AuthenticationData>({
            query: (data: AuthenticationData) => ({
                url: `/${auth.LOGIN}`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useRegistrationUserMutation, useLoginUserMutation } = authSlice;
