import { Card, Typography } from 'antd';

import styles from './CardDescription.module.css';

export const CardDescription = () => {
    return (
        <Card bordered={false} className={styles['description']}>
            <Typography.Paragraph className={styles['description-title']}>
                CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса. Не
                откладывай на завтра — начни тренироваться уже сегодня!
            </Typography.Paragraph>
        </Card>
    );
};
