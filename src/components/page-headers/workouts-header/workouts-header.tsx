import { ButtonSettings } from '@components/ui/button-settings';

import { BreadcrumbCustom } from '..';

import styles from './workouts-header.module.less';

export const WorkoutsHeader = () => (
    <div className={styles['header-workouts']}>
        <BreadcrumbCustom />
        <ButtonSettings />
    </div>
);
