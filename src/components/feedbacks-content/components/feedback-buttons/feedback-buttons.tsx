import { FC } from 'react';
import { FeedbacksTestIds } from '@components/feedbacks-content/constants/feedbacks-test-id';
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
            data-test-id={FeedbacksTestIds.ALL_REVIEWS_BUTTON}
        >
            {showAll ? 'Свернуть все отзывы' : 'Развернуть все отзывы'}
        </Button>
    </Space>
);
