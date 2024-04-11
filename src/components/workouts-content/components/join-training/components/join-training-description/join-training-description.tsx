import { FC } from 'react';
import { Button, Card, Typography } from 'antd';

import styles from './join-training-description.module.less';

type JoinTrainingDescriptionProps = {
    onClickRandomSelection: () => void;
    choosingFriend: () => void;
};

export const JoinTrainingDescription: FC<JoinTrainingDescriptionProps> = ({
    onClickRandomSelection,
    choosingFriend,
}) => (
    <Card
        className={styles['card-default']}
        actions={[
            <Button type='link' onClick={onClickRandomSelection}>
                Случайный выбор
            </Button>,
            <Button type='link' onClick={choosingFriend}>
                Выбор друга по моим тренировкам{' '}
            </Button>,
        ]}
    >
        <Typography.Title level={3} className='card-title'>
            Хочешь тренироваться с тем, кто разделяет твои цели и темп?
            <br />
            Можешь найти друга для совместных тренировок среди других пользователей.
        </Typography.Title>
        <Typography.Paragraph className='card-subtitle'>
            Можешь воспользоваться случайным выбором или выбрать друга с похожим на твой уровень и
            вид тренировки, и мы найдем тебе идеального спортивного друга.
        </Typography.Paragraph>
    </Card>
);
