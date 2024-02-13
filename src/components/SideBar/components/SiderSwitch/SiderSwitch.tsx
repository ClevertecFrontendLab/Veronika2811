import { Dispatch } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import { SIDER_SWITCH, SIDER_SWITCH_MOBILE } from './constants/constants';

import styles from './SiderSwitch.module.css';
import { Space } from 'antd';

interface SiderSwitchProps {
    collapsed: boolean;
    setCollapsed: Dispatch<React.SetStateAction<boolean>>;
    isAtBreakpoint: boolean;
}

export const SiderSwitch = ({ collapsed, setCollapsed, isAtBreakpoint }: SiderSwitchProps) => {
    const toggleSider = () => setCollapsed(!collapsed);

    return (
        <Space
            data-test-id={isAtBreakpoint ? SIDER_SWITCH_MOBILE : SIDER_SWITCH}
            className={styles.switch}
        >
            {collapsed ? (
                <MenuUnfoldOutlined onClick={toggleSider} />
            ) : (
                <MenuFoldOutlined onClick={toggleSider} />
            )}
        </Space>
    );
};
