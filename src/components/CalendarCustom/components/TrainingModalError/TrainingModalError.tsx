import { Button, Space, Typography } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';

import { TRAINING_ERROR_MODAL_CONTENT } from '@components/CalendarCustom/constants/trainingErrorModalContent';
import { TrainingTestIds } from '@components/CalendarCustom/constants/trainingTestId';
import { ModalCustom } from '@components/ui/ModalCustom';

import { TYPE_ERROR_CATALOG, TYPE_ERROR_SAVE } from '@constants/training/trainingTypesErrorModal';

import styles from './TrainingModalError.module.less';

type TrainingModalErrorProps = {
    type: typeof TYPE_ERROR_CATALOG | typeof TYPE_ERROR_SAVE;
    open: boolean;
    onCancel: () => void;
    onClickButton: () => void;
};

export const TrainingModalError = ({
    type,
    open,
    onCancel,
    onClickButton,
}: TrainingModalErrorProps) => {
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
