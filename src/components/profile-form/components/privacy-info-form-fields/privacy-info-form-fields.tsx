import React from 'react';
import { PRIVACY_INFO_FIELDS } from '@components/profile-form/constants/privacy-info-fields';
import { Form } from 'antd';

import styles from './privacy-info-form-fields.module.less';

export const PrivacyInfoFormFields = () => (
    <React.Fragment>
        {PRIVACY_INFO_FIELDS.map((item) => (
            <Form.Item
                key={`profile-${item.field}`}
                name={item.field}
                rules={item.rules}
                className={styles[item.className]}
                dependencies={[item.dependencies] || []}
                help={item.help ?? ''}
            >
                {item.children}
            </Form.Item>
        ))}
    </React.Fragment>
);
