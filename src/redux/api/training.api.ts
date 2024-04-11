import { setIsLoading } from '@redux/slice/main-slice';
import { setUserTrainingList } from '@redux/slice/training-slice';

import { ApiEndpoints } from './constants/api-endpoints';
import emptyApi from './empty-api';

import { TrainingAddData, TrainingEditData, TrainingResponse } from '@/types/training';

export const trainingApi = emptyApi.injectEndpoints({
    endpoints: (build) => ({
        getUserTrainingData: build.query<TrainingResponse[], void>({
            query: () => ApiEndpoints.TRAINING,

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setIsLoading(true));
                    const { data } = await queryFulfilled;

                    dispatch(setUserTrainingList(data));
                    dispatch(setIsLoading(false));
                } catch (err) {
                    dispatch(setIsLoading(false));
                }
            },
        }),
        addUserTraining: build.mutation<TrainingResponse, TrainingAddData>({
            query: (body) => ({
                url: ApiEndpoints.TRAINING,
                method: 'POST',
                body,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    dispatch(setIsLoading(true));
                    const { data } = await queryFulfilled;

                    dispatch(setUserTrainingList(data));
                    dispatch(setIsLoading(false));
                } catch (err) {
                    dispatch(setIsLoading(false));
                }
            },
        }),
        editUserTraining: build.mutation<TrainingResponse, TrainingEditData>({
            query: ({ trainingId, body }) => ({
                url: `${ApiEndpoints.TRAINING}/${trainingId}`,
                method: 'PUT',
                body,
            }),
        }),
    }),
});

export const {
    useLazyGetUserTrainingDataQuery,
    useGetUserTrainingDataQuery,
    useAddUserTrainingMutation,
    useEditUserTrainingMutation,
} = trainingApi;
