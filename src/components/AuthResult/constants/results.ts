import { ReactNode } from 'react'
import { ResultStatusType } from 'antd/lib/result'

interface ResultsInfo {
    statusCode: number | string,
    status: ResultStatusType,
    title: string | ReactNode,
    subtitle: string | ReactNode,
    button: string | ReactNode,
    redirect: string;
    testId: string;
}

export const RESULTS: ResultsInfo[] = [
    {
        statusCode: 409,
        status: 'error',
        title: 'Данные не сохранились',
        subtitle: 'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.',
        button: 'Назад к регистрации',
        redirect: '/auth/registration',
        testId: 'registration-back-button',
    },
    {
        statusCode: 'error',
        status: 'error',
        title: 'Данные не сохранились',
        subtitle: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.',
        button: 'Повторить',
        redirect: '/auth/registration',
        testId: 'registration-retry-button'
    },
    {
        statusCode: 'success',
        status: 'success',
        title: 'Регистрация успешна',
        subtitle: 'Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.',
        button: 'Войти',
        redirect: '/auth',
        testId: 'registration-enter-button',
    },
    {
        statusCode: 'error-login',
        status: 'warning',
        title: 'Вход не выполнен',
        subtitle: 'Что-то пошло не так. Попробуйте еще раз',
        button: 'Повторить',
        redirect: '/auth',
        testId: 'login-retry-button',
    }
]
