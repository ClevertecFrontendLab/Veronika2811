import { push } from 'redux-first-history';
import { Button, Card } from 'antd';

import { useAppDispatch } from '@hooks/reduxHooks';

import styles from './CardActionItem.module.scss';

type CardActionItemProps = {
    item: {
        title: string;
        icon: JSX.Element;
        body: string;
        pathRedirect: string;
    };
};

export const CardActionItem = ({ item }: CardActionItemProps) => {
    const dispatch = useAppDispatch();

    const { title, icon, body, pathRedirect } = item;

    const handleRedirect = () => dispatch(push(pathRedirect));

    return (
        <Card
            className={styles['card-action']}
            title={title}
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
            <Button type='text' icon={icon} onClick={handleRedirect}>
                {body}
            </Button>
        </Card>
    );
};
