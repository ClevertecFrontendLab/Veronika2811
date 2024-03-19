import React, { useState } from 'react';
import { FeedbacksTestIds } from '@components/feedbacks-content/constants/feedbacks-test-id';
import { FeedbacksRefetch } from '@components/feedbacks-content/types/feedbacks-types';
import { ResultCustom } from '@components/result-custom';
import { ModalCustom } from '@components/ui/modal-custom';
import { FeedbacksStatus } from '@constants/feedbacks/feedbacks-constants';
import { Button } from 'antd';

import { FeedbackResultFooterError } from '../feedback-result-footer-error';
import { FeedbackWriteModal } from '../feedback-write-modal';

export const FeedbackWriteButton = ({ refetch }: FeedbacksRefetch) => {
    const [isModalFormVisible, setIsModalFormVisible] = useState(false);
    const [modalResult, setModalResult] = useState('');

    const toggleModalVisibility = () => {
        setIsModalFormVisible(!isModalFormVisible);
    };

    const closeModalResult = () => {
        setModalResult('');
    };

    return (
        <React.Fragment>
            <Button
                type='primary'
                size='large'
                onClick={toggleModalVisibility}
                data-test-id={FeedbacksTestIds.WRITE_REVIEW}
            >
                Написать отзыв
            </Button>
            <FeedbackWriteModal
                isModalVisible={isModalFormVisible}
                toggleModalVisibility={toggleModalVisibility}
                refetch={refetch}
                setIsModalResult={setModalResult}
            />
            <ModalCustom open={!!modalResult}>
                {modalResult === FeedbacksStatus.STATUS_ERROR ? (
                    <ResultCustom
                        statusCode={FeedbacksStatus.STATUS_ERROR}
                        footer={[
                            <FeedbackResultFooterError
                                key='result-footer-error'
                                closeModalResult={closeModalResult}
                                setIsModalFormVisible={setIsModalFormVisible}
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
