import { ReactNode } from 'react';
import { AuthStatus } from '@constants/auth/auth-status-constants';
import { FeedbacksStatus } from '@constants/feedbacks/feedbacks-constants';
import { TRAINING_STATUS_ERROR } from '@constants/training/training-status-constants';
import { Paths } from '@routes/constants/paths';
import { ResultStatusType } from 'antd/lib/result';

type ResultsInfo = {
    statusCode: number | string;
    status: ResultStatusType;
    title: string | ReactNode;
    subtitle?: string | ReactNode;
    button?: string | ReactNode;
    button1?: string | ReactNode;
    redirect?: string;
    testId?: string;
};

export const DEFAULT_RESULT: ResultsInfo = {
    statusCode: 'unknown-error',
    status: '500',
    title: 'Что-то пошло не так',
    subtitle: 'Произошла ошибка, попробуйте ещё раз.',
    button: 'Назад',
    redirect: Paths.MAIN,
};

export const RESULTS: ResultsInfo[] = [
    {
        statusCode: AuthStatus.STATUS_ERROR_409,
        status: 'error',
        title: 'Данные не сохранились',
        subtitle:
            'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.',
        button: 'Назад к регистрации',
        redirect: `${Paths.AUTH_MAIN}/${Paths.AUTH_SUB_REGISTRATION}`,
        testId: 'registration-back-button',
    },
    {
        statusCode: AuthStatus.STATUS_ERROR,
        status: 'error',
        title: 'Данные не сохранились',
        subtitle: 'Что-то пошло не так и ваша регистрация\nне завершилась. Попробуйте ещё раз.',
        button: 'Повторить',
        redirect: `${Paths.AUTH_MAIN}/${Paths.AUTH_SUB_REGISTRATION}`,
        testId: 'registration-retry-button',
    },
    {
        statusCode: AuthStatus.STATUS_SUCCESS,
        status: 'success',
        title: 'Регистрация успешна',
        subtitle:
            'Регистрация прошла успешно. Зайдите\nв приложение, используя свои e-mail и пароль.',
        button: 'Войти',
        redirect: Paths.AUTH_MAIN,
        testId: 'registration-enter-button',
    },
    {
        statusCode: AuthStatus.STATUS_ERROR_LOGIN,
        status: 'warning',
        title: 'Вход не выполнен',
        subtitle: 'Что-то пошло не так. Попробуйте еще раз',
        button: 'Повторить',
        redirect: Paths.AUTH_MAIN,
        testId: 'login-retry-button',
    },
    {
        statusCode: AuthStatus.STATUS_ERROR_CHECK_EMAIL_NO_EXIST,
        status: 'error',
        title: 'Такой e-mail не зарегистрирован',
        subtitle: 'Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.',
        button: 'Попробовать снова',
        redirect: Paths.AUTH_MAIN,
        testId: 'check-retry-button',
    },
    {
        statusCode: AuthStatus.STATUS_ERROR_CHECK_EMAIL,
        status: '500',
        title: 'Что-то пошло не так',
        subtitle: 'Произошла ошибка, попробуйте отправить форму ещё раз.',
        button: 'Назад',
        redirect: Paths.AUTH_MAIN,
        testId: 'check-back-button',
    },
    {
        statusCode: AuthStatus.STATUS_ERROR_CHANGE_PASSWORD,
        status: 'error',
        title: 'Данные не сохранились',
        subtitle: 'Что-то пошло не так. Попробуйте ещё раз',
        button: 'Повторить',
        redirect: `${Paths.AUTH_MAIN}/${Paths.AUTH_SUB_CHANGE_PASSWORD}`,
        testId: 'change-retry-button',
    },
    {
        statusCode: AuthStatus.STATUS_SUCCESS_CHANGE_PASSWORD,
        status: 'success',
        title: 'Пароль успешно изменен',
        subtitle: 'Теперь можно войти в аккаунт, используя\nсвой логин и новый пароль',
        button: 'Вход',
        redirect: Paths.AUTH_MAIN,
        testId: 'change-entry-button',
    },
    {
        statusCode: 'feedback-server-error',
        status: '500',
        title: 'Что-то пошло не так',
        subtitle: 'Произошла ошибка, попробуйте ещё раз.',
        button: 'Назад',
        redirect: Paths.MAIN,
    },
    {
        statusCode: FeedbacksStatus.STATUS_ERROR,
        status: 'error',
        title: 'Данные не сохранились',
        subtitle: 'Что-то пошло не так. Попробуйте ещё раз.',
    },
    {
        statusCode: FeedbacksStatus.STATUS_SUCCESS,
        status: 'success',
        title: 'Отзыв успешно опубликован',
        button: 'Отлично',
    },
    {
        statusCode: FeedbacksStatus.STATUS_SUCCESS,
        status: 'success',
        title: 'Отзыв успешно опубликован',
        button: 'Отлично',
    },
    {
        statusCode: TRAINING_STATUS_ERROR,
        status: '500',
        title: 'Что-то пошло не так',
        subtitle: 'Произошла ошибка, попробуйте ещё раз.',
        button: 'Назад',
        redirect: Paths.MAIN,
    },
];
