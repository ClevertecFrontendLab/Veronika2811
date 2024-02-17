import React from 'react';
import { Tabs } from 'antd';

import { AuthForm } from '../AuthForm';

import styles from './AuthTabs.module.scss';

const itemsTabs = [
    { label: 'Вход', key: 'login', children: <AuthForm type='login' /> },
    { label: 'Регистрация', key: 'registration', children: <AuthForm type='registration' /> },
];

export const AuthTabs: React.FC = () => {
    const onChange = (key: string) => console.log(key);

    return (
        <Tabs
            defaultActiveKey='login'
            items={itemsTabs}
            onChange={onChange}
            className={styles['auth-tabs']}
        />
    );
};
