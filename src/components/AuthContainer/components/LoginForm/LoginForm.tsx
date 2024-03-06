import React, { useCallback, useEffect } from 'react';
import { push } from 'redux-first-history';
import { Button, Checkbox, Form, FormInstance } from 'antd';

import { AuthTestIds } from '@components/AuthContainer/constants/AuthTestIds';
import { LOGIN_FIELDS } from '@components/AuthContainer/constants/loginFields';

import { AuthFormButtons } from '../AuthFormButtons';

import { useCheckEmailExistenceMutation } from '@redux/api/auth.api';
import { BASE_URL } from '@redux/api/constants/baseUrl';
import { previousLocationSelector, verificationEmailSelector } from '@redux/selectors';
import { saveEmailRecoveryPassword } from '@redux/slice/authSlice';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { Paths } from '@routes/constants/Paths';
import { EmailData } from '@/types/auth';
import { ErrorTypes } from '@/types/errorTypes';
import { LOGIN } from '@constants/auth/authConstants';
import { AuthStatus } from '@constants/auth/authStatusConstants';

import styles from './LoginForm.module.scss';

type LoginFormProps = {
    form: FormInstance;
    isForgotPasswordButtonDisabled: boolean;
    setIsForgotPasswordButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoginForm = ({
    form,
    isForgotPasswordButtonDisabled,
    setIsForgotPasswordButtonDisabled,
}: LoginFormProps) => {
    const [checkUser] = useCheckEmailExistenceMutation();

    const previousLocations = useAppSelector(previousLocationSelector);
    const verificationEmail = useAppSelector(verificationEmailSelector);
    const dispatch = useAppDispatch();

    const validateEmailFieldOnClick = async () => {
        await form
            .validateFields(['email'])
            .then((value: EmailData) => {
                checkEmailRegistration(value.email);
            })
            .catch(() => {
                setIsForgotPasswordButtonDisabled(true);
            });
    };

    const checkEmailRegistrationError = useCallback(
        (err: unknown) => {
            const { status, data } = err as ErrorTypes;

            if (
                status === AuthStatus.STATUS_ERROR_CHECK_EMAIL_404 &&
                data.message === 'Email не найден'
            ) {
                dispatch(
                    push(
                        `${Paths.AUTH_MAIN_RESULTS}/${Paths.AUTH_SUB_RESULT_ERROR_CHECK_EMAIL_NO_EXIST}`,
                        { fromRedirect: true },
                    ),
                );
            } else {
                dispatch(
                    push(`${Paths.AUTH_MAIN_RESULTS}/${Paths.AUTH_SUB_RESULT_ERROR_CHECK_EMAIL}`, {
                        fromRedirect: true,
                    }),
                );
            }
        },
        [dispatch],
    );

    const checkEmailRegistration = useCallback(
        async (email: string) => {
            dispatch(saveEmailRecoveryPassword(email));

            try {
                await checkUser({ email }).unwrap();

                dispatch(
                    push(`${Paths.AUTH_MAIN}/${Paths.AUTH_SUB_CONFIRM_EMAIL}`, {
                        fromRedirect: true,
                    }),
                );
            } catch (err: unknown) {
                checkEmailRegistrationError(err);
            }
        },
        [checkEmailRegistrationError, checkUser, dispatch],
    );

    const handleGoogleLogin = () => {
        window.location.href = `${BASE_URL}/auth/google`;
    };

    useEffect(() => {
        const previousPath = previousLocations?.[1]?.location?.pathname;

        if (
            previousPath === `${Paths.AUTH_MAIN_RESULTS}/${Paths.AUTH_SUB_RESULT_ERROR_CHECK_EMAIL}`
        ) {
            checkEmailRegistration(verificationEmail);
        }
    }, [checkEmailRegistration, previousLocations, verificationEmail]);

    return (
        <>
            {LOGIN_FIELDS.map((item) => (
                <Form.Item
                    key={`${LOGIN}-${item.name}`}
                    name={item.name}
                    rules={item.rules}
                    help=''
                    className={styles[item.className]}
                >
                    {item.children}
                </Form.Item>
            ))}

            <div className={styles['login-forgot']}>
                <Form.Item name='remember' valuePropName='checked' noStyle>
                    <Checkbox data-test-id={AuthTestIds.LOGIN_REMEMBER}>Запомнить меня</Checkbox>
                </Form.Item>

                <Button
                    type='text'
                    data-test-id={AuthTestIds.LOGIN_FORGOT_BUTTON}
                    disabled={isForgotPasswordButtonDisabled}
                    onClick={validateEmailFieldOnClick}
                >
                    Забыли пароль?
                </Button>
            </div>

            <Form.Item>
                <AuthFormButtons
                    label='Войти'
                    testId='login-submit-button'
                    onClickGoogleLogin={handleGoogleLogin}
                />
            </Form.Item>
        </>
    );
};
