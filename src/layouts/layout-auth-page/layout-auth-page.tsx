import { Outlet } from 'react-router-dom';
import { LoaderApp } from '@components/ui/loader-app';
import { useAppSelector } from '@hooks/redux-hooks';
import { mainSelector } from '@redux/selectors';
import { Content } from 'antd/lib/layout/layout';

import styles from './layout-auth-page.module.less';

export const LayoutAuthPage = () => {
    const { isLoading } = useAppSelector(mainSelector);

    return (
        <Content className={styles['auth-page-container']}>
            {isLoading && <LoaderApp />}
            <div className={styles['auth-form-container']}>
                <Outlet />
            </div>
        </Content>
    );
};
