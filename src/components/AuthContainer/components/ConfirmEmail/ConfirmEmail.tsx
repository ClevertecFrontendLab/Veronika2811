import { useState } from 'react';
import VerificationInput from 'react-verification-input';
import { Result, Typography } from 'antd';
import classNames from 'classnames';
import { push } from 'redux-first-history';

import { useCheckVerificationCodeMutation } from '@redux/slice/authSlice';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Paths } from '@routes/constants/Paths';

import { RootState } from '@redux/store';

import styles from './ConfirmEmail.module.scss';
import { AuthTestIds } from '@components/AuthContainer/constants/AuthTestIds';

export const ConfirmEmail = () => {
    const [incorrectVerificationCode, setIncorrectVerificationCode] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');

    const [confirmEmail] = useCheckVerificationCodeMutation();

    const resetPasswordEmail = useAppSelector((state: RootState) => state.userInfoSlice.resetPasswordEmail);
    const dispatch = useAppDispatch();

    const onCompleteVerificataion = async (code: string) => {
        setVerificationCode(code);

        try {
            await confirmEmail({
                email: resetPasswordEmail,
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
            title={
                !incorrectVerificationCode
                    ? 'Введите код для восстановления аккаунта'
                    : 'Неверный код. Введите код для восстановления аккауанта'
            }
            subTitle={`Мы отправили вам на e-mail ${resetPasswordEmail} шестизначный код. Введите его в поле ниже.`}
        >
            <VerificationInput
                value={verificationCode}
                onChange={setVerificationCode}
                validChars='0-9'
                placeholder=''
                classNames={{
                    container: 'container',
                    character: classNames(
                        styles.character,
                        incorrectVerificationCode ? styles['character-error'] : null,
                    ),
                    characterInactive: styles['character--inactive'],
                    characterSelected: 'character--selected',
                    characterFilled: styles['character--filled'],
                }}
                onComplete={onCompleteVerificataion}
                inputProps={{ 'data-test-id': AuthTestIds.VERIFICATION_INPUT }}
            />
            <Typography.Text>Не пришло письмо? Проверьте папку Спам.</Typography.Text>
        </Result>
    );
};
