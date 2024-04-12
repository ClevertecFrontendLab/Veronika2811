import { FC } from 'react';
import { FEEDBACKS_TEST_IDS } from '@components/feedbacks-content/constants/feedbacks-test-ids';
import { Button, Space } from 'antd';

import { FeedbackWriteButton } from '../feedback-write-button';

import styles from './feedback-buttons.module.less';

type FeedbackButtonsProps = {
    showAll: boolean;
    handleClickShowAll: () => void;
};

export const FeedbackButtons: FC<FeedbackButtonsProps> = ({ showAll, handleClickShowAll }) => (
    <Space className={styles['feedback-buttons']}>
        <FeedbackWriteButton />
        <Button
            type='link'
            onClick={handleClickShowAll}
            data-test-id={FEEDBACKS_TEST_IDS.allReviewsButton}
        >
            {showAll ? 'Свернуть все отзывы' : 'Развернуть все отзывы'}
        </Button>
    </Space>
);
