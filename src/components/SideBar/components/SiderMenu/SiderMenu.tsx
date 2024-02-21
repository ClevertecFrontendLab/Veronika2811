import { Menu } from 'antd';

import { MENU_ITEMS } from '../../constants';

import styles from './SiderMenu.module.scss';

export const SiderMenu = ({ collapsed }: { collapsed: boolean }) => (
    <Menu
        mode='inline'
        items={MENU_ITEMS}
        className={styles['sider-menu']}
        inlineCollapsed={collapsed}
    />
);
