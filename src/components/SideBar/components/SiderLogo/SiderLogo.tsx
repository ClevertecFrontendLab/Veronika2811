import classNames from 'classnames/bind';

import { Logo } from '@components/Logo';

import styles from './SiderLogo.module.css';

const cx = classNames.bind(styles);

export const SiderLogo = ({ collapsed }: { collapsed: boolean }) => {
    const logoClass = cx({
        logo: true,
        'logo-collapsed': collapsed,
    });

  return (
    <div className={logoClass}>
        <Logo collapsed={collapsed} />
    </div>
  )
}
