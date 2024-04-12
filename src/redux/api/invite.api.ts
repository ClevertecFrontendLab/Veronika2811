import { TrainingInviteStatus } from '@constants/invite/training-invite-status';
import {
    deleteCatalogTrainingPals,
    setCatalogUserJointTrainingStatus,
} from '@redux/slice/catalogs-slice';
import { deleteInvite, setInviteList } from '@redux/slice/invite-slice';
import { setIsLoading } from '@redux/slice/main-slice';

import { ApiEndpoints } from './constants/api-endpoints';
import emptyApi from './empty-api';

import { ErrorTypeResponse } from '@/types/error-types';
import {
    InviteData,
    InviteIdData,
    InviteResponse,
    InviteStatusData,
    TrainingInviteResponse,
} from '@/types/invite';

export const inviteApi = emptyApi.injectEndpoints({
    endpoints: (build) => ({
        getInvite: build.query<InviteResponse[], void>({
            query: () => ApiEndpoints.INVITE,

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setIsLoading(true));
                    const { data } = await queryFulfilled;

                    dispatch(setInviteList(data));
                    dispatch(setIsLoading(false));
                } catch {
                    dispatch(setIsLoading(false));
                }
            },
        }),
        postInvite: build.mutation<TrainingInviteResponse, InviteData>({
            query: (body) => ({
                url: ApiEndpoints.INVITE,
                method: 'POST',
                body,
            }),

            async onQueryStarted({ to }, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setIsLoading(true));
                    await queryFulfilled;

                    dispatch(
                        setCatalogUserJointTrainingStatus({
                            id: to,
                            status: TrainingInviteStatus.PENDING,
                        }),
                    );
                    dispatch(setIsLoading(false));
                } catch {
                    dispatch(setIsLoading(false));
                }
            },
        }),
        respondToInvite: build.mutation<TrainingInviteResponse, InviteStatusData>({
            query: (body) => ({
                url: ApiEndpoints.INVITE,
                method: 'PUT',
                body,
            }),
            async onQueryStarted({ id, status }, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setIsLoading(true));
                    await queryFulfilled;

                    dispatch(deleteInvite(id));
                    dispatch(setCatalogUserJointTrainingStatus({ id, status }));
                    dispatch(setIsLoading(false));
                } catch {
                    dispatch(setIsLoading(false));
                }
            },
        }),
        deleteInvite: build.mutation<ErrorTypeResponse, InviteIdData>({
            query: ({ inviteId }) => ({
                url: `${ApiEndpoints.INVITE}/${inviteId}`,
                method: 'DELETE',
            }),
            async onQueryStarted(inviteId, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setIsLoading(true));
                    await queryFulfilled;

                    dispatch(deleteCatalogTrainingPals(inviteId));
                    dispatch(setIsLoading(false));
                } catch {
                    dispatch(setIsLoading(false));
                }
            },
        }),
    }),
});

export const {
    useGetInviteQuery,
    usePostInviteMutation,
    useRespondToInviteMutation,
    useDeleteInviteMutation,
} = inviteApi;
