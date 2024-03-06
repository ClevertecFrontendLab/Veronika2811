import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import { BreadcrumbCustom } from '@components/BreadcrumbCustom';
import { SideBar } from '@components/SideBar';

import styles from './LayoutMainPage.module.scss';

export const LayoutMainPage = () => (
    <Layout className={styles['page-container']}>
        <SideBar />
        <Layout className={styles['page-content']}>
            <BreadcrumbCustom />
            <Outlet />
        </Layout>
    </Layout>
);
