import { useEffect, useState } from 'react';
import { Select } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import { TrainingTestIds } from '@components/CalendarCustom/constants/trainingTestId';
import { filterOutTrainingTypesForDay } from '@components/CalendarCustom/utils/filterOutTrainingTypesForDay';

import {
    catalogTrainingListSelector,
    editTrainingSelector,
    typeTrainingSelector,
} from '@redux/selectors';
import {
    resetEditMode,
    setCurrentTraining,
    setEditTraining,
    setTypeTraining,
} from '@redux/slice/trainingSlice';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { TrainingResponse } from '@/types/training/trainingApiDataTypes';

import styles from './TitleEdit.module.less';

type SelectOption = {
    label: string;
    value: string;
};

export const TitleEdit = ({ cellContent }: { cellContent: TrainingResponse[] }) => {
    const trainingListData = useAppSelector(catalogTrainingListSelector);
    const typeTraining = useAppSelector(typeTrainingSelector);
    const editTraining = useAppSelector(editTrainingSelector);
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
        <>
            <ArrowLeftOutlined
                onClick={closeEditMode}
                data-test-id={TrainingTestIds.MODAL_EXERCISE_BUTTON_CLOSE}
            />
            <Select
                autoFocus
                options={filteredTrainingList}
                defaultValue={typeTraining ?? 'Выбор типа тренировки'}
                onChange={handleChange}
                className={styles.select}
                data-test-id={TrainingTestIds.MODAL_CREATE_EXERCISE_SELECT}
            />
        </>
    );
};
