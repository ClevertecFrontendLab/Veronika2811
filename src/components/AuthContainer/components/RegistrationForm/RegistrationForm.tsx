import { Form } from 'antd';

import { AuthFormButtons } from '../AuthFormButtons';
import { REGISTRATION_FIELDS } from '@components/AuthContainer/constants/registrationFields';

import styles from './RegistrationForm.module.scss';

export const RegistrationForm = () => (
    <>
        {REGISTRATION_FIELDS.map((item) => (
            <Form.Item
                key={`registration-${item.name}`}
                name={item.name}
                rules={item.rules}
                className={styles[item.className]}
                dependencies={[item.dependencies] ?? []}
                help={item.help ?? ''}
            >
                {item.children}
            </Form.Item>
        ))}

        <Form.Item>
            <AuthFormButtons label='Регистрация' />
        </Form.Item>
    </>
);
