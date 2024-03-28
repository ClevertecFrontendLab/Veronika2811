import { FC } from 'react';
import { FeedbacksTestIds } from '@components/feedbacks-content/constants/feedbacks-test-id';
import { Button, Space } from 'antd';

type FeedbackResultFooterErrorProps = {
    closeModalResult: () => void;
    setIsModalFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FeedbackResultFooterError: FC<FeedbackResultFooterErrorProps> = ({
    closeModalResult,
    setIsModalFormVisible,
}) => {
    const writeFeedback = () => {
        closeModalResult();
        setIsModalFormVisible(true);
    };

    return (
        <Space>
            <Button
                type='primary'
                key='button-result-write'
                size='large'
                onClick={writeFeedback}
                data-test-id={FeedbacksTestIds.WRITE_REVIEW_NOT_SAVED_MODAL}
            >
                Написать отзыв
            </Button>
            <Button
                type='default'
                key='button-result-close'
                size='large'
                onClick={closeModalResult}
            >
                Закрыть
            </Button>
        </Space>
    );
};