import React, { FC } from 'react';
import { SETTINGS_TEST_IDS } from '@components/settings-content/constants/settings-test-ids';
import { Radio, Typography } from 'antd';

import styles from './tarif-plan-item.module.less';

import { Periods } from '@/types/catalogs';

export const TarifPlanItem: FC<{ catalogTariffPeriods: Periods[] }> = ({
    catalogTariffPeriods,
}) => (
    <React.Fragment>
        {catalogTariffPeriods.map((item) => (
            <div className={styles.periods} key={item.text}>
                <Typography.Paragraph className={styles['periods-title']}>
                    {item.text}
                </Typography.Paragraph>
                <div className={styles['periods-group']}>
                    <Typography.Paragraph className={styles['periods-cost']}>
                        {`${item.cost.toString().replace('.', ',')} $`}
                    </Typography.Paragraph>
                    <Radio
                        value={item.days}
                        key={item.days}
                        data-test-id={`${SETTINGS_TEST_IDS.tariff}-${item.cost}`}
                    />
                </div>
            </div>
        ))}
    </React.Fragment>
);
