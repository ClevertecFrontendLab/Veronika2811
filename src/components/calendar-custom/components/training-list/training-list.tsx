import { EditOutlined } from '@ant-design/icons';
import { TrainingTestIds } from '@components/calendar-custom/constants/training-test-id';
import { Button, List } from 'antd';
import classNames from 'classnames';

import { BadgeCustom } from '../badge-custom';

import { TrainingResponse } from '@/types/training/training-api-data-types';

type TrainingListProps = {
    data: TrainingResponse[];
    className?: string;
    onClickEditTraining?: (item: TrainingResponse) => void;
};

export const TrainingList = ({ data, className, onClickEditTraining }: TrainingListProps) => (
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
                            data-test-id={`${TrainingTestIds.MODAL_UPDATE_EDIT_BUTTON}${index}`}
                            disabled={item.isImplementation}
                            onClick={() => onClickEditTraining(item)}
                        />
                    )}
                </List.Item>
            );
        }}
    />
);
