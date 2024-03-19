import { Card, Typography } from 'antd';

import styles from './card-description.module.less';

export const CardDescription = () => (
    <Card bordered={false} className={styles.description}>
        <Typography.Text>
            CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса. Не
            откладывай на завтра — начни тренироваться уже сегодня!
        </Typography.Text>
    </Card>
);
