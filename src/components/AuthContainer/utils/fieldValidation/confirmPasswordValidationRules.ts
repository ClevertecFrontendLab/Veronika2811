import { RuleObject } from 'antd/lib/form';

export const confirmPasswordValidationRules = [
    {
        required: true,
        message: 'Пожалуйста, подтвердите ваш пароль!',
    },
    ({ getFieldValue }: { getFieldValue: (fieldName: string) => string }) => ({
        validator(_: RuleObject, value: string) {
            const password = getFieldValue('password');

            if (!password) {
                return Promise.reject(new Error('Введите пароль!'));
            }

            if (password === value) {
                return Promise.resolve();
            }

            if (password !== value)
                return Promise.reject(new Error('Введённые вами пароли не совпадают!'));
        },
    }),
];
