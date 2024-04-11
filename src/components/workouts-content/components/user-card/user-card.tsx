import React, { FC, useCallback } from 'react';
import { CheckCircleFilled, InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { formatUserName } from '@components/workouts-content/utils/format-user-name';
import { TrainingInviteStatus } from '@constants/invite/training-invite-status';
import { useAppDispatch } from '@hooks/redux-hooks';
import { setDrawerVisible } from '@redux/slice/training-slice';
import { setSelectedUser } from '@redux/slice/workouts-slice';
import { Avatar, Button, Card, Col, Row, Tooltip, Typography } from 'antd';
import Meta from 'antd/lib/card/Meta';
import classNames from 'classnames';

import styles from './user-card.module.less';

import { CatalogTrainingPalsResponse } from '@/types/catalogs';
import { Nullebel } from '@/types/nullebel';

type UserCardProps = {
    pal: CatalogTrainingPalsResponse;
    index: number;
    type: 'joint-cards' | 'pal';
    cancelTraining?: (inviteId: Nullebel<string>) => Promise<void>;
    searchValue?: string;
};

export const UserCard: FC<UserCardProps> = ({ pal, index, cancelTraining, type, searchValue }) => {
    const dispatch = useAppDispatch();

    const highlight = useCallback(
        (text: string) => {
            if (!searchValue) return text;

            const regex = new RegExp(searchValue, 'gi');
            const parts = text.split(regex);

            return (
                <React.Fragment>
                    {parts.map((part, i) => (
                        <React.Fragment key={part}>
                            {i > 0 && <span style={{ color: 'red' }}>{searchValue}</span>}
                            {part}
                        </React.Fragment>
                    ))}
                </React.Fragment>
            );
        },
        [searchValue],
    );

    const saveSelectedUser = () => dispatch(setSelectedUser(pal));

    const onClickUserSelection = () => {
        dispatch(setDrawerVisible(true));
        dispatch(setSelectedUser(pal));
    };

    const onClickCancelTraining = () => cancelTraining?.(pal.inviteId);

    return (
        <Card
            key={pal.id}
            data-test-id={`joint-training-cards${index}`}
            className={classNames(styles['user-card'], {
                [styles.blue]:
                    type === 'joint-cards' && pal.status !== TrainingInviteStatus.REJECTED,
                [styles.gray]: pal.status === TrainingInviteStatus.REJECTED,
                [styles.default]: type === 'pal',
            })}
            bordered={!(type === 'joint-cards' && pal.status !== TrainingInviteStatus.REJECTED)}
            onClick={saveSelectedUser}
        >
            <Meta
                avatar={<Avatar size={42} src={pal.imageSrc} icon={<UserOutlined />} />}
                title={<Typography.Text>{highlight(formatUserName(pal.name))}</Typography.Text>}
            />
            <Row className='user-description'>
                <Col span={15}>
                    <div className='user-card-item'>Тип тренировки:</div>
                    <div className='user-card-item'>Средняя нагрузка:</div>
                </Col>
                <Col span={9}>
                    <Typography.Paragraph type='secondary' className='training-info'>
                        {pal.trainingType}
                    </Typography.Paragraph>
                    <Typography.Paragraph className='training-info'>
                        {pal.avgWeightInWeek} кг/нед
                    </Typography.Paragraph>
                </Col>
            </Row>
            {type === 'joint-cards' && (
                <React.Fragment>
                    {pal.status === TrainingInviteStatus.ACCEPTED ? (
                        <Button type='default' block={true} onClick={onClickCancelTraining}>
                            Отменить тренировку
                        </Button>
                    ) : (
                        <Button
                            disabled={
                                pal.status === TrainingInviteStatus.PENDING ||
                                pal.status === TrainingInviteStatus.REJECTED
                            }
                            onClick={onClickUserSelection}
                            type='primary'
                            block={true}
                        >
                            Создать тренировку
                        </Button>
                    )}
                    {pal.status === TrainingInviteStatus.ACCEPTED && (
                        <div className='status'>
                            <Typography.Text>тренировка одобрена</Typography.Text>
                            <CheckCircleFilled />
                        </div>
                    )}
                    {pal.status === TrainingInviteStatus.PENDING && (
                        <div className='status'>
                            <Typography.Text>ожидает подтверждения</Typography.Text>
                        </div>
                    )}
                    {pal.status === TrainingInviteStatus.REJECTED && (
                        <div className='status'>
                            <Typography.Text>тренировка отклонена</Typography.Text>
                            <Tooltip
                                placement='topRight'
                                overlayStyle={{ width: '150px' }}
                                title='повторный запрос будет доступнен через 2 недели'
                            >
                                <InfoCircleOutlined />
                            </Tooltip>
                        </div>
                    )}
                </React.Fragment>
            )}
        </Card>
    );
};
