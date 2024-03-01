import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from './constants/baseUrl';

import { RootState } from '@redux/store';
import { Feedback, FeedbackData } from '@src/types/feedbacks';
import { ErrorTypes } from '@src/types/errorTypes';

export const feedbacksApi = createApi({
    reducerPath: 'FEEDBACKS_SLICE',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}`,
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const accessToken =
                (getState() as RootState).authSlice.accessToken;
            if (!accessToken) {
                throw new Error('Отсутствует токен доступа');
            }

            headers.set('Authorization', `Bearer ${accessToken}`);

            return headers;
        },
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
