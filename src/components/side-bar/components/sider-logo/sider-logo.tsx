import { push } from 'redux-first-history';
import { LogoApp } from '@components/ui/logo-app';
import { useAppDispatch } from '@hooks/redux-hooks';
import { Paths } from '@routes/constants/router-paths';
import classNames from 'classnames';

import styles from './sider-logo.module.less';

export const SiderLogo = ({ collapsed }: { collapsed: boolean }) => {
    const dispatch = useAppDispatch();

    const logoClass = classNames(styles.logo, {
        [styles['logo-collapsed']]: collapsed,
    });

    const redirectToMainPath = () => dispatch(push(Paths.MAIN));

    return (
        <div className={logoClass} onClick={redirectToMainPath} role='presentation'>
            <LogoApp collapsed={collapsed} />
        </div>
    );
};
