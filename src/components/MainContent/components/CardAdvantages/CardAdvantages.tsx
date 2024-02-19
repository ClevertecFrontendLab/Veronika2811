import { Card, List, Typography } from 'antd';

import { APP_ADVANTAGES } from '@components/MainContent/constants/appAdvantages';

import styles from './CardAdvantages.module.scss';

export const CardAdvantages = () => (
    <Card bordered={false} className={styles['advantages']}>
        <Typography.Text>С CleverFit ты сможешь:</Typography.Text>
        <List
            bordered={false}
            split={false}
            dataSource={APP_ADVANTAGES}
            renderItem={(item) => (
                <List.Item>
                    <Typography.Text>{item}</Typography.Text>
                </List.Item>
            )}
        />
    </Card>
);
