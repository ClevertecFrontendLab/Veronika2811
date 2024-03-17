import { Button, Space } from 'antd';

import { FeedbacksTestIds } from '@components/FeedbacksContent/constants/feedbacksTestId';
import { FeedbacksRefetch } from '@components/FeedbacksContent/types/feedbacksTypes';

import { FeedbackWriteButton } from '../FeedbackWriteButton';

import styles from './FeedbackButtons.module.less';

type FeedbackButtonsProps = FeedbacksRefetch & {
    showAll: boolean;
    handleClickShowAll: () => void;
};

export const FeedbackButtons = ({ showAll, handleClickShowAll, refetch }: FeedbackButtonsProps) => (
    <Space className={styles['feedback-buttons']}>
        <FeedbackWriteButton refetch={refetch} />
        <Button type='link' onClick={handleClickShowAll} data-test-id={FeedbacksTestIds.ALL_REVIEWS_BUTTON}>
            {!showAll ? 'Развернуть все отзывы' : 'Свернуть все отзывы'}
        </Button>
    </Space>
);
