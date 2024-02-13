import { PageHeader } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import { Title } from './components/Title';
import { ButtonIconText } from './components/ButtonIconText';
import { ButtonIconRound } from './components/ButtonIconRound';

import styles from './Header.module.css';

const routes = [
    {
        path: '/',
        breadcrumbName: 'Главная',
    },
];

export const Header = () => (
    <PageHeader
        className={styles.header}
        breadcrumb={{ routes }}
        title={<Title />}
        extra={[
            <ButtonIconText
                key='setting'
                label='Настройки'
                icon={<SettingOutlined className={styles['header-button-icon']} />}
            />,
            <ButtonIconRound
                key='setting-mobile'
                tooltipTitle='Настройки'
                icon={<SettingOutlined />}
            />,
        ]}
    />
);
