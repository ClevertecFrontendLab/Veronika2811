import { FC } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';

import styles from './upload-button.module.less';

export const UploadButton: FC<{ isXs?: boolean }> = ({ isXs }) => {
    if (isXs) {
        return (
            <div className={styles['upload-mobile']}>
                <Typography.Text>Загрузить фото профиля:</Typography.Text>
                <Button type='default' size='large' icon={<UploadOutlined />}>
                    Загрузить
                </Button>
            </div>
        );
    }

    return (
        <div className={styles['upload-button-desktop']}>
            <PlusOutlined />
            <Typography.Text>{'Загрузить\nфото\nпрофиля'}</Typography.Text>
        </div>
    );
};
