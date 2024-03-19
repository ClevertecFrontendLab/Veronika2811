import React from 'react';
import { LogoApp } from '@components/ui/logo-app';
import { Typography } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import styles from './not-found-page.module.less';

export const NotFoundPage: React.FC = () => (
    <Content className={styles['not-found-page']}>
        <div>
            <LogoApp size='md' />
        </div>
        <Typography.Title>Извините!</Typography.Title>
        <Typography.Paragraph>Эта страница недоступна. Попробуйте позже.</Typography.Paragraph>
    </Content>
);
