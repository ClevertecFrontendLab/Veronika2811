import { Outlet } from 'react-router-dom';
import { Content } from 'antd/lib/layout/layout';

import styles from './LayoutAuthPage.module.less';

export const LayoutAuthPage = () => (
    <Content className={styles['auth-page-container']}>
        <div className={styles['auth-form-container']}>
            <Outlet />
        </div>
    </Content>
);
