import { useLocation } from 'react-router-dom';
import { push } from 'redux-first-history';
import { useAppDispatch } from '@hooks/redux-hooks';
import { Menu } from 'antd';

import { SIDER_MENU_ITEMS } from '../../constants';

import styles from './sider-menu.module.less';

export const SiderMenu = () => {
    const location = useLocation();
    const activeMenuItems = location.pathname.replace('/', '');

    const dispatch = useAppDispatch();

    const handleItemClick = ({ key }: { key: string }) => dispatch(push(`/${key}`));

    return (
        <Menu
            mode='vertical'
            items={SIDER_MENU_ITEMS}
            className={styles['sider-menu']}
            onClick={handleItemClick}
            selectedKeys={[activeMenuItems]}
        />
    );
};
