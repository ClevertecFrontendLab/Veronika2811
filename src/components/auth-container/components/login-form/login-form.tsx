import React, { FC, useCallback, useEffect } from 'react';
import { push } from 'redux-first-history';
import { AUTH_TEST_IDS } from '@components/auth-container/constants/auth-test-ids';
import { LOGIN_FIELDS } from '@components/auth-container/constants/login-fields';
import { LOGIN } from '@constants/auth/auth-constants';
import { AuthStatus } from '@constants/auth/auth-status-constants';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import { useCheckEmailExistenceMutation } from '@redux/api/auth.api';
import { ApiEndpoints } from '@redux/api/constants/api-endpoints';
import { BASE_URL } from '@redux/api/constants/base-url';
import { authSelector, previousLocationSelector } from '@redux/selectors';
import { saveEmailRecoveryPassword } from '@redux/slice/auth-slice';
import { Paths } from '@routes/constants/router-paths';
import { Button, Checkbox, Form, FormInstance } from 'antd';

import { AuthFormButtons } from '../auth-form-buttons';

import styles from './login-form.module.less';

import { EmailData } from '@/types/auth';
import { ErrorTypeResponse } from '@/types/error-types';

type LoginFormProps = {
    form: FormInstance;
    isForgotPasswordButtonDisabled: boolean;
    setIsForgotPasswordButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoginForm: FC<LoginFormProps> = ({
    form,
    isForgotPasswordButtonDisabled,
    setIsForgotPasswordButtonDisabled,
}) => {
    const [checkUser] = useCheckEmailExistenceMutation();

    const previousLocations = useAppSelector(previousLocationSelector);
    const { verificationEmail } = useAppSelector(authSelector);
    const dispatch = useAppDispatch();

    const checkEmailRegistrationError = useCallback(
        (err: unknown) => {
            const { status, data } = err as ErrorTypeResponse;

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
        window.location.href = `${BASE_URL}${ApiEndpoints.AUTH_GOOGLE}`;
    };

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

    useEffect(() => {
        const previousPath = previousLocations?.[1]?.location?.pathname;

        if (
            previousPath === `${Paths.AUTH_MAIN_RESULTS}/${Paths.AUTH_SUB_RESULT_ERROR_CHECK_EMAIL}`
        ) {
            checkEmailRegistration(verificationEmail);
        }
    }, [checkEmailRegistration, previousLocations, verificationEmail]);

    return (
        <React.Fragment>
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
                <Form.Item name='remember' valuePropName='checked' noStyle={true}>
                    <Checkbox data-test-id={AUTH_TEST_IDS.loginRemember}>Запомнить меня</Checkbox>
                </Form.Item>

                <Button
                    type='link'
                    data-test-id={AUTH_TEST_IDS.loginForgotButton}
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
        </React.Fragment>
    );
};
