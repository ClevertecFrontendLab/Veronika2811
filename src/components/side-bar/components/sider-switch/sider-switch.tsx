import { Dispatch, FC } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { SIDER_TEST_IDS } from '@components/side-bar/constants/side-bar-test-ids';
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
                    ? SIDER_TEST_IDS.siderSwitchMobile
                    : SIDER_TEST_IDS.siderSwitch
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
