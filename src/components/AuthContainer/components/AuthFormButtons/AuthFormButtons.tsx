import { Button, Space } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';

import styles from './AuthFormButtons.module.scss';

export const AuthFormButtons = ({ label }: { label: string }) => (
    <Space direction='vertical' size={16} className={styles['auth-form-buttons']}>
        <Button htmlType='submit' type='primary' size='large' block>
            {label}
        </Button>
        <Button size='large' block icon={<GooglePlusOutlined />}>
            {label} через Google
        </Button>
    </Space>
);
