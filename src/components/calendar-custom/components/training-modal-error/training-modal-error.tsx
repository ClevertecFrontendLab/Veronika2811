import { CSSProperties, FC } from 'react';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { TRAINING_ERROR_MODAL_CONTENT } from '@components/calendar-custom/constants/training-error-modal-content';
import { TrainingTestIds } from '@components/calendar-custom/constants/training-test-id';
import { ModalCustom } from '@components/ui/modal-custom';
import {
    TYPE_ERROR_CATALOG,
    TYPE_ERROR_SAVE,
} from '@constants/training/training-types-error-modal';
import { Button, Space, Typography } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

import styles from './training-modal-error.module.less';

type TrainingModalErrorProps = {
    type: typeof TYPE_ERROR_CATALOG | typeof TYPE_ERROR_SAVE;
    open: boolean;
    onCancel: () => void;
    onClickButton: () => void;
    maskStyle?: CSSProperties;
};

export const TrainingModalError: FC<TrainingModalErrorProps> = ({
    type,
    open,
    onCancel,
    onClickButton,
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
            closeIcon={<CloseOutlined data-test-id={TrainingTestIds.MODAL_ERROR_BUTTON_CLOSE} />}
            data-test-id={TrainingTestIds.MODAL_ERROR}
            className={styles[className]}
            maskStyle={maskStyle}
        >
            <Space size={16} align='start'>
                <CloseCircleOutlined />
                <div className={styles['content-text']}>
                    <Typography.Title
                        level={2}
                        data-test-id={TrainingTestIds.MODAL_ERROR_TITLE}
                        className={styles['content-text-title']}
                    >
                        {title}
                    </Typography.Title>
                    <Typography.Paragraph
                        data-test-id={TrainingTestIds.MODAL_ERROR_SUBTITLE}
                        className={styles['content-text-subtitle']}
                    >
                        {subtitle}
                    </Typography.Paragraph>
                </div>
            </Space>
            <div className={styles['content-wrapper-button']}>
                <Button
                    data-test-id={TrainingTestIds.MODAL_ERROR_BUTTON}
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
