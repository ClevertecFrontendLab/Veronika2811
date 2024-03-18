import { FeedbacksList } from '@components/FeedbacksContent/components/FeedbacksList';

import { FeedbacksDefault } from './components/FeedbacksDefault';
import { FeedbacksProps } from './types/feedbacksTypes';

export const FeedbacksContent = ({ feedbacksList, refetch }: FeedbacksProps) => {
    if (!feedbacksList.length) {
        return <FeedbacksDefault refetch={refetch} />;
    }

    return <FeedbacksList feedbacksList={feedbacksList} refetch={refetch} />;
};
