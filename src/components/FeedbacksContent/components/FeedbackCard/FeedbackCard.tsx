import { Card, Comment, Rate, Typography } from 'antd';

import { characterRender } from '@components/FeedbacksContent/utils/characterRateRender';

import { AuthorInfo } from '../AuthorInfo';

import { Feedback } from '@/types/feedbacks';

import styles from './FeedbackCard.module.less';

export const FeedbackCard = ({ feedback }: { feedback: Feedback }) => {
    const date = new Date(feedback.createdAt);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const formattedDate = `${day}.${month}.${year}`;

    return (
        <Card bordered={false} className={styles['feedback-card']}>
            <Comment
                avatar={<AuthorInfo feedback={feedback} />}
                author={
                    <Rate
                        value={feedback.rating}
                        disabled
                        character={({ index }) => characterRender(index, feedback.rating)}
                    />
                }
                datetime={formattedDate}
                content={<Typography.Paragraph>{feedback.message}</Typography.Paragraph>}
            />
        </Card>
    );
};
