import { Feedback } from '@src/types/feedbacks';

export type FeedbacksRefetch = {
    refetch: () => void;
}

export type FeedbacksProps = FeedbacksRefetch & {
    feedbacksList: Feedback[];
}
