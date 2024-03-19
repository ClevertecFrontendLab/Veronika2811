import { useState } from 'react';
import { FeedbacksTestIds } from '@components/feedbacks-content/constants/feedbacks-test-id';
import { FeedbacksRefetch } from '@components/feedbacks-content/types/feedbacks-types';
import { Button, Modal } from 'antd';

import { FeedbackForm } from '../feedback-form';

import styles from './feedback-write-modal.module.less';

type FeedbackModalProps = FeedbacksRefetch & {
    isModalVisible: boolean;
    toggleModalVisibility: () => void;
    setIsModalResult: React.Dispatch<React.SetStateAction<string>>;
};

export const FeedbackWriteModal = ({
    isModalVisible,
    toggleModalVisibility,
    refetch,
    setIsModalResult,
}: FeedbackModalProps) => {
    const [disabledButton, setDisabledButton] = useState(true);

    const changeDisabledButton = (state: boolean) => {
        setDisabledButton(state);
    };

    return (
        <Modal
            title='Ваш отзыв'
            centered={true}
            width={539}
            open={isModalVisible}
            onCancel={toggleModalVisibility}
            className={styles['feedback-modal']}
            maskStyle={{ backdropFilter: 'blur(12px)', background: ' rgba(121, 156, 212, 0.1)' }}
            footer={[
                <Button
                    key='submit-feedback'
                    htmlType='submit'
                    size='large'
                    type='primary'
                    form='review-form'
                    className={styles['feedback-form-button']}
                    data-test-id={FeedbacksTestIds.NEW_REVIEW_SUBMIT_BUTTON}
                    disabled={disabledButton}
                >
                    Опубликовать
                </Button>,
            ]}
        >
            <FeedbackForm
                refetch={refetch}
                toggleModalVisibility={toggleModalVisibility}
                setIsModalResult={setIsModalResult}
                changeDisabledButton={changeDisabledButton}
            />
        </Modal>
    );
};
