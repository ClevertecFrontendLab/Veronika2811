import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Input } from 'antd';

import { confirmPasswordValidationRules, passwordValidationRules } from '../utils/field-validation';

import { AUTH_TEST_IDS } from './auth-test-ids';

export const CHANGE_PASSWORD_FIELDS = [
    {
        name: 'password',
        rules: passwordValidationRules(true),
        help: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
        children: (
            <Input.Password
                placeholder='Новый пароль'
                size='large'
                iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                autoComplete='current-password'
                data-test-id={AUTH_TEST_IDS.changePassword}
            />
        ),
    },
    {
        name: 'confirmPassword',
        rules: confirmPasswordValidationRules(true),
        children: (
            <Input.Password
                placeholder='Повторите пароль'
                size='large'
                iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                autoComplete='new-password'
                data-test-id={AUTH_TEST_IDS.changeConfirmPassword}
            />
        ),
        dependencies: 'password',
    },
];
