import { Logo } from '@components/Logo';
import { AuthTabs } from './components/AuthTabs';

import styles from './AuthContainer.module.scss';

export const AuthContainer = () => (
    <>
        <div className={styles['auth-logo-wrapper']}>
            <Logo collapsed={false} auth />
        </div>
        <AuthTabs />
    </>
);
