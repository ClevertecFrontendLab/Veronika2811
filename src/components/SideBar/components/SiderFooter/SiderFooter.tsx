import { Divider, Layout, Menu } from 'antd';

import { MENU_ITEMS_FOOTER } from '../../constants';

import styles from './SiderFooter.module.css';

const { Footer } = Layout;

export const SiderFooter = ({ isAtBreakpoint }: { isAtBreakpoint: boolean }) => {
    const inlineIndentCustom = !isAtBreakpoint ? 16 : 21;

    return (
        <Footer className={styles['sider-footer']}>
            <Divider className={styles['sider-divider']} />
            <Menu
                mode='inline'
                items={MENU_ITEMS_FOOTER}
                inlineIndent={inlineIndentCustom}
                className={styles['sider-footer-menu']}
            />
        </Footer>
    );
};
