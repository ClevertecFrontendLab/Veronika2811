import { FC } from 'react';
import { Button } from 'antd';

import styles from './button-icon-setting-text.module.less';

type ButtonIconSettingTextProps = {
    label: string;
    icon: JSX.Element;
};

export const ButtonIconSettingText: FC<ButtonIconSettingTextProps> = ({ label, icon }) => (
    <Button type='text' icon={icon} className={styles['button-icon-setting']}>
        {label}
    </Button>
);
