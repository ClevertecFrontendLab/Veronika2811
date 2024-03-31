import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Input } from 'antd';

import {
    confirmPasswordValidationRules,
    emailValidationRules,
    passwordValidationRules,
} from '../utils/field-validation';

import { AUTH_TEST_IDS } from './auth-test-ids';

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
                data-test-id={AUTH_TEST_IDS.registrationEmail}
            />
        ),
    },
    {
        name: 'password',
        rules: passwordValidationRules(true),
        help: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
        className: 'register-field',
        children: (
            <Input.Password
                placeholder='Пароль'
                size='large'
                iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                autoComplete='current-password'
                data-test-id={AUTH_TEST_IDS.registrationPassword}
            />
        ),
    },
    {
        name: 'passwordConfirm',
        rules: confirmPasswordValidationRules(true),
        className: 'password-confirm',
        children: (
            <Input.Password
                placeholder='Повторите пароль'
                size='large'
                iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                autoComplete='new-password'
                data-test-id={AUTH_TEST_IDS.registrationConfirmPassword}
            />
        ),
        dependencies: 'password',
    },
];
