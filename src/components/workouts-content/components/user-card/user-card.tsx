import React, { FC, useCallback } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { TypeCards } from '@components/workouts-content/constants/type-cards';
import { formatUserName } from '@components/workouts-content/utils/format-user-name';
import { TrainingInviteStatus } from '@constants/invite/training-invite-status';
import { useAppDispatch } from '@hooks/redux-hooks';
import { setDrawerVisible } from '@redux/slice/training-slice';
import { setSelectedUser } from '@redux/slice/workouts-slice';
import { Avatar, Card, Col, Row, Typography } from 'antd';
import Meta from 'antd/lib/card/Meta';
import classNames from 'classnames';

import { CardStatus } from './components/card-status';
import { PalButtons } from './components/pal-buttons';
import styles from './user-card.module.less';

import { CatalogTrainingPalsResponse } from '@/types/catalogs';
import { Nullebel } from '@/types/nullebel';

type UserCardProps = {
    pal: CatalogTrainingPalsResponse;
    index: number;
    type: typeof TypeCards.JOIN_CARDS | typeof TypeCards.PAL;
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

    const classNameCard = classNames(styles['user-card'], {
        [styles.blue]:
            type === TypeCards.JOIN_CARDS && pal.status !== TrainingInviteStatus.REJECTED,
        [styles.gray]: pal.status === TrainingInviteStatus.REJECTED,
        [styles.default]: type === TypeCards.PAL,
    });

    const borderedCard = !(
        type === TypeCards.JOIN_CARDS && pal.status !== TrainingInviteStatus.REJECTED
    );

    return (
        <Card
            key={pal.id}
            data-test-id={`joint-training-cards${index}`}
            className={classNameCard}
            bordered={borderedCard}
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
            {type === TypeCards.JOIN_CARDS && (
                <React.Fragment>
                    <PalButtons
                        status={pal.status}
                        onClickCancelTraining={onClickCancelTraining}
                        onClickUserSelection={onClickUserSelection}
                    />
                    <CardStatus status={pal.status} />
                </React.Fragment>
            )}
        </Card>
    );
};
