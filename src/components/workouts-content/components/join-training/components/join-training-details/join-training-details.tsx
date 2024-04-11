import { FC, useRef } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { BadgeCustom } from '@components/calendar-custom/components/badge-custom';
import { PERIOD_OPTION } from '@components/workouts-content/constants/period-option';
import { DATE_FORMAT } from '@constants/date-format';
import { useClickAway } from '@hooks/use-click-away';
import { Button, Card, List, Typography } from 'antd';
import moment from 'moment';

import styles from './join-training-details.module.less';

import { InviteResponse } from '@/types/invite';

type JoinTrainingDetailsProps = {
    invite: InviteResponse;
    closeDetails: () => void;
};

export const JoinTrainingDetails: FC<JoinTrainingDetailsProps> = ({ invite, closeDetails }) => {
    const { training } = invite;

    const ref = useRef<HTMLDivElement>(null);

    useClickAway(ref, closeDetails);

    const getPeriodOption = (item?: number) => {
        if (!item) return null;

        const findOption = PERIOD_OPTION.find((option) => option.value === item);

        return findOption ? findOption.label : null;
    };

    const formattedDate = moment(training.date).format(DATE_FORMAT);

    return (
        <Card
            data-test-id='joint-training-review-card'
            ref={ref}
            className={styles['training-details']}
            bordered={false}
            title={<BadgeCustom name={training.name} />}
            extra={
                <Button type='text' size='small' icon={<CloseOutlined />} onClick={closeDetails} />
            }
        >
            <div>
                <div className={styles['training-details-title']}>
                    <Typography.Title level={5}>
                        {getPeriodOption(training.parameters?.period)}
                    </Typography.Title>
                    <Typography.Text>{formattedDate}</Typography.Text>
                </div>
                <List
                    split={false}
                    className={styles.list}
                    dataSource={training.exercises}
                    renderItem={(item) => (
                        <List.Item>
                            <Typography.Text type='secondary'>{item.name}</Typography.Text>
                            <Typography.Text className='list-item'>
                                {`${item.approaches} x (${item.replays})`}
                            </Typography.Text>
                        </List.Item>
                    )}
                />
            </div>
        </Card>
    );
};
