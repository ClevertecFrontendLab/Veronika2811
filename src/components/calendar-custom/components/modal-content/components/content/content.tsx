import { TrainingList } from '@components/calendar-custom/components/training-list';
import { filterTrainingsByDate } from '@components/calendar-custom/utils/filter-trainings-by-date';
import { isPastDate } from '@components/calendar-custom/utils/is-past-date';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import { userTrainingListSelector } from '@redux/selectors';
import {
    setCurrentTraining,
    setEditMode,
    setEditTraining,
    setTypeTraining,
} from '@redux/slice/training-slice';
import type { Moment } from 'moment';

import { EmptyCustom } from '../empty-custom';

import { TrainingResponse } from '@/types/training/training-api-data-types';

export const Content = ({ date }: { date: Moment }) => {
    const userTrainingListData = useAppSelector(userTrainingListSelector);
    const dispatch = useAppDispatch();

    const trainingList = filterTrainingsByDate(userTrainingListData, date);

    const onClickEditTraining = (item: TrainingResponse) => {
        dispatch(setTypeTraining(item.name));
        dispatch(setCurrentTraining(item.exercises));
        dispatch(setEditMode(true));

        const editTrainingDay = isPastDate(date) ? 'past-training' : 'future-training';

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
