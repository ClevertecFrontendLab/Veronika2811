import { FC } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { BadgeCustom } from '@components/calendar-custom/components/badge-custom';
import { formatUserName } from '@components/workouts-content/utils/format-user-name';
import { Avatar, Typography } from 'antd';
import Meta from 'antd/lib/card/Meta';

import styles from './selected-user-info.module.less';

type SelectedUserInfoProps = {
    imageSrc: string;
    name: string;
    trainingType: string;
};

export const SelectedUserInfo: FC<SelectedUserInfoProps> = ({ imageSrc, name, trainingType }) => (
    <div className={styles['selected-user-info']}>
        <Meta
            avatar={<Avatar size={42} src={imageSrc} icon={<UserOutlined />} />}
            title={
                <Typography.Text className='selected-user-name'>
                    {formatUserName(name)}
                </Typography.Text>
            }
        />
        <BadgeCustom name={trainingType} />
    </div>
);
