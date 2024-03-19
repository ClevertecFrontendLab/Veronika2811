import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Input } from 'antd';

import {
    confirmPasswordValidationRules,
    emailValidationRules,
    passwordValidationRules,
} from '../utils/field-validation';

import { AuthTestIds } from './auth-test-ids';

export const REGISTRATION_FIELDS = [
    {
        name: 'email',
        rules: emailValidationRules,
        className: 'register-field',
        children: (
            <Input
                addonBefore='e-mail:'
                size='large'
                autoComplete='username'
                data-test-id={AuthTestIds.REGISTRATION_EMAIL}
            />
        ),
    },
    {
        name: 'password',
        rules: passwordValidationRules,
        help: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
        className: 'register-field',
        children: (
            <Input.Password
                placeholder='Пароль'
                size='large'
                iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                autoComplete='current-password'
                data-test-id={AuthTestIds.REGISTRATION_PASSWORD}
            />
        ),
    },
    {
        name: 'passwordConfirm',
        rules: confirmPasswordValidationRules,
        className: 'password-confirm',
        children: (
            <Input.Password
                placeholder='Повторите пароль'
                size='large'
                iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                autoComplete='new-password'
                data-test-id={AuthTestIds.REGISTRATION_PASSWORD_CONFIRM}
            />
        ),
        dependencies: 'password',
    },
];
