import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

import {
    confirmPasswordValidationRules,
    emailValidationRules,
    passwordValidationRules,
} from '../utils/fieldValidation';

export const REGISTRATION_FIELDS = [
    {
        name: 'email',
        rules: emailValidationRules,
        className: 'register-field',
        children: <Input addonBefore='e-mail:' size='large' autoComplete='username' />,
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
            />
        ),
    },
    {
        name: 'password-confirm',
        rules: confirmPasswordValidationRules,
        className: 'password-confirm',
        children: (
            <Input.Password
                placeholder='Повторите пароль'
                size='large'
                iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
            />
        ),
        dependencies: 'password',
    },
];