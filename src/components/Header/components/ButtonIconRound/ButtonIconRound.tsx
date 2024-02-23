import { Button, Tooltip } from 'antd';

import styles from './ButtonIconRound.module.scss';

interface ButtonIconRoundProps {
    tooltipTitle: string;
    icon: JSX.Element;
}

export const ButtonIconRound = ({ tooltipTitle, icon }: ButtonIconRoundProps) => (
    <Tooltip title={tooltipTitle}>
        <Button shape='circle' className={styles['button-round']} icon={icon} />
    </Tooltip>
);
