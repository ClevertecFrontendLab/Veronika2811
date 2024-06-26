import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Input } from 'antd';

import { emailValidationRules, passwordValidationRules } from '../utils/field-validation';

import { AUTH_TEST_IDS } from './auth-test-ids';

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
                data-test-id={AUTH_TEST_IDS.loginEmail}
            />
        ),
    },
    {
        name: 'password',
        rules: passwordValidationRules(true),
        className: 'login-field',
        children: (
            <Input.Password
                placeholder='Пароль'
                size='large'
                iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                autoComplete='current-password'
                data-test-id={AUTH_TEST_IDS.loginPassword}
            />
        ),
    },
];
