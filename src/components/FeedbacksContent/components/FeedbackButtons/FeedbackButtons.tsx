import { Button, Space } from 'antd';

import styles from './FeedbackButtons.module.scss';
import { FeedbackWriteButton } from '../FeedbackWriteButton';
import { FeedbacksRefetch } from '@components/FeedbacksContent/types/feedbacksTypes';

type FeedbackButtonsProps = FeedbacksRefetch & {
    showAll: boolean;
    handleClickShowAll: () => void;
}

export const FeedbackButtons = ({ showAll, handleClickShowAll, refetch }: FeedbackButtonsProps) => {
    return (
        <Space className={styles['feedback-buttons']}>
            <FeedbackWriteButton refetch={refetch} />
            <Button type='text' onClick={handleClickShowAll} data-test-id='all-reviews-button'>
                {!showAll ? 'Развернуть все отзывы' : 'Свернуть все отзывы'}
            </Button>
        </Space>
    );
};
