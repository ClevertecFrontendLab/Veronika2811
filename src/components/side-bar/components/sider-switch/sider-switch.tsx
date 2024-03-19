import { Dispatch, FC } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { sideBarTestIds } from '@components/side-bar/constants';
import { Space } from 'antd';

import styles from './sider-switch.module.less';

type SiderSwitchProps = {
    collapsed: boolean;
    setCollapsed: Dispatch<React.SetStateAction<boolean>>;
    isAtBreakpoint: boolean;
};

export const SiderSwitch: FC<SiderSwitchProps> = ({ collapsed, setCollapsed, isAtBreakpoint }) => {
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
