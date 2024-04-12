import { CSSProperties, FC } from 'react';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { TRAINING_ERROR_MODAL_CONTENT } from '@components/calendar-custom/constants/training-error-modal-content';
import { TRAINING_TEST_IDS } from '@components/calendar-custom/constants/training-test-ids';
import { ModalCustom } from '@components/ui/modal-custom';
import {
    TRAINING_ERROR_CATALOG,
    TRAINING_ERROR_SAVE,
} from '@constants/training/training-types-error-modal';
import { Button, Space, Typography } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

import styles from './modal-notification.module.less';

type ModalNotificationProps = {
    type:
        | typeof TRAINING_ERROR_CATALOG
        | typeof TRAINING_ERROR_SAVE
        | 'error-big-file'
        | 'error-save-userInfo';
    open: boolean;
    onClickButton: () => void;
    onCancel?: () => void;
    maskStyle?: CSSProperties;
};

export const ModalNotification: FC<ModalNotificationProps> = ({
    type,
    open,
    onClickButton,
    onCancel,
    maskStyle,
}) => {
    const { width, closable, className, title, subtitle, buttonText, buttonSize } =
        TRAINING_ERROR_MODAL_CONTENT[type];

    return (
        <ModalCustom
            open={open}
            width={width}
            closable={closable}
            onCancel={onCancel}
            closeIcon={<CloseOutlined data-test-id={TRAINING_TEST_IDS.modalErrorButtonClose} />}
            data-test-id={TRAINING_TEST_IDS.modalNoReview}
            className={styles[className]}
            maskStyle={maskStyle}
        >
            <Space size={16} align='start'>
                <CloseCircleOutlined />
                <div className={styles['content-text']}>
                    <Typography.Title
                        level={2}
                        data-test-id={TRAINING_TEST_IDS.modalErrorTitle}
                        className={styles['content-text-title']}
                    >
                        {title}
                    </Typography.Title>
                    <Typography.Paragraph
                        data-test-id={TRAINING_TEST_IDS.modalErrorSubtitle}
                        className={styles['content-text-subtitle']}
                    >
                        {subtitle}
                    </Typography.Paragraph>
                </div>
            </Space>
            <div className={styles['content-wrapper-button']}>
                <Button
                    data-test-id={
                        type === 'error-big-file'
                            ? 'big-file-error-close'
                            : TRAINING_TEST_IDS.modalErrorButton
                    }
                    type='primary'
                    onClick={onClickButton}
                    className={styles['content-button']}
                    size={buttonSize as SizeType}
                >
                    {buttonText}
                </Button>
            </div>
        </ModalCustom>
    );
};
