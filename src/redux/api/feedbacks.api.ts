import { ApiEndpoints } from './constants/api-endpoints';
import emptyApi from './empty-api';

import { ErrorTypeResponse } from '@/types/error-types';
import { FeedbackData, FeedbackResponse } from '@/types/feedbacks';

export const feedbacksApi = emptyApi.injectEndpoints({
    endpoints: (build) => ({
        getFeedbacks: build.query<FeedbackResponse[], void>({
            query: () => ApiEndpoints.FEEDBACK,

            transformResponse: (baseQueryReturnValue: FeedbackResponse[]) => {
                const sortedFeedbacks = baseQueryReturnValue.sort(
                    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
                );

                return sortedFeedbacks;
            },
        }),
        addFeedback: build.mutation<ErrorTypeResponse, FeedbackData>({
            query: (body) => ({
                url: ApiEndpoints.FEEDBACK,
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useLazyGetFeedbacksQuery, useAddFeedbackMutation } = feedbacksApi;
