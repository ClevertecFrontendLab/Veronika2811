import classNames from 'classnames/bind';

import { CleverLogo, FitLogo } from './components';

import styles from './Logo.module.css';

const cx = classNames.bind(styles);

export const Logo = ({ collapsed }: { collapsed: boolean }) => {
    const logoClass = cx({
        logo: true,
        'logo-collapsed': collapsed,
    });

    return (
        <div className={logoClass}>
            {!collapsed && <CleverLogo />}
            <FitLogo />
        </div>
    );
};
