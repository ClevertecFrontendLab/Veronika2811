import { GooglePlusOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';

import styles from './auth-form-buttons.module.less';

type AuthFormButtonsProps = {
    label: string;
    testId: string;
    onClickGoogleLogin?: () => void;
};

export const AuthFormButtons = ({ label, testId, onClickGoogleLogin }: AuthFormButtonsProps) => (
    <Space direction='vertical' size={16} className={styles['auth-form-buttons']}>
        <Button htmlType='submit' type='primary' size='large' block={true} data-test-id={testId}>
            Войти
        </Button>
        <Button
            size='large'
            block={true}
            icon={<GooglePlusOutlined />}
            onClick={onClickGoogleLogin}
        >
            {label} через Google
        </Button>
    </Space>
);
