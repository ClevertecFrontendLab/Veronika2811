import React, { FC, useEffect, useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { TRAINING_TEST_IDS } from '@components/calendar-custom/constants/training-test-ids';
import { filterOutTrainingTypesForDay } from '@components/calendar-custom/utils/filter-out-training-types-for-day';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import { catalogSelector, trainingSelector } from '@redux/selectors';
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

export const TitleEdit: FC<{ cellContent: TrainingResponse[] }> = ({ cellContent }) => {
    const { catalogTrainingList } = useAppSelector(catalogSelector);
    const { typeTraining, editTraining } = useAppSelector(trainingSelector);
    const dispatch = useAppDispatch();

    const [filteredTrainingList, setFilteredTrainingList] = useState<SelectOption[]>([]);

    const isPastTraining = editTraining?.type === 'past-training';

    useEffect(() => {
        const filteredTraining = filterOutTrainingTypesForDay(
            cellContent,
            catalogTrainingList,
            isPastTraining,
        );

        setFilteredTrainingList(filteredTraining);
    }, [cellContent, isPastTraining, catalogTrainingList]);

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
                data-test-id={TRAINING_TEST_IDS.modalExerciseButtonClose}
            />
            <Select
                autoFocus={true}
                options={filteredTrainingList}
                defaultValue={typeTraining ?? 'Выбор типа тренировки'}
                onChange={handleChange}
                className={styles.select}
                data-test-id={TRAINING_TEST_IDS.modalCreateExerciseSelect}
            />
        </React.Fragment>
    );
};
