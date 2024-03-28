import { DATE_FORMAT_DM } from '@constants/date-format';
import { useAppSelector } from '@hooks/redux-hooks';
import { profileSelector } from '@redux/selectors';
import { Typography } from 'antd';
import moment from 'moment';

import styles from './label-pro.module.less';

export const LabelPro = () => {
    const { currentUserInfo } = useAppSelector(profileSelector);

    return (
        <div className={styles['label-pro']}>
            <Typography.Title level={5}>
                Ваш PRO tarif активен до{' '}
                {moment(currentUserInfo.tariff.expired).format(DATE_FORMAT_DM)}
            </Typography.Title>
        </div>
    );
};
