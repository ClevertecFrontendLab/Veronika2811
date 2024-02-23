import { push } from 'redux-first-history';
import { Divider, Layout, Menu } from 'antd';

import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setUserLoggedIn } from '@redux/slice/userInfoSlice';
import { FOOTER_MENU_ITEMS } from '../../constants';

import styles from './SiderFooter.module.scss';

const { Footer } = Layout;

export const SiderFooter = () => {
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();

        dispatch(setUserLoggedIn(false));
        dispatch(push('/auth'));
    };

    return (
        <Footer className={styles['sider-footer']}>
            <Divider />
            <Menu
                mode='inline'
                items={FOOTER_MENU_ITEMS}
                className={styles['sider-footer-menu']}
                onClick={handleLogout}
            />
        </Footer>
    );
};
