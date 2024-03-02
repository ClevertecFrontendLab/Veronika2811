import { useState } from 'react';
import { Space } from 'antd';

import { FeedbackCard } from '../FeedbackCard';
import { FeedbackButtons } from '../FeedbackButtons';
import { FeedbacksProps } from '@components/FeedbacksContent/types/feedbacksTypes';

import styles from './FeedbacksList.module.scss';

export const FeedbacksList = ({ feedbacksList, refetch }: FeedbacksProps) => {
    const [showAll, setShowAll] = useState(false);

    const handleClickShowAll = () => {
        setShowAll(!showAll);
    };

    return (
        <>
            <Space direction='vertical' size={22} className={styles['feedbacks-list']}>
                {feedbacksList.slice(0, showAll ? feedbacksList.length : 4).map((item) => (
                    <FeedbackCard key={item.id} feedback={item} />
                ))}
            </Space>
            <FeedbackButtons showAll={showAll} handleClickShowAll={handleClickShowAll} refetch={refetch} />
        </>
    );
};
