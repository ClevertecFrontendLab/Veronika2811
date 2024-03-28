import React, { useState } from 'react';
import { FeedbacksTestIds } from '@components/feedbacks-content/constants/feedbacks-test-id';
import { Button } from 'antd';

import { FeedbackWriteModal } from '../feedback-write-modal';

export const FeedbackWriteButton = () => {
    const [isModalFormVisible, setIsModalFormVisible] = useState(false);

    const toggleModalVisibility = () => {
        setIsModalFormVisible(!isModalFormVisible);
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
            />
        </React.Fragment>
    );
};
