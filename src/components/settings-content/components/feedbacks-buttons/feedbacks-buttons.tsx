import { useState } from 'react';
import { push } from 'redux-first-history';
import { FeedbackWriteModal } from '@components/feedbacks-content/components/feedback-write-modal';
import { useAppDispatch } from '@hooks/redux-hooks';
import { Paths } from '@routes/constants/router-paths';
import { Button } from 'antd';

import styles from './feedbacks-buttons.module.less';

export const FeedbacksButtons = () => {
    const [reviewOpen, setReviewOpen] = useState(false);

    const dispatch = useAppDispatch();

    const toggleModalVisibility = () => {
        setReviewOpen(!reviewOpen);
    };

    const goToFeedbacksPage = () => dispatch(push(Paths.FEEDBACKS));

    return (
        <div className={styles['feedbacks-buttons']}>
            <Button type='primary' size='large' onClick={toggleModalVisibility}>
                Написать отзыв
            </Button>
            <Button type='link' size='large' onClick={goToFeedbacksPage}>
                Смотреть все отзывы
            </Button>
            {reviewOpen && (
                <FeedbackWriteModal
                    page='settings'
                    isModalVisible={reviewOpen}
                    toggleModalVisibility={toggleModalVisibility}
                />
            )}
        </div>
    );
};
