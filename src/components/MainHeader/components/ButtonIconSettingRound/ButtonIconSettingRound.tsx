import { Button, Tooltip } from 'antd';

import styles from './ButtonIconSettingRound.module.less';

type ButtonIconSettingRoundProps = {
    tooltipTitle: string;
    icon: JSX.Element;
};

export const ButtonIconSettingRound = ({ tooltipTitle, icon }: ButtonIconSettingRoundProps) => (
    <Tooltip title={tooltipTitle}>
        <Button shape='circle' icon={icon} className={styles['button-icon-setting-round']} />
    </Tooltip>
);
