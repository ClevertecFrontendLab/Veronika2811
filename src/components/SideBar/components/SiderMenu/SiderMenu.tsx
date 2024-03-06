import { push } from 'redux-first-history';
import { Menu } from 'antd';

import { SIDER_MENU_ITEMS } from '../../constants';

import { useAppDispatch } from '@hooks/reduxHooks';

import styles from './SiderMenu.module.scss';

export const SiderMenu = () => {
    const dispatch = useAppDispatch();

    const handleItemClick = ({ key }: { key: string }) => {
        dispatch(push(`/${key}`))
    };

    return (
        <Menu
            mode='vertical'
            items={SIDER_MENU_ITEMS}
            className={styles['sider-menu']}
            onClick={handleItemClick}
        />
    );
};
