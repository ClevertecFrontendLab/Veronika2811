import { AuthTypes } from '@type/auth/authTypes';

import { Logo } from '@components/Logo';
import { AuthTabs } from './components/AuthTabs';

import styles from './AuthContainer.module.scss';

export const AuthContainer = ({ type }: { type: AuthTypes }) => (
    <>
        <div className={styles['auth-logo-wrapper']}>
            <Logo size='md' />
        </div>
        <AuthTabs type={type} />
    </>
);
