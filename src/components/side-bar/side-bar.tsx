import { useState } from 'react';
import { Layout } from 'antd';

import { SiderFooter, SiderLogo, SiderMenu, SiderSwitch } from './components';
import { siderWidth } from './constants';
import styles from './side-bar.module.less';

const { Sider } = Layout;

export const SideBar = () => {
    const [collapsed, setCollapsed] = useState(true);
    const [isAtBreakpoint, setIsAtBreakpoint] = useState(false);

    const handleBreakpointChange = (broken: boolean) => setIsAtBreakpoint(broken);

    return (
        <Sider
            theme='light'
            trigger={null}
            collapsed={collapsed}
            collapsedWidth={
                isAtBreakpoint
                    ? siderWidth.SIDER_COLLAPSED_MOBILE_WIDTH
                    : siderWidth.SIDER_COLLAPSED_DESKTOP_WIDTH
            }
            collapsible={true}
            breakpoint='md'
            onBreakpoint={handleBreakpointChange}
            width={isAtBreakpoint ? siderWidth.SIDER_MOBILE_WIDTH : siderWidth.SIDER_DESKTOP_WIDTH}
            className={styles.sider}
        >
            <SiderLogo collapsed={collapsed} />
            <SiderMenu />
            <SiderFooter />

            <SiderSwitch
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                isAtBreakpoint={isAtBreakpoint}
            />
        </Sider>
    );
};
