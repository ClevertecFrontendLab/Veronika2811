import React, { FC, useState } from 'react';
import { FeedbacksTestIds } from '@components/feedbacks-content/constants/feedbacks-test-id';
import { ResultCustom } from '@components/result-custom';
import { ModalCustom } from '@components/ui/modal-custom';
import { FeedbacksStatus } from '@constants/feedbacks';
import { Button, Modal } from 'antd';

import { FeedbackForm } from '../feedback-form';
import { FeedbackResultFooterError } from '../feedback-result-footer-error';

import styles from './feedback-write-modal.module.less';

type FeedbackModalProps = {
    isModalVisible: boolean;
    toggleModalVisibility: () => void;
    page?: 'feedback' | 'settings';
};

export const FeedbackWriteModal: FC<FeedbackModalProps> = ({
    isModalVisible,
    toggleModalVisibility,
    page = 'feedback',
}) => {
    const [disabledButton, setDisabledButton] = useState(true);

    const [modalResult, setModalResult] = useState('');

    const closeModalResult = () => {
        setModalResult('');
    };

    const changeDisabledButton = (state: boolean) => {
        setDisabledButton(state);
    };

    const checkDisabledButton = page === 'feedback' ? disabledButton : false;

    return (
        <React.Fragment>
            <Modal
                title='Ваш отзыв'
                centered={true}
                width={539}
                open={isModalVisible}
                onCancel={toggleModalVisibility}
                className={styles['feedback-modal']}
                maskStyle={{ backdropFilter: 'blur(12px)', background: 'rgba(121, 156, 212, 0.1)' }}
                footer={[
                    <Button
                        key='submit-feedback'
                        htmlType='submit'
                        size='large'
                        type='primary'
                        form='review-form'
                        className={styles['feedback-form-button']}
                        data-test-id={FeedbacksTestIds.NEW_REVIEW_SUBMIT_BUTTON}
                        disabled={checkDisabledButton}
                    >
                        Опубликовать
                    </Button>,
                ]}
            >
                <FeedbackForm
                    toggleModalVisibility={toggleModalVisibility}
                    setIsModalResult={setModalResult}
                    changeDisabledButton={changeDisabledButton}
                />
            </Modal>

            <ModalCustom open={!!modalResult}>
                {modalResult === FeedbacksStatus.STATUS_ERROR ? (
                    <ResultCustom
                        statusCode={FeedbacksStatus.STATUS_ERROR}
                        footer={[
                            <FeedbackResultFooterError
                                key='result-footer-error'
                                closeModalResult={closeModalResult}
                                setIsModalFormVisible={toggleModalVisibility}
                            />,
                        ]}
                    />
                ) : (
                    <ResultCustom
                        statusCode={FeedbacksStatus.STATUS_SUCCESS}
                        onClick={closeModalResult}
                    />
                )}
            </ModalCustom>
        </React.Fragment>
    );
};
