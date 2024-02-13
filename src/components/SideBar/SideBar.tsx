import { useState } from 'react';
import Sider from 'antd/lib/layout/Sider';

import { SiderLogo } from './components/SiderLogo';
import { SiderMenu } from './components/SiderMenu';
import { SiderFooter } from './components/SiderFooter';
import { SiderSwitch } from './components/SiderSwitch';
import {
    SIDER_COLLAPSED_DESKTOP_WIDTH,
    SIDER_COLLAPSED_MOBILE_WIDTH,
    SIDER_DESKTOP_WIDTH,
    SIDER_MOBILE_WIDTH,
} from './constants';

import styles from './SideBar.module.css';

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
                isAtBreakpoint ? SIDER_COLLAPSED_MOBILE_WIDTH : SIDER_COLLAPSED_DESKTOP_WIDTH
            }
            collapsible
            breakpoint='xs'
            onBreakpoint={handleBreakpointChange}
            width={isAtBreakpoint ? SIDER_MOBILE_WIDTH : SIDER_DESKTOP_WIDTH}
            className={styles['sider']}
        >
            <SiderLogo collapsed={collapsed} />
            <SiderMenu isAtBreakpoint={isAtBreakpoint} collapsed={collapsed} />
            <SiderFooter isAtBreakpoint={isAtBreakpoint} />

            <SiderSwitch
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                isAtBreakpoint={isAtBreakpoint}
            />
        </Sider>
    );
};
