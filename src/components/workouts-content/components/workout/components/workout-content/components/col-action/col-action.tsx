import { FC } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { TrainingCurrentEditData } from '@/types/training';

type ColActionProps = {
    record: TrainingCurrentEditData;
    index: number;
    onClickEditTraining: (record: TrainingCurrentEditData) => void;
};

export const ColAction: FC<ColActionProps> = ({ record, index, onClickEditTraining }) => (
    <Button
        type='link'
        disabled={record.isImplementation}
        icon={<EditOutlined style={{ fontSize: '24px' }} />}
        data-test-id={`update-my-training-table-icon${index}`}
        onClick={() => onClickEditTraining(record)}
    />
);
