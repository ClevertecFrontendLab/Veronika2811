import { useEffect, useState } from 'react';
import { push } from 'redux-first-history';
import { Form } from 'antd';

import { LoginForm } from '../LoginForm';
import { RegistrationForm } from '../RegistrationForm';

import { Paths } from '@routes/constants/Paths';
import { useLoginUserMutation, useRegisterUserMutation } from '@redux/slice/authSlice';
import { previousLocationSelector, registrationUserDataSelector  } from '@redux/selectors';
import { setUserLoggedIn, saveRegistrationData, setIsLoading } from '@redux/slice/userInfoSlice';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { LOGIN, REGISTRATION } from '@constants/authConstants/auth';
import { AuthStatus } from '@constants/authConstants/authStatus';
import { ACCESS_TOKEN_KEY } from '@constants/authConstants/storageKeys';
import { AuthTypes } from '@type/auth/authTypes';
import { AuthData, AuthError, LoginData, RegistrationData } from '@interfaces/auth/authForm';

import styles from './AuthForm.module.scss';

export interface FieldData {
    name: string | number | (string | number)[];
    value?: string;
    touched?: boolean;
    validating?: boolean;
    errors?: string[];
}

export const AuthForm = ({ type }: { type: AuthTypes }) => {
    const [form] = Form.useForm();

    const [isForgotPasswordButtonDisabled, setIsForgotPasswordButtonDisabled] = useState(false);

    const [registrationUser, { isLoading: isLoadingRegister }] = useRegisterUserMutation();
    const [loginUser, { isLoading: isLoadingLogin }] = useLoginUserMutation();

    const previousLocations = useAppSelector(previousLocationSelector);
    const registrationUserData = useAppSelector(registrationUserDataSelector);
    const dispatch = useAppDispatch();

    const onFinish = (values: AuthData) => {
        if (type === REGISTRATION) {
            handleRegistrationSubmission(values);
        } else {
            handleLoginSubmission(values);
        }
    };

    const handleRegistrationSubmission = async (formData: RegistrationData) => {
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
    };

    const handleRegistrationError = (err: unknown, formData: RegistrationData) => {
        const { status } = err as AuthError;
        const errorPath = `${Paths.AUTH_MAIN_RESULTS}/${
            status === AuthStatus.STATUS_ERROR_409
                ? Paths.AUTH_SUB_RESULT_409
                : Paths.AUTH_SUB_RESULT_ERROR
        }`;

        dispatch(saveRegistrationData(formData));
        dispatch(push(errorPath, { fromRedirect: true }));
    };

    const handleLoginSubmission = async (formData: LoginData) => {
        const { email, password } = formData;

        try {
            const result = await loginUser({
                email,
                password,
            }).unwrap();

            if ('accessToken' in result) {
                const accessToken = result.accessToken as string;

                if (formData.remember) {
                    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
                } else {
                    sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
                }

                dispatch(setUserLoggedIn(true));
                dispatch(push(Paths.AUTH_MAIN));
                await new Promise(resolve => setTimeout(resolve, 500));
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
    }, [previousLocations]);

    useEffect(() => {
        dispatch(setIsLoading(isLoadingRegister || isLoadingLogin));
    }, [isLoadingRegister, isLoadingLogin]);

    return (
        <Form
            form={form}
            name={type}
            onFinish={onFinish}
            autoComplete='off'
            scrollToFirstError
            className={styles['auth-form']}
            initialValues={{ remember: true }}
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
