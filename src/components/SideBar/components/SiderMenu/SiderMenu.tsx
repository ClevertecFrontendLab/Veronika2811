import { Menu } from 'antd';

import { SIDER_MENU_ITEMS } from '../../constants';

import styles from './SiderMenu.module.scss';

export const SiderMenu = () => (
    <Menu mode='vertical' items={SIDER_MENU_ITEMS} className={styles['sider-menu']} />
);
