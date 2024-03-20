import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch } from '@hooks/redux-hooks';
import { setActiveMenuKey } from '@redux/slice/main-slice';
import { Paths } from '@routes/constants/router-paths';
import { Breadcrumb } from 'antd';

export const BreadcrumbCustom = () => {
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter((i) => i);

    const dispatch = useAppDispatch();

    const breadcrumbNameMap: Record<string, string> = {
        [`/${Paths.FEEDBACKS}`]: 'Отзывы пользователей',
        [`/${Paths.CALENDAR}`]: 'Календарь',
        [`/${Paths.WORKOUTS}`]: 'Тренировки',
        [`/${Paths.PROFILE}`]: 'Профиль',
    };

    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{breadcrumbNameMap[url]}</Link>
            </Breadcrumb.Item>
        );
    });

    const removeActiveMenuKey = () => dispatch(setActiveMenuKey(''));

    const breadcrumbItems = [
        <Breadcrumb.Item key='main'>
            <Link to={Paths.MAIN} onClick={removeActiveMenuKey}>
                Главная
            </Link>
        </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);

    const isMainPage = location.pathname !== `${Paths.ROOT}${Paths.MAIN}`;
    const separator = isMainPage ? '/' : null;

    return <Breadcrumb separator={separator}>{breadcrumbItems}</Breadcrumb>;
};
