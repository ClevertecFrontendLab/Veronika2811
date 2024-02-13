import { Button, Tooltip } from 'antd';

import styles from './ButtonIconRound.module.css';

interface ButtonIconRoundProps {
    tooltipTitle: string;
    icon: JSX.Element;
}

export const ButtonIconRound = ({ tooltipTitle, icon }: ButtonIconRoundProps) => {
    return (
        <Tooltip title={tooltipTitle}>
            <Button shape='circle' className={styles['header-button-round']} icon={icon} />
        </Tooltip>
    );
};
