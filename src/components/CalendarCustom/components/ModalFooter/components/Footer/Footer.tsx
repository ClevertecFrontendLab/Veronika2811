import type { Moment } from 'moment';
import { Button } from 'antd';

import { isPastDate } from '@components/CalendarCustom/utils/isPastDate';

import { catalogTrainingListSelector } from '@redux/selectors';
import { setEditMode } from '@redux/slice/trainingSlice';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { TrainingResponse } from '@/types/training/trainingApiDataTypes';

type FooterProps = {
    cellContent: TrainingResponse[];
    date: Moment;
};

export const Footer = ({ date, cellContent }: FooterProps) => {
    const catalogTrainingList = useAppSelector(catalogTrainingListSelector);
    const dispatch = useAppDispatch();

    const openEditMode = () => dispatch(setEditMode(true));

    const disabledButton = cellContent.length === catalogTrainingList.length || isPastDate(date);

    return (
        <Button type='primary' block size='large' onClick={openEditMode} disabled={disabledButton}>
            Создать тренировку
        </Button>
    );
};
