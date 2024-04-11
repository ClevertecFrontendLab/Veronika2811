import { AuthTabs } from '@constants/auth/auth-tabs';

import { AuthForm } from '../components/auth-form';

export const AUTH_FORM_TABS = [
    { label: 'Вход', key: AuthTabs.login, children: <AuthForm type={AuthTabs.login} /> },
    {
        label: 'Регистрация',
        key: AuthTabs.registration,
        children: <AuthForm type={AuthTabs.registration} />,
    },
];
