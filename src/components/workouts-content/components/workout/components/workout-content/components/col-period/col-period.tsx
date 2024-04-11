import React, { FC } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { PERIOD_OPTION } from '@components/workouts-content/constants/period-option';
import { Button, Typography } from 'antd';

import { TrainingCurrentEditData } from '@/types/training';

type ColPeriodProps = {
    record: TrainingCurrentEditData;
    index: number;
    onClickEditTraining: (record: TrainingCurrentEditData) => void;
    isSm?: boolean;
};

export const ColPeriod: FC<ColPeriodProps> = ({ record, index, isSm, onClickEditTraining }) => (
    <React.Fragment>
        <Typography.Text>
            {record.parameters.period
                ? PERIOD_OPTION.find((el) => el.value === record.parameters.period)?.label
                : ''}
        </Typography.Text>
        {!isSm && (
            <Button
                type='link'
                disabled={record.isImplementation}
                icon={<EditOutlined style={{ fontSize: '24px' }} />}
                data-test-id={`update-my-training-table-icon${index}`}
                onClick={() => onClickEditTraining(record)}
            />
        )}
    </React.Fragment>
);
