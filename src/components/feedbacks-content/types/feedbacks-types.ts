import { FeedbackResponse } from '@/types/feedbacks';

export type FeedbacksRefetch = {
    refetch: () => void;
};

export type FeedbacksProps = {
    feedbacksList: FeedbackResponse[];
};
