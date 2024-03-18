import { AuthForm } from '../components/AuthForm';

import { LOGIN, REGISTRATION } from '@constants/auth/authConstants';

export const AUTH_FORM_TABS = [
    { label: 'Вход', key: LOGIN, children: <AuthForm type={LOGIN} /> },
    { label: 'Регистрация', key: REGISTRATION, children: <AuthForm type={REGISTRATION} /> },
];
