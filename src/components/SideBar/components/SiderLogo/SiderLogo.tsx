import { push } from 'redux-first-history';
import classNames from 'classnames';

import { Logo } from '@components/ui/Logo';

import { useAppDispatch } from '@hooks/reduxHooks';
import { Paths } from '@routes/constants/Paths';

import styles from './SiderLogo.module.less';

export const SiderLogo = ({ collapsed }: { collapsed: boolean }) => {
    const dispatch = useAppDispatch();

    const logoClass = classNames(styles.logo, {
        [styles['logo-collapsed']]: collapsed,
    });

    const redirectToMainPath = () => dispatch(push(Paths.MAIN))

    return (
        <div className={logoClass} onClick={redirectToMainPath}>
            <Logo collapsed={collapsed} />
        </div>
    );
};
