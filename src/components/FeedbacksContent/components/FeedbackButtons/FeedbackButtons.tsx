import { Button, Space } from 'antd';

import { FeedbacksRefetch } from '@components/FeedbacksContent/types/feedbacksTypes';

import { FeedbackWriteButton } from '../FeedbackWriteButton';

import styles from './FeedbackButtons.module.scss';

type FeedbackButtonsProps = FeedbacksRefetch & {
    showAll: boolean;
    handleClickShowAll: () => void;
};

export const FeedbackButtons = ({ showAll, handleClickShowAll, refetch }: FeedbackButtonsProps) => (
    <Space className={styles['feedback-buttons']}>
        <FeedbackWriteButton refetch={refetch} />
        <Button type='text' onClick={handleClickShowAll} data-test-id='all-reviews-button'>
            {!showAll ? 'Развернуть все отзывы' : 'Свернуть все отзывы'}
        </Button>
    </Space>
);
