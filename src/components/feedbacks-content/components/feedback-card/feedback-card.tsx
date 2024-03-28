import { FC } from 'react';
import { characterRender } from '@components/feedbacks-content/utils/character-rate-render';
import { Card, Comment, Rate, Typography } from 'antd';

import { AuthorInfo } from '../author-info';

import styles from './feedback-card.module.less';

import { FeedbackResponse } from '@/types/feedbacks';

export const FeedbackCard: FC<{ feedback: FeedbackResponse }> = ({ feedback }) => {
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
                        disabled={true}
                        character={({ index }) => characterRender(index, feedback.rating)}
                    />
                }
                datetime={formattedDate}
                content={<Typography.Paragraph>{feedback.message}</Typography.Paragraph>}
            />
        </Card>
    );
};
