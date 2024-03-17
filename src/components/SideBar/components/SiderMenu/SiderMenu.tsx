import { push } from 'redux-first-history';
import { Menu } from 'antd';

import { SIDER_MENU_ITEMS } from '../../constants';

import { activeKeyMenuSelector } from '@redux/selectors';
import { setActiveMenuKey } from '@redux/slice/mainSlice';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';

import styles from './SiderMenu.module.less';

export const SiderMenu = () => {
    const activeKeys = useAppSelector(activeKeyMenuSelector)
    const dispatch = useAppDispatch();

    const handleItemClick = ({ key }: { key: string }) => {
        dispatch(setActiveMenuKey(key))
        dispatch(push(`/${key}`))
    };

    return (
        <Menu
            mode='vertical'
            items={SIDER_MENU_ITEMS}
            className={styles['sider-menu']}
            onClick={handleItemClick}
            selectedKeys={activeKeys}
        />
    );
};
