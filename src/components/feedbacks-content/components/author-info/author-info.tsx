import { FC } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Typography } from 'antd';

import styles from './author-info.module.less';

import { Feedback } from '@/types/feedbacks';

const { Meta } = Card;

export const AuthorInfo: FC<{ feedback: Feedback }> = ({ feedback }) => {
    const fullName = feedback.fullName?.split(' ').join('\n');

    return (
        <Meta
            className={styles['author-info']}
            avatar={<Avatar size={42} src={feedback.imageSrc} icon={<UserOutlined />} />}
            title={<Typography.Paragraph>{fullName || 'Пользователь'}</Typography.Paragraph>}
        />
    );
};
