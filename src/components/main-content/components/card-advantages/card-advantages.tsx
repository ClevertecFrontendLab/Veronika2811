import { APP_ADVANTAGES } from '@components/main-content/constants/app-advantages';
import { Card, List, Typography } from 'antd';

import styles from './card-advantages.module.less';

export const CardAdvantages = () => (
    <Card bordered={false} className={styles.advantages}>
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
