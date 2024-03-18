import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from './constants/baseUrl';
import prepareHeaders from './utils/prepareHeaders';

import { ErrorTypes } from '@/types/errorTypes';
import { Feedback, FeedbackData } from '@/types/feedbacks';

export const feedbacksApi = createApi({
    reducerPath: 'FEEDBACKS_API',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: 'include',
        prepareHeaders,
    }),
    endpoints: (build) => ({
        getFeedbacks: build.query<Feedback[], void>({
            query: () => '/feedback',
            transformResponse: (baseQueryReturnValue: Feedback[]) => {
                const sortedFeedbacks = baseQueryReturnValue.sort(
                    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
                );

                return sortedFeedbacks;
            },
        }),
        addFeedback: build.mutation<ErrorTypes, FeedbackData>({
            query: (body) => ({
                url: '/feedback',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useLazyGetFeedbacksQuery, useAddFeedbackMutation } = feedbacksApi;
