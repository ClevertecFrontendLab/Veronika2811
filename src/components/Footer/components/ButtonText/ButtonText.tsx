import { Button } from 'antd';

import styles from './ButtonText.module.scss';

export const ButtonText = () => (
    <Button type='text' className={styles['footer-button']}>
        Смотреть отзывы
    </Button>
);
