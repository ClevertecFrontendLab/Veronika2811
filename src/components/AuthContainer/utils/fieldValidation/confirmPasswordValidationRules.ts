import { RuleObject } from 'antd/lib/form';

export const confirmPasswordValidationRules = [
    {
        required: true,
        message: 'Пожалуйста, подтвердите ваш пароль!',
    },
    ({ getFieldValue }: { getFieldValue: (fieldName: string) => string }) => ({
        validator(_: RuleObject, value: string) {
            if (getFieldValue('password') === value) return Promise.resolve();

            if (getFieldValue('password') !== value)
                return Promise.reject(new Error('Введённые вами пароли не совпадают!!'));
        },
    }),
];
