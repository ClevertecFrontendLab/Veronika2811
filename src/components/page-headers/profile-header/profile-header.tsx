import { ButtonSettings } from '@components/ui/button-settings';
import { Typography } from 'antd';

import styles from './profile-header.module.less';

const { Title } = Typography;

export const ProfileHeader = () => (
    <div className={styles['profile-header']}>
        <Title level={4} className='profile-header-title'>
            Профиль
        </Title>
        <ButtonSettings />
    </div>
);
