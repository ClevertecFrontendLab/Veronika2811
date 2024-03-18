import type { Moment } from 'moment';

import { TrainingList } from '@components/CalendarCustom/components/TrainingList';
import { filterTrainingsByDate } from '@components/CalendarCustom/utils/filterTrainingsByDate';
import { isPastDate } from '@components/CalendarCustom/utils/isPastDate';

import { EmptyCustom } from '../EmptyCustom';

import { userTrainingListSelector } from '@redux/selectors';
import {
    setCurrentTraining,
    setEditMode,
    setEditTraining,
    setTypeTraining,
} from '@redux/slice/trainingSlice';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { TrainingResponse } from '@/types/training/trainingApiDataTypes';

export const Content = ({ date }: { date: Moment }) => {
    const userTrainingListData = useAppSelector(userTrainingListSelector);
    const dispatch = useAppDispatch();

    const trainingList = filterTrainingsByDate(userTrainingListData, date);

    const onClickEditTraining = (item: TrainingResponse) => {
        dispatch(setTypeTraining(item.name));
        dispatch(setCurrentTraining(item.exercises));
        dispatch(setEditMode(true));

        const editTrainingDay = isPastDate(date) ? 'past-training' : 'future-training';

        dispatch(
            setEditTraining({
                type: editTrainingDay,
                id: item._id,
            }),
        );
    };

    if (trainingList.length > 0) {
        return <TrainingList data={trainingList} onClickEditTraining={onClickEditTraining} />;
    }

    return <EmptyCustom description='Нет активных тренировок' />;
};
