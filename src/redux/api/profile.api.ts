import { setIsLoading } from '@redux/slice/main-slice';
import { setCurrentUserInfo } from '@redux/slice/profile-slice';

import { ApiEndpoints } from './constants/api-endpoints';
import emptyApi from './empty-api';

import { UserInfoData, UserInfoResponse } from '@/types/user/user-api-data-types';

export const userApi = emptyApi.injectEndpoints({
    endpoints: (build) => ({
        getCurrentUserInfo: build.query<UserInfoResponse, void>({
            query: () => ApiEndpoints.USER_ME,
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                dispatch(setIsLoading(true));
                try {
                    const { data } = await queryFulfilled;

                    dispatch(setCurrentUserInfo(data));
                    dispatch(setIsLoading(false));
                } catch (err) {
                    dispatch(setIsLoading(false));
                }
            },
        }),
        updateCurrentUserInfo: build.mutation<UserInfoResponse, UserInfoData>({
            query: () => ApiEndpoints.USER,
        }),
    }),
});

export const { useLazyGetCurrentUserInfoQuery, useUpdateCurrentUserInfoMutation } = userApi;
