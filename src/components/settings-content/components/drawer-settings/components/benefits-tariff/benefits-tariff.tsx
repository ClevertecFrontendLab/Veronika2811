import React from 'react';
import { CheckCircleFilled, CloseCircleOutlined } from '@ant-design/icons';
import { BENEFITS_TARIFF } from '@components/settings-content/constants/benefits-tariff';
import { Typography } from 'antd';
import classNames from 'classnames';

import styles from './benefits-tariff.module.less';

export const BenefitsTariff = () => {
    const getFreeIcon = (free: boolean) => {
        if (free) {
            return <CheckCircleFilled className={styles['benefits-tariff-icon']} />;
        }

        return (
            <CloseCircleOutlined
                className={classNames(styles['benefits-tariff-icon'], {
                    [styles['benefits-tariff-icon-inactive']]: true,
                })}
            />
        );
    };

    return (
        <React.Fragment>
            {BENEFITS_TARIFF.map((item) => (
                <div className={styles['benefits-tariff']} key={item.title}>
                    <Typography.Paragraph className={styles['benefits-title']}>
                        {item.title}
                    </Typography.Paragraph>
                    <div className={styles['benefits-icons-container']}>
                        {getFreeIcon(item.free)}
                        <CheckCircleFilled className={styles['benefits-tariff-icon']} />
                    </div>
                </div>
            ))}
        </React.Fragment>
    );
};
