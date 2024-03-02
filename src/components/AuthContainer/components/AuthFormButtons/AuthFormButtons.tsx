import { Button, Space } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';

import styles from './AuthFormButtons.module.scss';

type AuthFormButtonsProps = {
    label: string;
    testId: string;
    onClickGoogleLogin?: () => void;
};

export const AuthFormButtons = ({ label, testId, onClickGoogleLogin }: AuthFormButtonsProps) => (
    <Space direction='vertical' size={16} className={styles['auth-form-buttons']}>
        <Button htmlType='submit' type='primary' size='large' block data-test-id={testId}>
            Войти
        </Button>
        <Button size='large' block icon={<GooglePlusOutlined />} onClick={onClickGoogleLogin}>
            {label} через Google
        </Button>
    </Space>
);
