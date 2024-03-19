import { push } from 'redux-first-history';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import { mainSlice } from '@redux/selectors';
import { setActiveMenuKey } from '@redux/slice/main-slice';
import { Menu } from 'antd';

import { SIDER_MENU_ITEMS } from '../../constants';

import styles from './sider-menu.module.less';

export const SiderMenu = () => {
    const { activeMenuKey } = useAppSelector(mainSlice);
    const dispatch = useAppDispatch();

    const handleItemClick = ({ key }: { key: string }) => {
        dispatch(setActiveMenuKey(key));
        dispatch(push(`/${key}`));
    };

    return (
        <Menu
            mode='vertical'
            items={SIDER_MENU_ITEMS}
            className={styles['sider-menu']}
            onClick={handleItemClick}
            selectedKeys={activeMenuKey}
        />
    );
};
