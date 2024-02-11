import { Menu, Typography } from 'antd';

import { menuItems } from './utils';

import styles from './SiderMenu.module.css';

export const SiderMenu = () => {
    return (
        <Menu mode='vertical'>
            {menuItems.map((item) => {
                return (
                    <Menu.Item key={item.key} icon={item.icon} className={styles['menu-item']}>
                        <Typography.Text className={styles['menu-label']}>
                            {item.label}
                        </Typography.Text>
                    </Menu.Item>
                );
            })}
        </Menu>
    );
};
