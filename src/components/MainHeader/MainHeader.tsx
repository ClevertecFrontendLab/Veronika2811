import { PageHeader } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import { ButtonIconSettingRound,ButtonIconSettingText, Title } from './components';

import styles from './MainHeader.module.less';

export const MainHeader = () => (
    <PageHeader
        ghost={false}
        title={<Title />}
        extra={[
            <ButtonIconSettingText key='setting' label='Настройки' icon={<SettingOutlined />} />,
            <ButtonIconSettingRound
                key='setting-mobile'
                tooltipTitle='Настройки'
                icon={<SettingOutlined />}
            />,
        ]}
        className={styles['header-main']}
    />
);
