import { Link, useLocation } from 'react-router-dom';
import { SettingOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/redux-hooks';
import { setActiveMenuKey } from '@redux/slice/main-slice';
import { Paths } from '@routes/constants/router-paths';
import { Breadcrumb, Button, Typography } from 'antd';

import { breadcrumbNameMap } from './constants/breadcrumb-name-map';
import styles from './breadcrumb-custom.module.less';

const { Title } = Typography;

export const BreadcrumbCustom = () => {
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter((i) => i);

    const dispatch = useAppDispatch();

    const removeActiveMenuKey = () => dispatch(setActiveMenuKey(''));

    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{breadcrumbNameMap[url]}</Link>
            </Breadcrumb.Item>
        );
    });

    if (pathSnippets.includes(Paths.PROFILE)) {
        return (
            <div className={styles['breadcrumb-profile']}>
                <Title level={4} className='breadcrumb-profile-title'>
                    {breadcrumbNameMap[Paths.PROFILE]}
                </Title>
                <Button type='text' icon={<SettingOutlined />} className='button-icon-setting'>
                    Настройки
                </Button>
            </div>
        );
    }

    const breadcrumbItems = [
        <Breadcrumb.Item key='main'>
            <Link to={Paths.MAIN} onClick={removeActiveMenuKey}>
                Главная
            </Link>
        </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);

    const isMainPage = location.pathname !== `${Paths.ROOT}${Paths.MAIN}`;
    const separator = isMainPage ? '/' : null;

    return (
        <Breadcrumb separator={separator} className={styles.breadcrumb}>
            {breadcrumbItems}
        </Breadcrumb>
    );
};
