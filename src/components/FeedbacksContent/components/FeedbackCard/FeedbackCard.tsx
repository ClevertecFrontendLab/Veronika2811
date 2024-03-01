import { Card } from 'antd';

import { RatingReviewContent } from '../RatingReviewContent';
import { AuthorInfo } from '../AuthorInfo';

import { Feedback } from '@src/types/feedbacks';

import styles from './FeedbackCard.module.scss';

export const FeedbackCard = ({ feedback }: { feedback: Feedback }) => {
    return (
        <Card bordered={false} className={styles['feedback-card']}>
            <Card.Grid className={styles['feedback-card-author']}>
                <AuthorInfo feedback={feedback} />
            </Card.Grid>
            <Card.Grid hoverable={false} className={styles['feedback-card-comment']}>
                <RatingReviewContent feedback={feedback} />
            </Card.Grid>
        </Card>
    );
};
