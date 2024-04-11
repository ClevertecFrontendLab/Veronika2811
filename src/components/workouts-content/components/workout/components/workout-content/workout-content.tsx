import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { isPastDate } from '@components/workouts-content/utils/is-past-date';
import { EditTrainingType } from '@constants/training/edit-training-types';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import { useBreakpoints } from '@hooks/use-breakpoints';
import { trainingSelector } from '@redux/selectors';
import {
    setDrawerVisible,
    setEditMode,
    setEditTraining,
    setEditTrainingData,
} from '@redux/slice/training-slice';
import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { ColAction } from './components/col-action';
import { ColPeriod } from './components/col-period';
import { ColTypeWorkout } from './components/col-type-workout';
import styles from './workout-content.module.less';

import { Nullebel } from '@/types/nullebel';
import { TrainingCurrentEditData, TrainingResponse } from '@/types/training';

type SorterParams = {
    parameters: {
        period: Nullebel<number>;
    };
};

export const WorkoutContent = () => {
    const { userTrainingList } = useAppSelector(trainingSelector);
    const dispatch = useAppDispatch();
    const { isSm } = useBreakpoints();

    const [showDetails, setShowDetails] = useState<Nullebel<string>>(null);

    const newData = userTrainingList.map((el) => {
        const { _id: id } = el;

        return {
            ...el,
            typeWorkout: el.name,
            period: el.parameters.period,
            key: id,
        };
    });

    const openWorkoutDrawer = () => dispatch(setDrawerVisible(true));

    const onClickEditTraining = (record: TrainingCurrentEditData) => {
        const { _id: id } = record;

        dispatch(setEditTrainingData(record));
        dispatch(setEditMode(true));
        openWorkoutDrawer();

        const editTrainingDay = isPastDate(record.date)
            ? EditTrainingType.PAST
            : EditTrainingType.FUTURE;

        dispatch(
            setEditTraining({
                type: editTrainingDay,
                id,
            }),
        );
    };

    const columns: ColumnsType<TrainingResponse> = [
        {
            title: 'Тип тренировки',
            dataIndex: 'typeWorkout',
            className: 'column-type-training',
            render: (text: string, record: TrainingCurrentEditData) => (
                <ColTypeWorkout
                    text={text}
                    record={record}
                    showDetails={showDetails}
                    setShowDetails={setShowDetails}
                    onClickEditTraining={onClickEditTraining}
                />
            ),
        },
        {
            title: 'Периодичность',
            dataIndex: 'period',
            className: 'column-period',
            render: (_: string, record: TrainingCurrentEditData, index: number) => (
                <ColPeriod
                    record={record}
                    index={index}
                    isSm={isSm}
                    onClickEditTraining={onClickEditTraining}
                />
            ),
            sorter: (a: SorterParams, b: SorterParams) =>
                (a.parameters?.period ?? 0) - (b.parameters?.period ?? 0),
        },
        isSm && {
            title: '',
            dataIndex: 'action',
            className: 'column-action',
            render: (_: string, record: TrainingCurrentEditData, index: number) => (
                <ColAction
                    record={record}
                    index={index}
                    onClickEditTraining={onClickEditTraining}
                />
            ),
        },
    ].filter(Boolean) as ColumnsType<TrainingResponse>;

    return (
        <div className={styles['training-table']}>
            <Table
                columns={columns}
                dataSource={newData}
                size='small'
                data-test-id='my-trainings-table'
                pagination={{ position: ['bottomLeft'] }}
                tableLayout='fixed'
            />
            <Button
                type='primary'
                size='large'
                data-test-id='create-new-training-button'
                onClick={openWorkoutDrawer}
                icon={<PlusOutlined />}
                className='btn-create-training'
            >
                Новая тренировка
            </Button>
        </div>
    );
};
