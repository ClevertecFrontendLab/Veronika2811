import React, { FC } from 'react';
import { TrainingInviteStatus } from '@constants/invite/training-invite-status';
import { useLazyGetCatalogsTrainingPalsQuery } from '@redux/api/catalogs.api';
import { useRespondToInviteMutation } from '@redux/api/invite.api';
import { Button, Col } from 'antd';

type InvitionButtonsProps = {
    idTrain: string;
    setShowListPals: React.Dispatch<React.SetStateAction<boolean>>;
};

export const InvitionButtons: FC<InvitionButtonsProps> = ({ idTrain, setShowListPals }) => {
    const [respondToInvite, { isSuccess }] = useRespondToInviteMutation();
    const [getCatalogsTrainingPals] = useLazyGetCatalogsTrainingPalsQuery();

    const onClickTrainTogether = async (id: string) => {
        await respondToInvite({ id, status: TrainingInviteStatus.ACCEPTED });

        await getCatalogsTrainingPals();

        if (!isSuccess) {
            setShowListPals(true);
        }
    };

    const onClickTrainingRejectRequest = (id: string) =>
        respondToInvite({ id, status: TrainingInviteStatus.REJECTED });

    return (
        <Col xs={{ span: 24 }} xl={{ span: 5 }} className='invitation-item-buttons'>
            <Button
                type='primary'
                size='large'
                block={true}
                onClick={() => onClickTrainTogether(idTrain)}
            >
                Тренироваться вместе
            </Button>
            <Button
                type='default'
                size='large'
                block={true}
                onClick={() => onClickTrainingRejectRequest(idTrain)}
            >
                Отклонить запрос
            </Button>
        </Col>
    );
};
