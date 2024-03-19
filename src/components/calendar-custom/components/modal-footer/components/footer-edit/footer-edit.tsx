import React, { useState } from 'react';
import { TrainingModalError } from '@components/calendar-custom/components/training-modal-error';
import { TYPE_ERROR_SAVE } from '@constants/training/training-types-error-modal';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import { useAddUserTrainingMutation, useEditUserTrainingMutation } from '@redux/api/training.api';
import { trainingSlice } from '@redux/selectors';
import { resetEditMode, setDrawerVisible, setModalVisible } from '@redux/slice/training-slice';
import { Button } from 'antd';
import type { Moment } from 'moment';

import { TrainingResponse } from '@/types/training/training-api-data-types';

type FooterEditProps = {
    date: Moment;
    refetchUserTrainingList: () => void;
};

export const FooterEdit = ({ date, refetchUserTrainingList }: FooterEditProps) => {
    const [addUserTraining, { isLoading: isLoadingAddTraining }] = useAddUserTrainingMutation();
    const [editUserTraining, { isLoading: isLoadingEditTraining }] = useEditUserTrainingMutation();

    const [saveTrainingError, setSaveTrainingError] = useState(false);

    const { typeTraining, currentTraining, editTraining } = useAppSelector(trainingSlice);
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
        <React.Fragment>
            <Button
                type='default'
                block={true}
                size='middle'
                disabled={!typeTraining || !!editTraining}
                onClick={openDrawer}
            >
                Добавить упражнения
            </Button>
            <Button
                type='link'
                block={true}
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
        </React.Fragment>
    );
};
