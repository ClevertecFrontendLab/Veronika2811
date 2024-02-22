import { Dispatch } from 'react';
import { Space } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import { sideBarTestIds } from '@components/SideBar/constants';

import styles from './SiderSwitch.module.scss';

interface SiderSwitchProps {
    collapsed: boolean;
    setCollapsed: Dispatch<React.SetStateAction<boolean>>;
    isAtBreakpoint: boolean;
}

export const SiderSwitch = ({ collapsed, setCollapsed, isAtBreakpoint }: SiderSwitchProps) => {
    const toggleSider = () => setCollapsed(!collapsed);

    return (
        <Space
            data-test-id={
                isAtBreakpoint
                    ? sideBarTestIds.SIDER_SWITCH_MOBILE_TEST_ID
                    : sideBarTestIds.SIDER_SWITCH_TEST_ID
            }
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
