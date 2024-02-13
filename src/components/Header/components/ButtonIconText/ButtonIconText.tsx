import { Button } from 'antd';

import styles from './ButtonIconText.module.css';

interface ButtonIconTextProps {
    label: string;
    icon: JSX.Element;
}

export const ButtonIconText = ({ label, icon }: ButtonIconTextProps) => (
    <Button type='text' className={styles['header-button']} icon={icon}>
        {label}
    </Button>
);
