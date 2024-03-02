import { Avatar, Card, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { Feedback } from '@src/types/feedbacks';

import styles from './AuthorInfo.module.scss';

const { Meta } = Card;

export const AuthorInfo = ({ feedback }: { feedback: Feedback }) => {
    const fullName = feedback.fullName?.split(' ');

    return (
        <Meta
            className={styles['author-info']}
            avatar={<Avatar size={42} src={feedback.imageSrc} icon={<UserOutlined />} />}
            title={
                <>
                    {fullName ? (
                        fullName.map((part, index) => (
                            <Typography.Paragraph key={index}>{part}</Typography.Paragraph>
                        ))
                    ) : (
                        <Typography.Paragraph>Пользователь</Typography.Paragraph>
                    )}
                </>
            }
        />
    );
};
