import { Logo } from '@components/Logo';

import styles from './LogoWrapper.module.css';

export const LogoWrapper = ({ collapsed }: { collapsed: boolean }) => {
    return (
        <div className={styles['wrapper-logo']}>
            <Logo collapsed={collapsed} />
        </div>
    );
};
