import { useState } from 'react';
import { Layout } from 'antd';

import { SiderContent } from '@components/SiderContent';
import { Switch } from './components';

import styles from './SiderCustom.module.css';

const { Sider } = Layout;

export const SiderCustom = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [isAtBreakpoint, setIsAtBreakpoint] = useState(false);

    const handleBreakpointChange = (broken: boolean) => setIsAtBreakpoint(broken);

    return (
        <Sider
            theme='light'
            breakpoint='xs'
            trigger={null}
            collapsed={collapsed}
            collapsedWidth={isAtBreakpoint ? 0 : 64}
            collapsible
            width={isAtBreakpoint ? 106 : 208}
            className={styles['sider']}
            onBreakpoint={handleBreakpointChange}
        >
            <SiderContent collapsed={collapsed} />

            <Switch collapsed={collapsed} setCollapsed={setCollapsed} isAtBreakpoint={isAtBreakpoint} />
        </Sider>
    );
};
