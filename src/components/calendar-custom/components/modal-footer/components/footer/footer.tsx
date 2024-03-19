import { FC } from 'react';
import { isPastDate } from '@components/calendar-custom/utils/is-past-date';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import { catalogTrainingListSelector } from '@redux/selectors';
import { setEditMode } from '@redux/slice/training-slice';
import { Button } from 'antd';
import type { Moment } from 'moment';

import { TrainingResponse } from '@/types/training/training-api-data-types';

type FooterProps = {
    cellContent: TrainingResponse[];
    date: Moment;
};

export const Footer: FC<FooterProps> = ({ date, cellContent }) => {
    const catalogTrainingList = useAppSelector(catalogTrainingListSelector);
    const dispatch = useAppDispatch();

    const openEditMode = () => dispatch(setEditMode(true));

    const disabledButton = cellContent.length === catalogTrainingList.length || isPastDate(date);

    return (
        <Button
            type='primary'
            block={true}
            size='large'
            onClick={openEditMode}
            disabled={disabledButton}
        >
            Создать тренировку
        </Button>
    );
};
