import React from 'react';
import { Layout } from 'antd';

import { AuthContainer } from '@components/AuthContainer';

import styles from './AuthenticatorPage.module.scss';

const { Content } = Layout;

export const AuthenticatorPage: React.FC = () => (
    <Content className={styles['auth-page-container']}>
        <Layout className={styles['auth-form-container']}>
            <AuthContainer />
        </Layout>
    </Content>
);
