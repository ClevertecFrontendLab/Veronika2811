import { Divider, Layout, Menu } from 'antd';

import { MENU_ITEMS_FOOTER } from '../../constants';

import styles from './SiderFooter.module.scss';

const { Footer } = Layout;

export const SiderFooter = ({ collapsed }: { collapsed: boolean }) => (
    <Footer className={styles['sider-footer']}>
        <Divider />
        <Menu
            mode='inline'
            items={MENU_ITEMS_FOOTER}
            inlineCollapsed={collapsed}
            className={styles['sider-footer-menu']}
        />
    </Footer>
);
