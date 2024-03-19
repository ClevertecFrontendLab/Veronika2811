import { FC } from 'react';
import { Button, Tooltip } from 'antd';

import styles from './button-icon-setting-round.module.less';

type ButtonIconSettingRoundProps = {
    tooltipTitle: string;
    icon: JSX.Element;
};

export const ButtonIconSettingRound: FC<ButtonIconSettingRoundProps> = ({ tooltipTitle, icon }) => (
    <Tooltip title={tooltipTitle}>
        <Button shape='circle' icon={icon} className={styles['button-icon-setting-round']} />
    </Tooltip>
);
