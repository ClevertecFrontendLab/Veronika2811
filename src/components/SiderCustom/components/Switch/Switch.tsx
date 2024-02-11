import { Dispatch } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import styles from './Switch.module.css';

interface SwitchProps {
    collapsed: boolean;
    setCollapsed: Dispatch<React.SetStateAction<boolean>>;
    isAtBreakpoint: boolean;
}

export const Switch = ({ collapsed, setCollapsed, isAtBreakpoint }: SwitchProps) => {
    return (
        <div
            data-test-id={isAtBreakpoint ? 'sider-switch-mobile' : 'sider-switch'}
            className={styles.switch}
        >
            {collapsed ? (
                <MenuUnfoldOutlined className='trigger' onClick={() => setCollapsed(!collapsed)} />
            ) : (
                <MenuFoldOutlined className='trigger' onClick={() => setCollapsed(!collapsed)} />
            )}
        </div>
    );
};
