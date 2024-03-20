import { ApiEndpoints } from './constants/api-endpoints';
import emptyApi from './empty-api';

import { UserInfoData, UserInfoResponse } from '@/types/user/user-api-data-types';

export const userApi = emptyApi.injectEndpoints({
    endpoints: (build) => ({
        getCurrentUserInfo: build.query<UserInfoResponse, void>({
            query: () => ApiEndpoints.USER_ME,
        }),
        updateCurrentUserInfo: build.query<UserInfoResponse, UserInfoData>({
            query: () => ApiEndpoints.USER,
        }),
    }),
});

export const { useGetCurrentUserInfoQuery } = userApi;
