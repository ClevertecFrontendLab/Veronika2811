import { Logo } from '@components/ui/Logo';

import { CustomTabs } from './components/CustomTabs';

import { AuthComponentTypes } from '@/types/auth';

import styles from './AuthContainer.module.scss';

export const AuthContainer = ({ type }: { type: AuthComponentTypes }) => (
    <>
        <div className={styles['auth-logo-wrapper']}>
            <Logo size='md' />
        </div>
        <CustomTabs type={type} />
    </>
);
