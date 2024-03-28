import { push } from 'redux-first-history';
import { SettingOutlined } from '@ant-design/icons';
import { BreadcrumbCustom } from '@components/page-headers/breadcrumb-custom';
import { useAppDispatch } from '@hooks/redux-hooks';
import { useBreakpoints } from '@hooks/use-breakpoints';
import { Paths } from '@routes/constants/router-paths';
import { Button, Layout, Typography } from 'antd';

import styles from './main-header.module.less';

const { Header } = Layout;
const { Title } = Typography;

export const MainHeader = () => {
    const { isXs } = useBreakpoints();
    const dispatch = useAppDispatch();

    const navigateToSettingsPage = () => dispatch(push(Paths.SETTINGS));

    return (
        <Header className={styles['header-main']}>
            <BreadcrumbCustom />
            <div className={styles['header-main-content']}>
                <Title>
                    Приветствуем тебя в CleverFit — приложении,
                    <br />
                    которое поможет тебе добиться своей мечты!
                </Title>
                <Button
                    type={isXs ? 'default' : 'text'}
                    shape={isXs ? 'circle' : 'default'}
                    icon={<SettingOutlined />}
                    className={styles['button-icon-setting']}
                    data-test-id='header-settings'
                    onClick={navigateToSettingsPage}
                >
                    Настройки
                </Button>
            </div>
        </Header>
    );
};
