import React, { FC, useState } from 'react';
import { FeedbacksProps } from '@components/feedbacks-content/types/feedbacks-types';
import { Space } from 'antd';

import { FeedbackButtons } from '../feedback-buttons';
import { FeedbackCard } from '../feedback-card';

import styles from './feedbacks-list.module.less';

export const FeedbacksList: FC<FeedbacksProps> = ({ feedbacksList, refetch }) => {
    const [showAll, setShowAll] = useState(false);

    const handleClickShowAll = () => {
        setShowAll(!showAll);
    };

    return (
        <React.Fragment>
            <Space direction='vertical' size={22} className={styles['feedbacks-list']}>
                {feedbacksList.slice(0, showAll ? feedbacksList.length : 4).map((item) => (
                    <FeedbackCard key={item.id} feedback={item} />
                ))}
            </Space>
            <FeedbackButtons
                showAll={showAll}
                handleClickShowAll={handleClickShowAll}
                refetch={refetch}
            />
        </React.Fragment>
    );
};
