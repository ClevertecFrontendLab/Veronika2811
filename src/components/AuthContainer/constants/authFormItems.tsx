import { AuthForm } from '../components/AuthForm';
import { auth } from '@constants/index';

export const AUTH_FORM_TABS = [
    { label: 'Вход', key: auth.LOGIN, children: <AuthForm type={auth.LOGIN} /> },
    { label: 'Регистрация', key: auth.REGISTRATION, children: <AuthForm type={auth.REGISTRATION} /> },
];
