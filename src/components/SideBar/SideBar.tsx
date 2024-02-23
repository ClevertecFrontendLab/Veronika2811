import { useState } from 'react';
import { Layout } from 'antd';

import { SiderLogo, SiderMenu, SiderFooter, SiderSwitch } from './components';

import { siderWidth } from './constants';

import styles from './SideBar.module.scss';

const { Sider } = Layout;

export const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false);
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
            collapsible
            breakpoint='xs'
            onBreakpoint={handleBreakpointChange}
            width={isAtBreakpoint ? siderWidth.SIDER_MOBILE_WIDTH : siderWidth.SIDER_DESKTOP_WIDTH}
            className={styles['sider']}
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
