import classNames from 'classnames';

import { Logo } from '@components/Logo';

import styles from './SiderLogo.module.scss';

export const SiderLogo = ({ collapsed }: { collapsed: boolean }) => {
    const logoClass = classNames(styles['logo'], collapsed ? styles['logo-collapsed'] : null);

    return (
        <div className={logoClass}>
            <Logo collapsed={collapsed} />
        </div>
    );
};
