import { Form } from 'antd';

import { AuthFormButtons } from '../AuthFormButtons';
import { REGISTRATION_FIELDS } from '@components/AuthContainer/constants/registrationFields';

import { REGISTRATION } from '@constants/authConstants/auth';

import styles from './RegistrationForm.module.scss';

export const RegistrationForm = () => (
    <>
        {REGISTRATION_FIELDS.map((item) => (
            <Form.Item
                key={`${REGISTRATION}-${item.name}`}
                name={item.name}
                rules={item.rules}
                className={styles[item.className]}
                dependencies={[item.dependencies] || []}
                help={item.help ?? ''}
            >
                {item.children}
            </Form.Item>
        ))}

        <Form.Item className={styles['registration-wrapper-buttons']}>
            <AuthFormButtons label='Регистрация' testId='registration-submit-button' />
        </Form.Item>
    </>
);
