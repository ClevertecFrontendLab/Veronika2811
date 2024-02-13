import { Menu } from 'antd';

import { MENU_ITEMS } from '../../constants';

import styles from './SiderMenu.module.css';

interface SiderMenuProps {
    collapsed: boolean;
    isAtBreakpoint: boolean;
}

export const SiderMenu = ({ collapsed, isAtBreakpoint }: SiderMenuProps) => {
    const inlineIndentCustom = isAtBreakpoint ? 0 : collapsed ? 25 : 17;

    return (
        <Menu
            mode='inline'
            items={MENU_ITEMS}
            inlineIndent={inlineIndentCustom}
            className={styles['sider-menu']}
        />
    );
};
