import { Feedback } from '@/types/feedbacks';

export type FeedbacksRefetch = {
    refetch: () => void;
};

export type FeedbacksProps = FeedbacksRefetch & {
    feedbacksList: Feedback[];
};
