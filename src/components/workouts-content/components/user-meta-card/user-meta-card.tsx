import { FC } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import Meta from 'antd/lib/card/Meta';

import styles from './user-meta-card.module.less';

type UserMetaCardProps = {
    avatorSrc: string;
    name: string;
};

export const UserMetaCard: FC<UserMetaCardProps> = ({ avatorSrc, name }) => {
    const [firstName, lastName] = name.split(' ');
    const fullName = lastName ? `${firstName}\n${lastName}` : firstName;

    return (
        <Meta
            className={styles['user-info']}
            avatar={<Avatar size={42} src={avatorSrc} icon={<UserOutlined />} />}
            title={fullName}
        />
    );
};
