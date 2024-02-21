import { useEffect } from 'react';
import { Form } from 'antd';
import { push } from 'redux-first-history';

import { LoginForm } from '../LoginForm';
import { RegistrationForm } from '../RegistrationForm';
import { Loader } from '@components/ui/Loader';
import { useLoginUserMutation, useRegistrationUserMutation } from '@redux/slice/authSlice';
import {
    changeUserAuth,
    clearUserCredentials,
    registerUserCredentials,
} from '@redux/slice/userInfoSlice';
import { RootState } from '@redux/store';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { AuthTypes } from '@type/auth/authTypes';

import styles from './AuthForm.module.scss';

interface AuthFormData {
    email: string;
    password: string;
    'password-confirm'?: string;
    remember?: boolean;
}

interface RegisterUserResult {
    status: number;
    data: {
        statusCode?: number;
        error?: string;
        message?: string;
    };
}

export const AuthForm = ({ type }: { type: AuthTypes }) => {
    const [form] = Form.useForm();

    const [registrationUser, { isLoading: isLoadingRegister }] = useRegistrationUserMutation();
    const [loginUser, { isLoading: isLoadingLogin }] = useLoginUserMutation();

    const dispatch = useAppDispatch();

    const previousLocations = useAppSelector((state: RootState) => state.router.previousLocations);
    const registerUserInfo = useAppSelector((state: RootState) => state.userInfoSlice.registerUser);

    const onFinish = (values: AuthFormData) => {

        if (type === 'registration') {
            handleSubmitRegister(values);
        } else {
            handleSubmitLogin(values);
        }
    };

    const handleSubmitRegister = async (values: AuthFormData) => {
        const { email, password } = values;

        try {
            await registrationUser({
                email,
                password,
            }).unwrap();

            dispatch(push('/result/success', { fromRedirect: true }));
            dispatch(clearUserCredentials());
        } catch (err: unknown) {
            const { status } = err as RegisterUserResult;

            if (status === 409) {
                dispatch(registerUserCredentials(values));
                dispatch(push('/result/error-user-exist', { fromRedirect: true }));
            } else {
                dispatch(push('/result/error', { fromRedirect: true }));
            }

        }
    };

    const handleSubmitLogin = async (values: AuthFormData) => {
        const { email, password } = values;

        try {
            const result = await loginUser({
                email,
                password,
            }).unwrap();

            if ('accessToken' in result) {
                const accessToken = result.accessToken as string;

                if (values.remember) {
                    localStorage.setItem('token', accessToken);
                }

                dispatch(changeUserAuth(true));
                dispatch(push('/main'));
            }
        } catch {
            dispatch(push('/result/error-login', { fromRedirect: true }));
        }
    };

    useEffect(() => {
        if (previousLocations?.[1]?.location?.pathname === '/result/error') {
            handleSubmitRegister(registerUserInfo);
        }
    }, [previousLocations]);

    return (
        <Form
            form={form}
            name={type}
            onFinish={onFinish}
            autoComplete='off'
            scrollToFirstError
            className={styles['auth-form']}
            initialValues={{ remember: true }}
        >
            {(isLoadingRegister || isLoadingLogin) && <Loader />}
            {type === 'login' ? <LoginForm /> : <RegistrationForm />}
        </Form>
    );
};
