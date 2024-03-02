import { FeedbacksProps } from './types/feedbacksTypes';

import { FeedbacksDefault } from './components/FeedbacksDefault';
import { FeedbacksList } from '@components/FeedbacksContent/components/FeedbacksList';

export const FeedbacksContent = ({ feedbacksList, refetch }: FeedbacksProps) => {
    if (!feedbacksList.length) {
        return <FeedbacksDefault refetch={refetch} />;
    }

    return <FeedbacksList feedbacksList={feedbacksList} refetch={refetch} />;
};
