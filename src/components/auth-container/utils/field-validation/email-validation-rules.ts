import { Rule } from 'antd/lib/form';

export const emailValidationRules: Rule[] = [
    {
        required: true,
        message: 'Пожалуйста, введите ваш адрес электронной почты!',
    },
    {
        type: 'email',
        message: 'Неверный формат адреса электронной почты!',
    },
];
