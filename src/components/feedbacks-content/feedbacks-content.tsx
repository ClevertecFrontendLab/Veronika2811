import { FeedbacksList } from '@components/feedbacks-content/components/feedbacks-list';

import { FeedbacksDefault } from './components/feedbacks-default';
import { FeedbacksProps } from './types/feedbacks-types';

export const FeedbacksContent = ({ feedbacksList, refetch }: FeedbacksProps) => {
    if (!feedbacksList.length) {
        return <FeedbacksDefault refetch={refetch} />;
    }

    return <FeedbacksList feedbacksList={feedbacksList} refetch={refetch} />;
};
