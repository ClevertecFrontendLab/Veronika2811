import { RuleObject } from 'antd/lib/form';

export const passwordValidationRules = [
    {
        required: true,
        message: 'Пожалуйста, введите пароль!',
    },
    {
        validator(_: RuleObject, value: string) {
            if (!/[A-Z]/.test(value) || !/\d/.test(value)) {
                return Promise.reject(
                    new Error('Пароль должен содержать хотя бы одну заглавную букву и одну цифру!'),
                );
            }

            if((!/^[a-zA-Z0-9]{8,}$/.test(value))) {
                return Promise.reject(
                    new Error('Пароль должен содержать только символы латинского алфавита и cодержать не менее 8 символов!'),
                );
            }

            return Promise.resolve();
        },
    },
];
