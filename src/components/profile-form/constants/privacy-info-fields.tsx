import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { emailValidationRules } from '@components/auth-container/utils/field-validation';
import { confirmPasswordValidationRules } from '@components/auth-container/utils/field-validation/confirm-password-validation-rules';
import { passwordValidationRules } from '@components/auth-container/utils/field-validation/password-validation-rules';
import { Input } from 'antd';

import { PROFILE_TEST_IDS } from './profile-test-ids';

const inputPasswordIcon = (visible: boolean) =>
    visible ? <EyeOutlined /> : <EyeInvisibleOutlined />;

export const PRIVACY_INFO_FIELDS = [
    {
        field: 'email',
        rules: emailValidationRules,
        className: 'privacy-field',
        children: (
            <Input
                addonBefore='e-mail:'
                size='large'
                data-test-id={PROFILE_TEST_IDS.profileEmail}
                autoComplete='username'
            />
        ),
    },
    {
        field: 'password',
        rules: passwordValidationRules(false),
        help: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
        className: 'privacy-field',
        children: (
            <Input.Password
                placeholder='Пароль'
                size='large'
                iconRender={inputPasswordIcon}
                autoComplete='current-password'
                data-test-id={PROFILE_TEST_IDS.profilePassword}
            />
        ),
    },
    {
        field: 'passwordConfirm',
        rules: confirmPasswordValidationRules(false),
        dependencies: 'password',
        className: 'privacy-field',
        children: (
            <Input.Password
                placeholder='Повторите пароль'
                size='large'
                iconRender={inputPasswordIcon}
                autoComplete='current-password'
                data-test-id={PROFILE_TEST_IDS.profileRepeatPassword}
            />
        ),
    },
];
