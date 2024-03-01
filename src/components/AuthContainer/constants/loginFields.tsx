import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

import { emailValidationRules, passwordValidationRules } from '../utils/fieldValidation';
import { AuthTestIds } from './AuthTestIds';

export const LOGIN_FIELDS = [
    {
        name: 'email',
        rules: emailValidationRules,
        className: 'login-field',
        children: (
            <Input
                addonBefore='e-mail:'
                size='large'
                autoComplete='username'
                data-test-id={AuthTestIds.LOGIN_EMAIL}
            />
        ),
    },
    {
        name: 'password',
        rules: passwordValidationRules,
        className: 'login-field',
        children: (
            <Input.Password
                placeholder='Пароль'
                size='large'
                iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                autoComplete='current-password'
                data-test-id={AuthTestIds.LOGIN_PASSWORD}
            />
        ),
    },
];
