import { Button } from 'antd';

import styles from './ButtonIconSettingText.module.scss';

type ButtonIconSettingTextProps = {
    label: string;
    icon: JSX.Element;
};

export const ButtonIconSettingText = ({ label, icon }: ButtonIconSettingTextProps) => (
    <Button type='text' icon={icon} className={styles['button-icon-setting']}>
        {label}
    </Button>
);
