import React from 'react';
import { REGISTRATION_FIELDS } from '@components/auth-container/constants/registration-fields';
import { REGISTRATION } from '@constants/auth/auth-constants';
import { Form } from 'antd';

import { AuthFormButtons } from '../auth-form-buttons';

import styles from './registration-form.module.less';

export const RegistrationForm = () => (
    <React.Fragment>
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
    </React.Fragment>
);
