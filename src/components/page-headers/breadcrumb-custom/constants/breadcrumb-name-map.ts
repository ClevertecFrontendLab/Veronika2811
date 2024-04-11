import { Paths } from '@routes/constants/router-paths';

export const breadcrumbNameMap: Record<string, string> = {
    [`/${Paths.FEEDBACKS}`]: 'Отзывы пользователей',
    [`/${Paths.CALENDAR}`]: 'Календарь',
    [`/${Paths.TRAINING}`]: 'Тренировки',
};
