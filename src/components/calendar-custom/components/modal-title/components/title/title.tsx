import { FC } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { TRAINING_TEST_IDS } from '@components/calendar-custom/constants/training-test-ids';
import { TitleProps } from '@components/calendar-custom/types/modal-title';
import { DATE_FORMAT } from '@constants/date-format';
import { Space, Typography } from 'antd';

import styles from './title.module.less';

export const Title: FC<TitleProps> = ({ date, closeModal }) => {
    const formattedDate = date.format(DATE_FORMAT);

    return (
        <Space className={styles['modal-title']}>
            <Typography.Text>Тренировки на {formattedDate}</Typography.Text>
            <CloseOutlined
                onClick={closeModal}
                data-test-id={TRAINING_TEST_IDS.modalCreateButtonClose}
            />
        </Space>
    );
};
