import { FC } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/redux-hooks';
import { profileSelector } from '@redux/selectors';
import { Button, Typography } from 'antd';
import moment from 'moment';

import styles from './card-content.module.less';

type CardContentProps = {
    tariff: 'free' | 'pro';
    toogleDrawerVisible: () => void;
};

export const CardContent: FC<CardContentProps> = ({ tariff, toogleDrawerVisible }) => {
    const { currentUserInfo } = useAppSelector(profileSelector);

    const isProTariff = tariff === 'pro';

    if (currentUserInfo.tariff || tariff === 'free') {
        return (
            <div className={isProTariff ? styles['pro-tariff'] : styles.free}>
                <Typography.Title level={5}>активен</Typography.Title>
                {isProTariff ? (
                    <Typography.Title level={5}>
                        до {moment(currentUserInfo.tariff.expired).format('DD.MM')}
                    </Typography.Title>
                ) : (
                    <CheckOutlined />
                )}
            </div>
        );
    }

    return (
        <div className={styles['inactive-pro-tariff']}>
            <Button
                type='primary'
                size='large'
                data-test-id='activate-tariff-btn'
                onClick={toogleDrawerVisible}
            >
                Активировать
            </Button>
        </div>
    );
};
