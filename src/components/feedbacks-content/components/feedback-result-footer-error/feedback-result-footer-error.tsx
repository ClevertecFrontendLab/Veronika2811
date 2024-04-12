import { FC } from 'react';
import { FEEDBACKS_TEST_IDS } from '@components/feedbacks-content/constants/feedbacks-test-ids';
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
                data-test-id={FEEDBACKS_TEST_IDS.writeReviewNotSavedModal}
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
