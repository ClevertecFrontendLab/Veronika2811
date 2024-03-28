import { FC } from 'react';
import { Typography } from 'antd';

export const ConfirmEmailTitle: FC<{ incorrectVerificationCode: boolean }> = ({
    incorrectVerificationCode,
}) => {
    if (!incorrectVerificationCode) {
        return (
            <Typography.Text className='confirm-email-code'>
                Введите код{'\n'}для восстановления аккаунта
            </Typography.Text>
        );
    }

    return (
        <Typography.Text className='confirm-email-code-error'>
            Неверный код. Введите код для восстановления аккауанта
        </Typography.Text>
    );
};
