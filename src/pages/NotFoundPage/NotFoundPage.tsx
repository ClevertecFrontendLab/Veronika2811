import React from 'react';
import { Typography } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import { Logo } from '@components/ui/Logo';

import styles from './NotFoundPage.module.scss';

export const NotFoundPage: React.FC = () => (
    <Content className={styles['not-found-page']}>
        <div>
            <Logo size='md' />
        </div>
        <Typography.Title>Извините!</Typography.Title>
        <Typography.Paragraph>Эта страница недоступна. Попробуйте позже.</Typography.Paragraph>
    </Content>
);
