import { useState } from 'react';
import { push } from 'redux-first-history';
import { Result, Typography } from 'antd';

import { ConfirmEmailTitle } from './components';
import { CustomVerificationInput } from './components/CustomVerificationInput';

import { useCheckVerificationCodeMutation } from '@redux/api/auth.api';
import { verificationEmailSelector } from '@redux/selectors';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { Paths } from '@routes/constants/Paths';

import styles from './ConfirmEmail.module.scss';

export const ConfirmEmail = () => {
    const [confirmEmail] = useCheckVerificationCodeMutation();

    const verificationEmail = useAppSelector(verificationEmailSelector);
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
            status={!incorrectVerificationCode ? 'info' : 'error'}
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
