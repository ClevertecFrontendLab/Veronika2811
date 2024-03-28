import { BaseQueryApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query';

import { BASE_URL } from '../constants/base-url';

import prepareHeaders from './prepare-headers';

export const authBaseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
});

const mainBaseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders,
});

export const baseQuery = async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: { auth?: boolean },
) => {
    if (extraOptions && extraOptions.auth) return authBaseQuery(args, api, extraOptions);

    return mainBaseQuery(args, api, extraOptions);
};
