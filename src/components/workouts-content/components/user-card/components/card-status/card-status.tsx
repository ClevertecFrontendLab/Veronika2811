import { FC } from 'react';
import { CheckCircleFilled, InfoCircleOutlined } from '@ant-design/icons';
import { TrainingInviteStatus } from '@constants/invite/training-invite-status';
import { Tooltip, Typography } from 'antd';

import styles from './card-status.module.less';

import { Nullebel } from '@/types/nullebel';

export const CardStatus: FC<{ status: Nullebel<string> }> = ({ status }) => {
    if (status === TrainingInviteStatus.ACCEPTED) {
        return (
            <div className={styles.status}>
                <Typography.Text>тренировка одобрена</Typography.Text>
                <CheckCircleFilled />
            </div>
        );
    }

    if (status === TrainingInviteStatus.PENDING) {
        return (
            <div className={styles.status}>
                <Typography.Text>ожидает подтверждения</Typography.Text>
            </div>
        );
    }

    if (status === TrainingInviteStatus.REJECTED) {
        return (
            <div className={styles.status}>
                <Typography.Text>тренировка отклонена</Typography.Text>
                <Tooltip
                    placement='topRight'
                    overlayStyle={{ width: '150px' }}
                    title='повторный запрос будет доступнен через 2 недели'
                >
                    <InfoCircleOutlined />
                </Tooltip>
            </div>
        );
    }

    return null;
};
