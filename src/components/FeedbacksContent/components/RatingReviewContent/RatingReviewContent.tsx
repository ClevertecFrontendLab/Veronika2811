import { Rate, Space, Typography } from 'antd';

import { Feedback } from '@src/types/feedbacks';

import styles from './RatingReviewContent.module.scss';

export const RatingReviewContent = ({ feedback }: { feedback: Feedback }) => {
    const date = new Date(feedback.createdAt);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const formattedDate = `${day}.${month}.${year}`;

    return (
        <Space direction='vertical' className={styles['rating-review']} size={6}>
            <Space size='middle' className={styles['rating-review-item']}>
                <Rate disabled className={styles['rate']} defaultValue={feedback.rating} />
                <Typography.Text className={styles['rate-date']}>{formattedDate}</Typography.Text>
            </Space>
            <Typography.Paragraph className={styles['review']}>
                {feedback.message}
            </Typography.Paragraph>
        </Space>
    );
};
