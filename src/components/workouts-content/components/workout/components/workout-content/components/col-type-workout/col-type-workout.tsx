import { FC } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { BadgeCustom } from '@components/calendar-custom/components/badge-custom';
import { Button } from 'antd';

import { TrainingDetails } from '../training-details';

import styles from './col-type-workout.module.less';

import { Nullebel } from '@/types/nullebel';
import { TrainingCurrentEditData } from '@/types/training';

type ColTypeWorkoutProps = {
    text: string;
    record: TrainingCurrentEditData;
    showDetails: Nullebel<string>;
    setShowDetails: React.Dispatch<React.SetStateAction<Nullebel<string>>>;
    onClickEditTraining: (record: TrainingCurrentEditData) => void;
};

export const ColTypeWorkout: FC<ColTypeWorkoutProps> = ({
    text,
    record,
    showDetails,
    setShowDetails,
    onClickEditTraining,
}) => {
    const { _id: id } = record;

    return (
        <div className={styles['col-type-workout']}>
            <BadgeCustom name={text} />
            {showDetails === id && (
                <TrainingDetails
                    record={record}
                    setShowDetails={setShowDetails}
                    onClickEditTraining={onClickEditTraining}
                />
            )}
            <Button
                className='col-type-workout-button'
                type='link'
                icon={<DownOutlined />}
                size='small'
                onClick={() => setShowDetails(id)}
            />
        </div>
    );
};
