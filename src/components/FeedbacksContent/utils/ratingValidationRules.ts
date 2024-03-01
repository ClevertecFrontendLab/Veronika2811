import { RuleObject } from 'antd/lib/form';

export const ratingValidationRules = [
    {
        validator(_: RuleObject, value: string) {
            if (!value) {
                return Promise.reject(new Error('Пожалуйста, введите ваш рейтинг приложения!'));
            }
            return Promise.resolve();
        },
    },
];
