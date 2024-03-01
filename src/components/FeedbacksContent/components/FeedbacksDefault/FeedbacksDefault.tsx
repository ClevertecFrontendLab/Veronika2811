import { Card, Typography } from 'antd';

import { FeedbackWriteButton } from '../FeedbackWriteButton';
import { FeedbacksRefetch } from '@components/FeedbacksContent/types/feedbacksTypes';

import styles from './FeedbacksDefault.module.scss';

export const FeedbacksDefault = ({ refetch }: FeedbacksRefetch) => {
    return (
        <div className={styles['reedback-default-wrapper']}>
            <Card
                bordered={false}
                className={styles['feedback-default']}
                title='Оставьте свой отзыв первым'
            >
                <Typography.Paragraph>
                    Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении.
                </Typography.Paragraph>
                <Typography.Paragraph>
                    Поделитесь своим мнением и опытом с другими пользователями,
                </Typography.Paragraph>
                <Typography.Paragraph>и помогите им сделать правильный выбор.</Typography.Paragraph>
            </Card>
            <div className={styles['feedback-default-button']}>
                <FeedbackWriteButton refetch={refetch} />
            </div>
        </div>
    );
};
