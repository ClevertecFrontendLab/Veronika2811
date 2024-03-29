import { push } from 'redux-first-history';
import { Divider, Layout, Menu } from 'antd';

import { FOOTER_MENU_ITEMS } from '../../constants';

import { setAccessToken } from '@redux/slice/authSlice';
import { useAppDispatch } from '@hooks/reduxHooks';
import { Paths } from '@routes/constants/Paths';

import styles from './SiderFooter.module.less';

const { Footer } = Layout;

export const SiderFooter = () => {
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        localStorage.clear();

        dispatch(setAccessToken(''));
        dispatch(push(Paths.AUTH_MAIN));
    };

    return (
        <Footer className={styles['sider-footer']}>
            <Divider />
            <Menu
                mode='vertical'
                items={FOOTER_MENU_ITEMS}
                className={styles['sider-footer-menu']}
                onClick={handleLogout}
            />
        </Footer>
    );
};
