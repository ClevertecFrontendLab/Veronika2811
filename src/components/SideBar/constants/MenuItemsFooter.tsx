import { ExitIconCustom } from '@components/ui/icon';

import styles from './menuItems.module.css';

export const MENU_ITEMS_FOOTER = [
    {
        key: 'exit',
        label: 'Выход',
        icon: <ExitIconCustom className={styles['menu-icon']} />,
    },
];
