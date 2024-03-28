import {
    PASSWORD_REGEX_DIGIT,
    PASSWORD_REGEX_LENGTH,
    PASSWORD_REGEX_UPPERCASE,
} from '@components/auth-container/constants/auth-form-validation-regex';
import { RuleObject } from 'antd/lib/form';

export const passwordValidationRules = (required: boolean) => [
    {
        required,
        message: 'Пожалуйста, введите пароль!',
    },
    {
        validator(_: RuleObject, value: string) {
            if (!required && !value) {
                return Promise.resolve();
            }

            if (!PASSWORD_REGEX_UPPERCASE.test(value) || !PASSWORD_REGEX_DIGIT.test(value)) {
                return Promise.reject(
                    new Error('Пароль должен содержать хотя бы одну заглавную букву и одну цифру!'),
                );
            }

            if (!PASSWORD_REGEX_LENGTH.test(value)) {
                return Promise.reject(
                    new Error(
                        'Пароль должен содержать только символы латинского алфавита и cодержать не менее 8 символов!',
                    ),
                );
            }

            return Promise.resolve();
        },
    },
];
