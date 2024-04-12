import { setAlertApp, setIsLoading } from '@redux/slice/main-slice';
import { setCurrentUserInfo } from '@redux/slice/profile-slice';

import { ApiEndpoints } from './constants/api-endpoints';
import emptyApi from './empty-api';

import { UserInfoData, UserInfoResponse } from '@/types/profile';

export const userApi = emptyApi.injectEndpoints({
    endpoints: (build) => ({
        getCurrentUserInfo: build.query<UserInfoResponse, void>({
            query: () => ApiEndpoints.USER_ME,
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setIsLoading(true));
                    const { data } = await queryFulfilled;

                    dispatch(setCurrentUserInfo(data));
                    dispatch(setIsLoading(false));
                } catch (err) {
                    dispatch(setIsLoading(false));
                }
            },
        }),
        updateCurrentUserInfo: build.mutation<UserInfoResponse, UserInfoData>({
            query: (body) => ({
                url: ApiEndpoints.USER,
                method: 'PUT',
                body,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setIsLoading(true));
                    const { data } = await queryFulfilled;

                    dispatch(setCurrentUserInfo(data));
                    dispatch(
                        setAlertApp({
                            message: 'Данные профиля успешно обновлены',
                            type: 'success',
                            testIds: 'alert',
                        }),
                    );
                    dispatch(setIsLoading(false));
                } catch (err) {
                    dispatch(setIsLoading(false));
                }
            },
        }),
    }),
});

export const {
    useLazyGetCurrentUserInfoQuery,
    useGetCurrentUserInfoQuery,
    useUpdateCurrentUserInfoMutation,
} = userApi;
