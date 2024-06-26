import React, { FC, useState } from 'react';
import { ModalNotification } from '@components/ui/modal-notification';
import { TRAINING_ERROR_SAVE } from '@constants/training/training-types-error-modal';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import { useAddUserTrainingMutation, useEditUserTrainingMutation } from '@redux/api/training.api';
import { trainingSelector } from '@redux/selectors';
import { resetEditMode, setDrawerVisible, setModalVisible } from '@redux/slice/training-slice';
import { checkIsPastTraining } from '@utils/check-is-past-training';
import { Button } from 'antd';
import type { Moment } from 'moment';

import { TrainingResponse } from '@/types/training';

type FooterEditProps = {
    date: Moment;
    refetchUserTrainingList: () => void;
};

export const FooterEdit: FC<FooterEditProps> = ({ date, refetchUserTrainingList }) => {
    const [addUserTraining, { isLoading: isLoadingAddTraining }] = useAddUserTrainingMutation();
    const [editUserTraining, { isLoading: isLoadingEditTraining }] = useEditUserTrainingMutation();

    const [saveTrainingError, setSaveTrainingError] = useState(false);

    const { typeTraining, currentTraining, editTraining } = useAppSelector(trainingSelector);
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
            date: date.utc(true).toISOString(),
            exercises: currentTraining,
        };

        if (editTraining) {
            const isPastTraining = checkIsPastTraining(editTraining?.type);

            await resetStateAndRefetch(() =>
                editUserTraining({
                    trainingId: editTraining.id,
                    body: {
                        ...body,
                        ...(isPastTraining ? { isImplementation: true } : {}),
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
            <ModalNotification
                type={TRAINING_ERROR_SAVE}
                open={saveTrainingError}
                onCancel={closeModalSaveErrorTraining}
                onClickButton={closeAllModals}
            />
        </React.Fragment>
    );
};
