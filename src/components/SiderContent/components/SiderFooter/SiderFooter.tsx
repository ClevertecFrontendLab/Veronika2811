import { Divider, Menu, Typography } from 'antd';

import { ExitIconCustom } from '@components/ui/icon';

import styles from './SiderFooter.module.css';

export const SiderFooter = () => {
    return (
        <div className={styles['sider-footer']}>
            <Divider className={styles['sider-footer-divider']} />
            <Menu mode='vertical'>
                <Menu.Item icon={<ExitIconCustom />} className={styles['button-exit']}>
                    <Typography.Text className={styles['menu-label']}>Выход</Typography.Text>
                </Menu.Item>
            </Menu>
        </div>
    );
};
