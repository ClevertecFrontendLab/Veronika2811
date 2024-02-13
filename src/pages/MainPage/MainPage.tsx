import React from 'react';
import { Layout } from 'antd';

import { SideBar } from '@components/SideBar';
import { Header } from '@components/Header';
import { MainContent } from '@components/MainContent';
import { MainFooter } from '@components/Footer';

import styles from './MainPage.module.css';

export const MainPage: React.FC = () => (
    <Layout className={styles['page-container']}>
        <SideBar />
        <Layout className={styles['page-content']}>
            <Header />
            <MainContent />
            <MainFooter />
        </Layout>
    </Layout>
);
