import { useState } from 'react';
import { DownOutlined, UpOutlined, UserOutlined } from '@ant-design/icons';
import { DATE_FORMAT } from '@constants/date-format';
import { TrainingInviteStatus } from '@constants/invite/training-invite-status';
import { useAppSelector } from '@hooks/redux-hooks';
import { useGetCatalogsTrainingPalsQuery } from '@redux/api/catalogs.api';
import { useRespondToInviteMutation } from '@redux/api/invite.api';
import { inviteSelector } from '@redux/selectors';
import { Avatar, Button, Col, Row, Typography } from 'antd';
import moment from 'moment';

import { JoinTrainingDetails } from '../join-training-details';

import styles from './joint-training-invitations-list.module.less';

import { Nullebel } from '@/types/nullebel';

export const JointTrainingInvitationsList = ({
    setShowListPals,
}: {
    setShowListPals: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [respondToInvite, { isSuccess }] = useRespondToInviteMutation();
    const { refetch } = useGetCatalogsTrainingPalsQuery();

    const [invitationListCollapsed, setInvitationListCollapsed] = useState(true);

    const { inviteList } = useAppSelector(inviteSelector);
    const invitationList = invitationListCollapsed ? [inviteList[0]] : inviteList;

    const [trainingDetails, setTrainingDetails] = useState<Nullebel<string>>(null);

    const openTrainingDetails = (id: string) => setTrainingDetails(id);
    const closeTrainingDetails = () => setTrainingDetails(null);

    const getTrainingType = (type: string) => {
        if (type === 'Силовая') return 'силовых тренировок';

        return `тренировок на ${type.toLowerCase()}`;
    };

    const onClickInvitationListCollapsed = () =>
        setInvitationListCollapsed(!invitationListCollapsed);

    const onClickTrainTogether = async (id: string) => {
        await respondToInvite({ id, status: TrainingInviteStatus.ACCEPTED });
        await refetch();

        if (!isSuccess) {
            setShowListPals(true);
        }
    };

    const onClickTrainingRejectRequest = (id: string) =>
        respondToInvite({ id, status: TrainingInviteStatus.REJECTED });

    return (
        <div className={styles.invitation}>
            <Typography.Paragraph type='secondary'>
                Новое сообщение&nbsp;&nbsp;({inviteList.length})
            </Typography.Paragraph>
            <div className={styles['invitation-list']}>
                {invitationList.map((el) => {
                    if (!el) return null;

                    const { _id: id, from, createdAt, training } = el;

                    return (
                        <Row className={styles['invitation-item']} key={id}>
                            <Col
                                xs={{ span: 24 }}
                                xl={{ span: 4 }}
                                className='invitation-item-user'
                            >
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
                            <Col
                                xs={{ span: 24 }}
                                xl={{ span: 15 }}
                                className='invitation-item-info'
                            >
                                <Typography.Text type='secondary' className='invitation-item-date'>
                                    {moment(createdAt).format(DATE_FORMAT)}
                                </Typography.Text>
                                <Typography.Title level={5} className='invitation-item-title'>
                                    Привет, я ищу партнёра для совместных [
                                    {getTrainingType(training.name)}
                                    ]. Ты хочешь присоединиться ко мне на следующих тренировках?
                                </Typography.Title>
                                <div style={{ position: 'relative' }}>
                                    <Typography.Text
                                        className='invitation-item-details'
                                        onClick={() => openTrainingDetails(id)}
                                    >
                                        Посмотреть детали тренировки
                                    </Typography.Text>
                                    {trainingDetails === id && (
                                        <JoinTrainingDetails
                                            invite={el}
                                            closeDetails={closeTrainingDetails}
                                        />
                                    )}
                                </div>
                            </Col>
                            <Col
                                xs={{ span: 24 }}
                                xl={{ span: 5 }}
                                className='invitation-item-buttons'
                            >
                                <Button
                                    type='primary'
                                    size='large'
                                    block={true}
                                    onClick={() => onClickTrainTogether(id)}
                                >
                                    Тренироваться вместе
                                </Button>
                                <Button
                                    type='default'
                                    size='large'
                                    block={true}
                                    onClick={() => onClickTrainingRejectRequest(id)}
                                >
                                    Отклонить запрос
                                </Button>
                            </Col>
                        </Row>
                    );
                })}
            </div>
            {inviteList.length > 1 && (
                <Button
                    type='text'
                    className={styles['button-collapsed']}
                    icon={invitationListCollapsed ? <DownOutlined /> : <UpOutlined />}
                    onClick={onClickInvitationListCollapsed}
                >
                    {invitationListCollapsed ? 'Показать все сообщения' : 'Скрыть все сообщения'}
                </Button>
            )}
        </div>
    );
};
