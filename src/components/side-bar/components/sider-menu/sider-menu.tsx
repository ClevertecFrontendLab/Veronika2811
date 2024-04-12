import { useLocation } from 'react-router-dom';
import { push } from 'redux-first-history';
import { getSiderMenuItems } from '@components/side-bar/utils/get-sider-menu-items';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import { inviteSelector } from '@redux/selectors';
import { Menu } from 'antd';

import styles from './sider-menu.module.less';

export const SiderMenu = () => {
    const location = useLocation();
    const activeMenuItems = location.pathname.replace('/', '');

    const { inviteList } = useAppSelector(inviteSelector);
    const dispatch = useAppDispatch();

    const siderMenuItems = getSiderMenuItems(inviteList);

    const handleItemClick = ({ key }: { key: string }) => dispatch(push(`/${key}`));

    return (
        <Menu
            mode='vertical'
            items={siderMenuItems}
            className={styles['sider-menu']}
            onClick={handleItemClick}
            selectedKeys={[activeMenuItems]}
        />
    );
};
