import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';

import { Paths } from '@routes/constants/Paths';

export const BreadcrumbCustom = () => {
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter((i) => i);

    const breadcrumbNameMap: Record<string, string> = {
        [Paths.FEEDBACKS]: 'Отзывы пользователей',
    };

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
            <Link to='/main'>Главная</Link>
        </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);

    const isMainPage = location.pathname !== Paths.MAIN;
    const separator = isMainPage ? '/' : null;

    return <Breadcrumb separator={separator}>{breadcrumbItems}</Breadcrumb>;
};
