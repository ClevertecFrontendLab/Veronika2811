import { ProfileHeader } from '@components/page-headers/profile-header/profile-header';
import { ProfileForm } from '@components/profile-form';

import styles from './profile-page.module.less';

export const ProfilePage = () => (
    <div className={styles['profile-page']}>
        <ProfileHeader />
        <div className={styles['profile-content']}>
            <ProfileForm />
        </div>
    </div>
);
