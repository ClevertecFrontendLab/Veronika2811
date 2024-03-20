import { FC, useCallback, useEffect, useState } from 'react';
import { push } from 'redux-first-history';
import { LOGIN, REGISTRATION } from '@constants/auth/auth-constants';
import { AuthStatus } from '@constants/auth/auth-status-constants';
import { ACCESS_TOKEN_KEY } from '@constants/storage-keys';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import { useLoginUserMutation, useRegisterUserMutation } from '@redux/api/auth.api';
import { authSelector, previousLocationSelector } from '@redux/selectors';
import { saveRegistrationData, setAccessToken } from '@redux/slice/auth-slice';
import { setIsLoading } from '@redux/slice/main-slice';
import { Paths } from '@routes/constants/router-paths';
import { Form } from 'antd';

import { LoginForm } from '../login-form';
import { RegistrationForm } from '../registration-form';

import styles from './auth-form.module.less';

import { AuthComponentTypes } from '@/types/auth/auth-component-types';
import { AuthData, LoginData, RegistrationData } from '@/types/auth/auth-form-types';
import { ErrorTypeResponse } from '@/types/error-types';
import { FieldData } from '@/types/field-data';

export const AuthForm: FC<{ type: AuthComponentTypes }> = ({ type }) => {
    const [form] = Form.useForm();

    const [registrationUser, { isLoading: isLoadingRegister }] = useRegisterUserMutation();
    const [loginUser, { isLoading: isLoadingLogin }] = useLoginUserMutation();

    const previousLocations = useAppSelector(previousLocationSelector);
    const { registerUser } = useAppSelector(authSelector);
    const dispatch = useAppDispatch();

    const [isForgotPasswordButtonDisabled, setIsForgotPasswordButtonDisabled] = useState(false);

    const handleRegistrationError = useCallback(
        (err: unknown, formData: RegistrationData) => {
            const { status } = err as ErrorTypeResponse;
            const authSubResultPath =
                status === AuthStatus.STATUS_ERROR_409
                    ? Paths.AUTH_SUB_RESULT_409
                    : Paths.AUTH_SUB_RESULT_ERROR;

            const errorPath = `${Paths.AUTH_MAIN_RESULTS}/${authSubResultPath}`;

            dispatch(saveRegistrationData(formData));
            dispatch(push(errorPath, { fromRedirect: true }));
        },
        [dispatch],
    );

    const handleRegistrationSubmission = useCallback(
        async (formData: RegistrationData) => {
            const { email, password } = formData;

            try {
                await registrationUser({
                    email,
                    password,
                }).unwrap();

                dispatch(
                    push(`${Paths.AUTH_MAIN_RESULTS}/${Paths.AUTH_SUB_RESULT_SUCCESS}`, {
                        fromRedirect: true,
                    }),
                );
            } catch (err: unknown) {
                handleRegistrationError(err, formData);
            }
        },
        [dispatch, handleRegistrationError, registrationUser],
    );

    const handleLoginSubmission = async (formData: LoginData) => {
        const { email, password, remember } = formData;

        try {
            const result = await loginUser({
                email,
                password,
                remember: false,
            }).unwrap();

            if ('accessToken' in result) {
                const accessToken = result.accessToken as string;

                if (remember) {
                    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
                }

                dispatch(setAccessToken(accessToken));
                dispatch(push(Paths.AUTH_MAIN));
                dispatch(setIsLoading(false));
            }
        } catch {
            dispatch(
                push(`${Paths.AUTH_MAIN_RESULTS}/${Paths.AUTH_SUB_RESULT_ERROR_LOGIN}`, {
                    fromRedirect: true,
                }),
            );
        }
    };

    const validateEmailField = async (_: FieldData[], allFields: FieldData[]) => {
        if (type === LOGIN) {
            const emailField = allFields.find((field) => {
                if (Array.isArray(field.name)) {
                    return field.name[0] === 'email';
                }

                return field.name === 'email';
            });

            setIsForgotPasswordButtonDisabled(!(emailField && !emailField.errors?.length));
        }
    };

    const onFinish = (values: AuthData) => {
        if (type === REGISTRATION) {
            handleRegistrationSubmission(values);
        } else {
            handleLoginSubmission(values);
        }
    };

    useEffect(() => {
        const previousRoute = previousLocations?.[1]?.location?.pathname;

        if (previousRoute === `${Paths.AUTH_MAIN_RESULTS}/${Paths.AUTH_SUB_RESULT_ERROR}`) {
            handleRegistrationSubmission(registerUser);
        }
    }, [handleRegistrationSubmission, previousLocations, registerUser]);

    useEffect(() => {
        dispatch(setIsLoading(isLoadingRegister || isLoadingLogin));
    }, [isLoadingRegister, isLoadingLogin, dispatch]);

    return (
        <Form
            form={form}
            name={type}
            onFinish={onFinish}
            autoComplete='off'
            scrollToFirstError={true}
            className={styles['auth-form']}
            initialValues={{ remember: false }}
            onFieldsChange={validateEmailField}
        >
            {type === LOGIN ? (
                <LoginForm
                    form={form}
                    isForgotPasswordButtonDisabled={isForgotPasswordButtonDisabled}
                    setIsForgotPasswordButtonDisabled={setIsForgotPasswordButtonDisabled}
                />
            ) : (
                <RegistrationForm />
            )}
        </Form>
    );
};
