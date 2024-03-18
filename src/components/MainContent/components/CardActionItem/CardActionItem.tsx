import { push } from 'redux-first-history';
import { Button, Card } from 'antd';

import { setActiveMenuKey } from '@redux/slice/mainSlice';
import { useAppDispatch } from '@hooks/reduxHooks';

import styles from './CardActionItem.module.less';

type CardActionItemProps = {
    item: {
        key: string;
        title: string;
        icon: JSX.Element;
        body: string;
        pathRedirect: string;
        testIds: string;
    };
};

export const CardActionItem = ({ item }: CardActionItemProps) => {
    const dispatch = useAppDispatch();

    const { key, title, icon, body, pathRedirect, testIds } = item;

    const handleRedirect = () => {
        dispatch(setActiveMenuKey(key));
        dispatch(push(pathRedirect));
    };

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
            <Button type='text' icon={icon} onClick={handleRedirect} data-test-id={testIds}>
                {body}
            </Button>
        </Card>
    );
};
