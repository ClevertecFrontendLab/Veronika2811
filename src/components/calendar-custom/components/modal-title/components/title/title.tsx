import { CloseOutlined } from '@ant-design/icons';
import { DATE_FORMAT } from '@components/calendar-custom/constants/date-format';
import { TrainingTestIds } from '@components/calendar-custom/constants/training-test-id';
import { TitleProps } from '@components/calendar-custom/types/modal-title';
import { Space, Typography } from 'antd';

import styles from './title.module.less';

export const Title = ({ date, closeModal }: TitleProps) => {
    const formattedDate = date.format(DATE_FORMAT);

    return (
        <Space className={styles['modal-title']}>
            <Typography.Text>Тренировки на {formattedDate}</Typography.Text>
            <CloseOutlined
                onClick={closeModal}
                data-test-id={TrainingTestIds.MODAL_CREATE_BUTTON_CLOSE}
            />
        </Space>
    );
};
