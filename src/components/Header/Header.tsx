import { Button, PageHeader, Tooltip } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import styles from './Header.module.css';

const routes = [
    {
        path: '/',
        breadcrumbName: 'Главная',
    },
];

export const Header = () => {
    return (
        <PageHeader
            className={styles.header}
            breadcrumb={{ routes }}
            title={
                <h1 className={styles.title}>
                    <span className={styles['title-additional-first-line']}>Приветствуем тебя&nbsp;</span>
                    в CleverFit — приложении,
                    <span className={styles['title-additional']}>
                        которое поможет тебе добиться своей мечты!
                    </span>
                </h1>
            }
            extra={[
                <Button
                    key='setting'
                    type='text'
                    className={styles['header-button']}
                    icon={<SettingOutlined className={styles['header-button-icon']} />}
                >
                    Настройки
                </Button>,
                <Tooltip title='Настройки'>
                    <Button
                        shape='circle'
                        className={styles['header-button-icon-mobile']}
                        icon={<SettingOutlined />}
                    />
                </Tooltip>,
            ]}
        />
    );
};
