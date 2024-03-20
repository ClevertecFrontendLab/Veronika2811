import { useState } from 'react';
import { push } from 'redux-first-history';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import { useCheckVerificationCodeMutation } from '@redux/api/auth.api';
import { authSelector } from '@redux/selectors';
import { Paths } from '@routes/constants/router-paths';
import { Result, Typography } from 'antd';

import { ConfirmEmailTitle, CustomVerificationInput } from './components';
import styles from './confirm-email.module.less';

export const ConfirmEmail = () => {
    const [confirmEmail] = useCheckVerificationCodeMutation();

    const { verificationEmail } = useAppSelector(authSelector);
    const dispatch = useAppDispatch();

    const [incorrectVerificationCode, setIncorrectVerificationCode] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');

    const onCompleteVerificataion = async (code: string) => {
        setVerificationCode(code);

        try {
            await confirmEmail({
                email: verificationEmail,
                code,
            }).unwrap();

            dispatch(
                push(`${Paths.AUTH_MAIN}/${Paths.AUTH_SUB_CHANGE_PASSWORD}`, {
                    fromRedirect: true,
                }),
            );
            setIncorrectVerificationCode(false);
        } catch (err) {
            setVerificationCode('');
            setIncorrectVerificationCode(true);
        }
    };

    return (
        <Result
            className={styles['confirm-email']}
            status={incorrectVerificationCode ? 'error' : 'info'}
            title={<ConfirmEmailTitle incorrectVerificationCode={incorrectVerificationCode} />}
            subTitle={
                <Typography.Text>
                    Мы отправили вам на e-mail <strong>{verificationEmail}</strong> шестизначный
                    код. Введите его в поле ниже.
                </Typography.Text>
            }
        >
            <CustomVerificationInput
                verificationCode={verificationCode}
                setVerificationCode={setVerificationCode}
                incorrectVerificationCode={incorrectVerificationCode}
                onCompleteVerificataion={onCompleteVerificataion}
            />
            <Typography.Text>Не пришло письмо? Проверьте папку Спам.</Typography.Text>
        </Result>
    );
};
