import { Button, Space } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';

import styles from './AuthFormButtons.module.scss';

interface AuthFormButtonsProps {
    label: string;
    testId: string;
}

export const AuthFormButtons = ({ label, testId }: AuthFormButtonsProps) => (
    <Space direction='vertical' size={16} className={styles['auth-form-buttons']}>
        <Button htmlType='submit' type='primary' size='large' block data-test-id={testId}>
            {label}
        </Button>
        <Button size='large' block icon={<GooglePlusOutlined />}>
            {label} через Google
        </Button>
    </Space>
);
