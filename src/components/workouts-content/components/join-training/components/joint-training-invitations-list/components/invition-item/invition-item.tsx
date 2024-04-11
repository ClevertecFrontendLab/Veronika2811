import { FC, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { DATE_FORMAT } from '@constants/date-format';
import { Avatar, Col, Row, Typography } from 'antd';
import moment from 'moment';

import { JoinTrainingDetails } from '../../../join-training-details';
import { InvitionButtons } from '../invition-buttons';

import styles from './invition-item.module.less';

import { InviteResponse } from '@/types/invite';
import { Nullebel } from '@/types/nullebel';

type InvitionItemProps = {
    invite: InviteResponse;
    setShowListPals: React.Dispatch<React.SetStateAction<boolean>>;
};

export const InvitionItem: FC<InvitionItemProps> = ({ invite, setShowListPals }) => {
    const [trainingDetails, setTrainingDetails] = useState<Nullebel<string>>(null);

    if (!invite) return null;

    const openTrainingDetails = (id: string) => setTrainingDetails(id);
    const closeTrainingDetails = () => setTrainingDetails(null);

    const getTrainingType = (type: string) => {
        if (type === 'Силовая') return 'силовых тренировок';

        return `тренировок на ${type.toLowerCase()}`;
    };

    const { _id: id, from, createdAt, training } = invite;

    return (
        <Row className={styles['invitation-item']} key={id}>
            <Col xs={{ span: 24 }} xl={{ span: 4 }} className='invitation-item-user'>
                <Avatar
                    size={42}
                    alt={from.firstName}
                    src={from.imageSrc}
                    icon={<UserOutlined />}
                />
                <div className='user-name'>
                    <Typography.Paragraph>{from.firstName}</Typography.Paragraph>
                    <Typography.Paragraph>{from.lastName}</Typography.Paragraph>
                </div>
            </Col>
            <Col xs={{ span: 24 }} xl={{ span: 15 }} className='invitation-item-info'>
                <Typography.Text type='secondary' className='invitation-item-date'>
                    {moment(createdAt).format(DATE_FORMAT)}
                </Typography.Text>
                <Typography.Title level={5} className='invitation-item-title'>
                    Привет, я ищу партнёра для совместных [{getTrainingType(training.name)}
                    ]. Ты хочешь присоединиться ко мне на следующих тренировках?
                </Typography.Title>
                <div className='invitation-item-details-wrapper'>
                    <Typography.Text
                        className='invitation-item-details'
                        onClick={() => openTrainingDetails(id)}
                    >
                        Посмотреть детали тренировки
                    </Typography.Text>
                    {trainingDetails === id && (
                        <JoinTrainingDetails invite={invite} closeDetails={closeTrainingDetails} />
                    )}
                </div>
            </Col>
            <InvitionButtons idTrain={id} setShowListPals={setShowListPals} />
        </Row>
    );
};
