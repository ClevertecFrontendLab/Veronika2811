import { useState } from 'react';
import type { Moment } from 'moment';
import { Button } from 'antd';

import { TrainingModalError } from '@components/CalendarCustom/components/TrainingModalError';

import { useAddUserTrainingMutation, useEditUserTrainingMutation } from '@redux/api/training.api';
import {
    currentTrainingSelector,
    editTrainingSelector,
    typeTrainingSelector,
} from '@redux/selectors';
import { resetEditMode, setDrawerVisible, setModalVisible } from '@redux/slice/trainingSlice';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { TrainingResponse } from '@/types/training/trainingApiDataTypes';
import { TYPE_ERROR_SAVE } from '@constants/training/trainingTypesErrorModal';

type FooterEditProps = {
    date: Moment;
    refetchUserTrainingList: () => void;
};

export const FooterEdit = ({ date, refetchUserTrainingList }: FooterEditProps) => {
    const [addUserTraining, { isLoading: isLoadingAddTraining }] = useAddUserTrainingMutation();
    const [editUserTraining, { isLoading: isLoadingEditTraining }] = useEditUserTrainingMutation();

    const [saveTrainingError, setSaveTrainingError] = useState(false);

    const typeTraining = useAppSelector(typeTrainingSelector);
    const currentTraining = useAppSelector(currentTrainingSelector);
    const editTraining = useAppSelector(editTrainingSelector);
    const dispatch = useAppDispatch();

    const openDrawer = () => dispatch(setDrawerVisible(true));

    const resetStateAndRefetch = async (operation: () => Promise<TrainingResponse>) => {
        try {
            await operation();
            refetchUserTrainingList();
            dispatch(resetEditMode());
        } catch (err) {
            setSaveTrainingError(true);
        }
    };

    const addTraining = async () => {
        const body = {
            name: typeTraining,
            date,
            exercises: currentTraining,
        };

        if (editTraining) {
            await resetStateAndRefetch(() =>
                editUserTraining({
                    trainingId: editTraining.id,
                    body: {
                        ...body,
                        ...(editTraining?.type === 'past-training'
                            ? { isImplementation: true }
                            : {}),
                    },
                }).unwrap(),
            );
        } else {
            await resetStateAndRefetch(() => addUserTraining(body).unwrap());
        }
    };

    const closeModalSaveErrorTraining = () => {
        setSaveTrainingError(false);
    };

    const closeAllModals = () => {
        closeModalSaveErrorTraining();
        dispatch(setModalVisible(false));
    };

    return (
        <>
            <Button
                type='default'
                block
                size='middle'
                disabled={!typeTraining || !!editTraining}
                onClick={openDrawer}
            >
                Добавить упражнения
            </Button>
            <Button
                type='link'
                block
                size='middle'
                disabled={!currentTraining}
                loading={isLoadingAddTraining || isLoadingEditTraining}
                onClick={addTraining}
            >
                {editTraining ? 'Сохранить изменения' : 'Сохранить'}
            </Button>
            <TrainingModalError
                type={TYPE_ERROR_SAVE}
                open={saveTrainingError}
                onCancel={closeModalSaveErrorTraining}
                onClickButton={closeAllModals}
            />
        </>
    );
};
