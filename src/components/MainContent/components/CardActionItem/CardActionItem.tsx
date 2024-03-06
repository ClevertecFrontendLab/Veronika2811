import { Button, Card } from 'antd';

import styles from './CardActionItem.module.scss';

type CardActionItemProps = {
    item: {
        title: string;
        icon: JSX.Element;
        body: string;
    };
};

export const CardActionItem = ({ item }: CardActionItemProps) => (
    <Card
        className={styles['card-action']}
        title={item.title}
        bordered={false}
        headStyle={{
            display: 'flex',
            justifyContent: 'center',
            padding: '14px 24px 12px',
            fontWeight: '400',
            lineHeight: '130%',
        }}
        bodyStyle={{ display: 'flex', justifyContent: 'center', padding: '12px' }}
    >
        <Button type='text' icon={item.icon}>
            {item.body}
        </Button>
    </Card>
);
