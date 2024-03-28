import { PERSONAL_INFO_FIELDS } from '@components/profile-form/constants/personal-info-fields';
import { Form } from 'antd';

import styles from './personal-info-form-fields.module.less';

export const PersonalInfoFormFields = () => (
    <div className={styles['personal-info']}>
        {PERSONAL_INFO_FIELDS.map((item) => (
            <Form.Item name={item.field} key={item.field}>
                {item.children}
            </Form.Item>
        ))}
    </div>
);
