import { PageHeader } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import { Title } from './components/Title';
import { ButtonIconText } from './components/ButtonIconText';
import { ButtonIconRound } from './components/ButtonIconRound';

import styles from './Header.module.scss';

const routes = [
    {
        path: '/',
        breadcrumbName: 'Главная',
    },
];

export const Header = () => (
    <PageHeader
        className={styles.header}
        ghost={false}
        breadcrumb={{ routes }}
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
