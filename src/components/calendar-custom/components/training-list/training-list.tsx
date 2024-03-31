import { FC } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { TRAINING_TEST_IDS } from '@components/calendar-custom/constants/training-test-ids';
import { Button, List } from 'antd';
import classNames from 'classnames';

import { BadgeCustom } from '../badge-custom';

import { TrainingResponse } from '@/types/training/training-api-data-types';

type TrainingListProps = {
    data: TrainingResponse[];
    className?: string;
    onClickEditTraining?: (item: TrainingResponse) => void;
};

export const TrainingList: FC<TrainingListProps> = ({ data, className, onClickEditTraining }) => (
    <List
        bordered={false}
        dataSource={data}
        className={className}
        split={false}
        renderItem={(item, index) => {
            const listItemDisabledStyles = classNames({
                'list-item-disabled': item.isImplementation,
            });

            return (
                <List.Item className={listItemDisabledStyles}>
                    <BadgeCustom name={item.name} />
                    {onClickEditTraining && (
                        <Button
                            type='link'
                            icon={<EditOutlined style={{ fontSize: '16px' }} />}
                            data-test-id={`${TRAINING_TEST_IDS.modalUpdateEditButton}${index}`}
                            disabled={item.isImplementation}
                            onClick={() => onClickEditTraining(item)}
                        />
                    )}
                </List.Item>
            );
        }}
    />
);
