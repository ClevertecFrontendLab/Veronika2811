import { FC } from 'react';
import { FeedbacksList } from '@components/feedbacks-content/components/feedbacks-list';

import { FeedbacksDefault } from './components/feedbacks-default';
import { FeedbacksProps } from './types/feedbacks-types';

export const FeedbacksContent: FC<FeedbacksProps> = ({ feedbacksList }) => {
    if (!feedbacksList.length) {
        return <FeedbacksDefault />;
    }

    return <FeedbacksList feedbacksList={feedbacksList} />;
};
