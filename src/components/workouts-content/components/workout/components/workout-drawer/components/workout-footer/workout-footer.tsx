import React, { FC } from 'react';
import { DrawerFooter } from '@components/calendar-custom/components/drawer-calendar/components';
import { useAppSelector } from '@hooks/redux-hooks';
import { trainingSelector, workoutsSelector } from '@redux/selectors';
import { checkIsPastTraining } from '@utils/check-is-past-training';
import { Button } from 'antd';

export const WorkoutFooter: FC<{ disabled: boolean }> = ({ disabled }) => {
    const { editTraining } = useAppSelector(trainingSelector);
    const { selectedUser } = useAppSelector(workoutsSelector);

    const isPastTraining = checkIsPastTraining(editTraining?.type);

    const buttonText = selectedUser ? 'Отправить приглашение' : 'Сохранить';

    return (
        <React.Fragment>
            {isPastTraining && <DrawerFooter />}
            <Button
                type='primary'
                size='large'
                block={true}
                htmlType='submit'
                form='drawer-form-workout'
                disabled={editTraining ? false : disabled}
            >
                {buttonText}
            </Button>
        </React.Fragment>
    );
};
