import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Moment } from 'moment';

import { CurrentTraining } from '@components/CalendarCustom/types/currentTraining';

import { BASE_URL } from './constants/baseUrl';
import prepareHeaders from './utils/prepareHeaders';

import { TrainingEditData, TrainingResponse } from '@/types/training/trainingApiDataTypes';

export const trainingApi = createApi({
    reducerPath: 'TRAINING_API',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders,
    }),
    endpoints: (build) => ({
        getUserTrainingData: build.query<TrainingResponse[], void>({
            query: () => '/training',
        }),
        addUserTraining: build.mutation<
            TrainingResponse,
            {
                name: string | null;
                date: Moment;
                exercises: CurrentTraining[] | null;
            }
        >({
            query: (body) => ({
                url: '/training',
                method: 'POST',
                body: body,
            }),
        }),
        editUserTraining: build.mutation<
            TrainingResponse,
            { trainingId: string; body: TrainingEditData }
        >({
            query: ({ trainingId, body }) => ({
                url: `/training/${trainingId}`,
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
