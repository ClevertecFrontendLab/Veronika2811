import { Logo } from '@components/ui/Logo';

import { CustomTabs } from './components';

import { AuthComponentTypes } from '@/types/auth';

import styles from './AuthContainer.module.less';

export const AuthContainer = ({ type }: { type: AuthComponentTypes }) => (
    <>
        <div className={styles['auth-logo-wrapper']}>
            <Logo size='md' />
        </div>
        <CustomTabs type={type} />
    </>
);
