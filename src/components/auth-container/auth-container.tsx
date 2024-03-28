import React, { FC } from 'react';

import { LogoApp } from '../ui/logo-app/logo-app';

import styles from './auth-container.module.less';
import { CustomTabs } from './components';

import { AuthComponentTypes } from '@/types/auth';

export const AuthContainer: FC<{ type: AuthComponentTypes }> = ({ type }) => (
    <React.Fragment>
        <div className={styles['auth-logo-wrapper']}>
            <LogoApp size='md' />
        </div>
        <CustomTabs type={type} />
    </React.Fragment>
);
