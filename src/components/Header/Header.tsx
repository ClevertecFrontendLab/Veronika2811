import { PageHeader } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import { Title, ButtonIconText, ButtonIconRound } from './components';

import styles from './Header.module.scss';

const breadcrumbRoutes = [
    {
        path: '/',
        breadcrumbName: 'Главная',
    },
];

export const Header = () => (
    <PageHeader
        className={styles.header}
        ghost={false}
        breadcrumb={{ routes: breadcrumbRoutes }}
        title={<Title />}
        extra={[
            <ButtonIconText key='setting' label='Настройки' icon={<SettingOutlined />} />,
            <ButtonIconRound
                key='setting-mobile'
                tooltipTitle='Настройки'
                icon={<SettingOutlined />}
            />,
        ]}
    />
);
