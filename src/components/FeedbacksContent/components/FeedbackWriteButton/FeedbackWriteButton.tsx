import { useState } from 'react';
import { Button } from 'antd';

import { FeedbacksTestIds } from '@components/FeedbacksContent/constants/feedbacksTestId';
import { FeedbacksRefetch } from '@components/FeedbacksContent/types/feedbacksTypes';
import { ResultCustom } from '@components/ResultCustom';
import { ModalCustom } from '@components/ui/ModalCustom';

import { FeedbackResultFooterError } from '../FeedbackResultFooterError';
import { FeedbackWriteModal } from '../FeedbackWriteModal';

import { FeedbacksStatus } from '@constants/feedbacks/feedbacksConstants';

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
        <>
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
        </>
    );
};
