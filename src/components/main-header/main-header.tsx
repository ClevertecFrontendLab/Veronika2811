import { SettingOutlined } from '@ant-design/icons';
import { PageHeader } from 'antd';

import { ButtonIconSettingRound, ButtonIconSettingText, Title } from './components';
import styles from './main-header.module.less';

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
