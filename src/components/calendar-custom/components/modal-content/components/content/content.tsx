import { FC } from 'react';
import { TrainingList } from '@components/calendar-custom/components/training-list';
import { filterTrainingsByDate } from '@components/calendar-custom/utils/filter-trainings-by-date';
import { isPastDate } from '@components/calendar-custom/utils/is-past-date';
import { EditTrainingType } from '@constants/training/edit-training-types';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import { trainingSelector } from '@redux/selectors';
import {
    setCurrentTraining,
    setEditMode,
    setEditTraining,
    setTypeTraining,
} from '@redux/slice/training-slice';
import type { Moment } from 'moment';

import { EmptyCustom } from '../empty-custom';

import { TrainingResponse } from '@/types/training';

export const Content: FC<{ date: Moment }> = ({ date }) => {
    const { userTrainingList } = useAppSelector(trainingSelector);
    const dispatch = useAppDispatch();

    const trainingList = filterTrainingsByDate(userTrainingList, date);

    const onClickEditTraining = (item: TrainingResponse) => {
        dispatch(setTypeTraining(item.name));
        dispatch(setCurrentTraining(item.exercises));
        dispatch(setEditMode(true));

        const editTrainingDay = isPastDate(date) ? EditTrainingType.PAST : EditTrainingType.FUTURE;

        const { _id: id } = item;

        dispatch(
            setEditTraining({
                type: editTrainingDay,
                id,
            }),
        );
    };

    if (trainingList.length > 0) {
        return <TrainingList data={trainingList} onClickEditTraining={onClickEditTraining} />;
    }

    return <EmptyCustom description='Нет активных тренировок' />;
};
