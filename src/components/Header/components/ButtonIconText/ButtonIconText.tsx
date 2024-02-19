import { Button } from 'antd';

import styles from './ButtonIconText.module.scss';

interface ButtonIconTextProps {
    label: string;
    icon: JSX.Element;
}

export const ButtonIconText = ({ label, icon }: ButtonIconTextProps) => (
    <Button type='text' className={styles['button-icon-text']} icon={icon}>
        {label}
    </Button>
);
