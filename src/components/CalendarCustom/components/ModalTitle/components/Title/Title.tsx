import { Space, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { DATE_FORMAT } from '@components/CalendarCustom/constants/dateFormat';
import { TrainingTestIds } from '@components/CalendarCustom/constants/trainingTestId';
import { TitleProps } from '@components/CalendarCustom/types/modalTitle';

import styles from './Title.module.less';

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
