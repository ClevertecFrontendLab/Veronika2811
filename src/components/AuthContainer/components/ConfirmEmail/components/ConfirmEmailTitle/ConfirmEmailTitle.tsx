import { Typography } from 'antd';

export const ConfirmEmailTitle = ({
    incorrectVerificationCode,
}: {
    incorrectVerificationCode: boolean;
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
