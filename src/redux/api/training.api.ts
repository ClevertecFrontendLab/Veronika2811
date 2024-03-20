import { ApiEndpoints } from './constants/api-endpoints';
import emptyApi from './empty-api';

import {
    TrainingAddData,
    TrainingEditData,
    TrainingResponse,
} from '@/types/training/training-api-data-types';

export const trainingApi = emptyApi.injectEndpoints({
    endpoints: (build) => ({
        getUserTrainingData: build.query<TrainingResponse[], void>({
            query: () => ApiEndpoints.TRAINING,
        }),
        addUserTraining: build.mutation<TrainingResponse, TrainingAddData>({
            query: (body) => ({
                url: ApiEndpoints.TRAINING,
                method: 'POST',
                body,
            }),
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
