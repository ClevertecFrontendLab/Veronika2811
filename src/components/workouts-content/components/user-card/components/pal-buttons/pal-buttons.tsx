import { FC } from 'react';
import { TrainingInviteStatus } from '@constants/invite/training-invite-status';
import { Button } from 'antd';

import { Nullebel } from '@/types/nullebel';

type PalButtonsProps = {
    status: Nullebel<string>;
    onClickCancelTraining: () => Promise<void> | undefined;
    onClickUserSelection: () => void;
};

export const PalButtons: FC<PalButtonsProps> = ({
    status,
    onClickCancelTraining,
    onClickUserSelection,
}) => {
    if (status === TrainingInviteStatus.ACCEPTED) {
        return (
            <Button type='default' block={true} onClick={onClickCancelTraining}>
                Отменить тренировку
            </Button>
        );
    }

    return (
        <Button
            disabled={
                status === TrainingInviteStatus.PENDING || status === TrainingInviteStatus.REJECTED
            }
            onClick={onClickUserSelection}
            type='primary'
            block={true}
        >
            Создать тренировку
        </Button>
    );
};
