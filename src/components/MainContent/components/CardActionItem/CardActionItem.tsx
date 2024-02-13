import { Button, Card } from 'antd';

import styles from './CardActionItem.module.css';

export const CardActionItem = ({
    item,
}: {
    item: { title: string; icon: JSX.Element; body: string };
}) => {
    return (
        <Card
            className={styles['card-action']}
            title={item.title}
            bordered={false}
            headStyle={{
                fontWeight: '400',
                letterSpacing: '0.4px',
                lineHeight: '130%',
                display: 'flex',
                justifyContent: 'center',
            }}
            bodyStyle={{ padding: '12px', display: 'flex', justifyContent: 'center' }}
        >
            <Button type='text' icon={item.icon} className={styles['card-action-button']}>
                {item.body}
            </Button>
        </Card>
    );
};
