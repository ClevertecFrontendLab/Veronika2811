import { Form } from 'antd';

import { LoginForm } from '../LoginForm';
import { RegistrationForm } from '../RegistrationForm';

import styles from './AuthForm.module.scss';

interface AuthFormData {
    email: string;
    password: string;
    'password-confirm'?: string;
    remember?: boolean;
}

export const AuthForm = ({ type }: { type: 'login' | 'registration' }) => {
    const [form] = Form.useForm();

    const onFinish = (values: AuthFormData) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Form
            form={form}
            name={type}
            onFinish={onFinish}
            autoComplete='off'
            scrollToFirstError
            className={styles['auth-form']}
        >
            {type === 'login' ? <LoginForm /> : <RegistrationForm />}
        </Form>
    );
};
