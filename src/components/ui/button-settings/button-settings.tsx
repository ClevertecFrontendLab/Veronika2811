import { push } from 'redux-first-history';
import { SettingOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/redux-hooks';
import { Paths } from '@routes/constants/router-paths';
import { Button } from 'antd';

import styles from './button-settings.module.less';

export const ButtonSettings = () => {
    const dispatch = useAppDispatch();

    const navigateToSettingsPage = () => dispatch(push(Paths.SETTINGS));

    return (
        <Button
            type='text'
            icon={<SettingOutlined />}
            className={styles['button-settings']}
            data-test-id='header-settings'
            onClick={navigateToSettingsPage}
        >
            Настройки
        </Button>
    );
};
