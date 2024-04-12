import { FC } from 'react';
import { FeedbacksList } from '@components/feedbacks-content/components/feedbacks-list';
import { isArrayWithItems } from '@utils/is-array-with-items';

import { FeedbacksDefault } from './components/feedbacks-default';
import { FeedbacksProps } from './types/feedbacks-types';

export const FeedbacksContent: FC<FeedbacksProps> = ({ feedbacksList }) => {
    if (!isArrayWithItems(feedbacksList)) {
        return <FeedbacksDefault />;
    }

    return <FeedbacksList feedbacksList={feedbacksList} />;
};
