import { Checkbox, Form } from 'antd';

import { AuthFormButtons } from '../AuthFormButtons';
import { LOGIN_FIELDS } from '@components/AuthContainer/constants/loginFields';

import styles from './LoginForm.module.scss';

export const LoginForm = () => (
    <>
        {LOGIN_FIELDS.map((item) => (
            <Form.Item
                key={`login-${item.name}`}
                name={item.name}
                rules={item.rules}
                className={styles[item.className]}
                help=''
            >
                {item.children}
            </Form.Item>
        ))}

        <div className={styles['login-forgot']}>
            <Form.Item name='remember' valuePropName='checked' noStyle>
                <Checkbox data-test-id='login-remember'>Запомнить меня</Checkbox>
            </Form.Item>

            <a className={styles['login-forgot-link']} href='#' data-test-id='login-forgot-button'>
                Забыли пароль?
            </a>
        </div>

        <Form.Item>
            <AuthFormButtons label='Войти' testId='login-submit-button' />
        </Form.Item>
    </>
);
