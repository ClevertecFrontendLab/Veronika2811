import { Link, useLocation } from 'react-router-dom';
import { Paths } from '@routes/constants/router-paths';
import { Breadcrumb } from 'antd';

import { breadcrumbNameMap } from './constants/breadcrumb-name-map';
import styles from './breadcrumb-custom.module.less';

export const BreadcrumbCustom = () => {
    const location = useLocation();

    const pathSnippets = location.pathname.split('/').filter((i) => i);

    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{breadcrumbNameMap[url]}</Link>
            </Breadcrumb.Item>
        );
    });

    const breadcrumbItems = [
        <Breadcrumb.Item key='main'>
            <Link to={Paths.ROOT}>Главная</Link>
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
