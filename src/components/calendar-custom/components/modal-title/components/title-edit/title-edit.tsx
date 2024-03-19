import React, { useEffect, useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { TrainingTestIds } from '@components/calendar-custom/constants/training-test-id';
import { filterOutTrainingTypesForDay } from '@components/calendar-custom/utils/filter-out-training-types-for-day';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import { catalogTrainingListSelector, trainingSlice } from '@redux/selectors';
import {
    resetEditMode,
    setCurrentTraining,
    setEditTraining,
    setTypeTraining,
} from '@redux/slice/training-slice';
import { Select } from 'antd';

import styles from './title-edit.module.less';

import { TrainingResponse } from '@/types/training/training-api-data-types';

type SelectOption = {
    label: string;
    value: string;
};

export const TitleEdit = ({ cellContent }: { cellContent: TrainingResponse[] }) => {
    const trainingListData = useAppSelector(catalogTrainingListSelector);
    const { typeTraining, editTraining } = useAppSelector(trainingSlice);
    const dispatch = useAppDispatch();

    const [filteredTrainingList, setFilteredTrainingList] = useState<SelectOption[]>([]);

    const isPastTraining = editTraining?.type === 'past-training';

    useEffect(() => {
        const filteredTraining = filterOutTrainingTypesForDay(
            cellContent,
            trainingListData,
            isPastTraining,
        );

        setFilteredTrainingList(filteredTraining);
    }, [cellContent, isPastTraining, trainingListData]);

    const handleChange = (_: string, option: SelectOption | SelectOption[]) => {
        const currentOption = Array.isArray(option) ? option[0].label : option.label;

        dispatch(setTypeTraining(currentOption));
        dispatch(setCurrentTraining(null));
        dispatch(setEditTraining(null));
    };

    const closeEditMode = () => dispatch(resetEditMode());

    return (
        <React.Fragment>
            <ArrowLeftOutlined
                onClick={closeEditMode}
                data-test-id={TrainingTestIds.MODAL_EXERCISE_BUTTON_CLOSE}
            />
            <Select
                autoFocus={true}
                options={filteredTrainingList}
                defaultValue={typeTraining ?? 'Выбор типа тренировки'}
                onChange={handleChange}
                className={styles.select}
                data-test-id={TrainingTestIds.MODAL_CREATE_EXERCISE_SELECT}
            />
        </React.Fragment>
    );
};
