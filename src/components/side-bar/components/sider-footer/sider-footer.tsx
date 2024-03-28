import { useLogout } from '@hooks/use-logout';
import { Divider, Layout, Menu } from 'antd';

import { FOOTER_MENU_ITEMS } from '../../constants';

import styles from './sider-footer.module.less';

const { Footer } = Layout;

export const SiderFooter = () => {
    const logout = useLogout();

    return (
        <Footer className={styles['sider-footer']}>
            <Divider />
            <Menu
                mode='vertical'
                items={FOOTER_MENU_ITEMS}
                className={styles['sider-footer-menu']}
                onClick={logout}
            />
        </Footer>
    );
};
