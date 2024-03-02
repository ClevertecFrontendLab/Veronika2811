import { useCallback, useEffect, useState } from 'react';
import { push } from 'redux-first-history';
import { Form } from 'antd';

import { LoginForm } from '../LoginForm';
import { RegistrationForm } from '../RegistrationForm';

import { useLoginUserMutation, useRegisterUserMutation } from '@redux/api/auth.api';
import { previousLocationSelector, registrationUserDataSelector } from '@redux/selectors';
import { saveRegistrationData, setAccessToken, setIsLoading } from '@redux/slice/authSlice';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { Paths } from '@routes/constants/Paths';
import { LOGIN, REGISTRATION } from '@constants/auth/authConstants';
import { AuthStatus } from '@constants/auth/authStatusConstants';
import { ACCESS_TOKEN_KEY } from '@constants/storageKeys';
import { AuthComponentTypes } from '@src/types/auth/authComponentTypes';
import { AuthData, LoginData, RegistrationData } from '@src/types/auth/authFormTypes';
import { ErrorTypes } from '@src/types/errorTypes';
import { FieldData } from '@src/types/fieldData';

import styles from './AuthForm.module.scss';

export const AuthForm = ({ type }: { type: AuthComponentTypes }) => {
    const [form] = Form.useForm();

    const [registrationUser, { isLoading: isLoadingRegister }] = useRegisterUserMutation();
    const [loginUser, { isLoading: isLoadingLogin }] = useLoginUserMutation();

    const previousLocations = useAppSelector(previousLocationSelector);
    const registrationUserData = useAppSelector(registrationUserDataSelector);
    const dispatch = useAppDispatch();

    const [isForgotPasswordButtonDisabled, setIsForgotPasswordButtonDisabled] = useState(false);

    const onFinish = (values: AuthData) => {
        if (type === REGISTRATION) {
            handleRegistrationSubmission(values);
        } else {
            handleLoginSubmission(values);
        }
    };

    const handleRegistrationError = useCallback(
        (err: unknown, formData: RegistrationData) => {
            const { status } = err as ErrorTypes;
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
                await new Promise((resolve) => setTimeout(resolve, 500));
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

    useEffect(() => {
        const previousRoute = previousLocations?.[1]?.location?.pathname;

        if (previousRoute === `${Paths.AUTH_MAIN_RESULTS}/${Paths.AUTH_SUB_RESULT_ERROR}`) {
            handleRegistrationSubmission(registrationUserData);
        }
    }, [handleRegistrationSubmission, previousLocations, registrationUserData]);

    useEffect(() => {
        dispatch(setIsLoading(isLoadingRegister || isLoadingLogin));
    }, [isLoadingRegister, isLoadingLogin, dispatch]);

    return (
        <Form
            form={form}
            name={type}
            onFinish={onFinish}
            autoComplete='off'
            scrollToFirstError
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
