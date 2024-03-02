import { Button, Space } from 'antd';

type FeedbackResultFooterErrorProps = {
    closeModalResult: () => void;
    setIsModalFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FeedbackResultFooterError = ({
    closeModalResult,
    setIsModalFormVisible,
}: FeedbackResultFooterErrorProps) => {
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
                data-test-id='write-review-not-saved-modal'
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
