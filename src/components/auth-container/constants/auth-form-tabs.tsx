import { LOGIN, REGISTRATION } from '@constants/auth/auth-constants';

import { AuthForm } from '../components/auth-form';

export const AUTH_FORM_TABS = [
    { label: 'Вход', key: LOGIN, children: <AuthForm type={LOGIN} /> },
    { label: 'Регистрация', key: REGISTRATION, children: <AuthForm type={REGISTRATION} /> },
];
