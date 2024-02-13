import { Card, List, Typography } from 'antd';

import { APP_ADVANTAGES } from '@components/MainContent/constants/appAdvantages';

import styles from './CardAdvantages.module.css';

export const CardAdvantages = () => {
    return (
        <Card bordered={false} className={styles['advantages']}>
            <Typography.Text className={styles['advantages-title']}>
                С CleverFit ты сможешь:
            </Typography.Text>
            <List
                bordered={false}
                split={false}
                dataSource={APP_ADVANTAGES}
                className={styles['advantages-list']}
                renderItem={(item) => (
                    <List.Item className={styles['advantages-list-item']}>
                        <Typography.Text className={styles['list-item-text']}>
                            {item}
                        </Typography.Text>
                    </List.Item>
                )}
            />
        </Card>
    );
};
