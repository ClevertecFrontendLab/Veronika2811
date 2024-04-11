import { FC, useEffect, useState } from 'react';
import { ModalNotification } from '@components/ui/modal-notification';
import { UserCard } from '@components/workouts-content/components/user-card';
import { TypeCards } from '@components/workouts-content/constants/type-cards';
import { useAppSelector } from '@hooks/redux-hooks';
import { useDeleteInviteMutation } from '@redux/api/invite.api';
import { catalogSelector } from '@redux/selectors';
import { List, Space, Typography } from 'antd';

import { ModalPals } from '../modal-pals';

import styles from './pals-list.module.less';

import { Nullebel } from '@/types/nullebel';

type PalsListProps = {
    setShowListPals: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PalsList: FC<PalsListProps> = ({ setShowListPals }) => {
    const [deleteInvite, { isSuccess, isError }] = useDeleteInviteMutation();

    const { trainingPals } = useAppSelector(catalogSelector);

    const [openPalsModal, setOpenPalsModal] = useState(false);
    const [deleteInviteError, setDeleteInviteError] = useState(false);

    const cancelTraining = async (inviteId: Nullebel<string>) => {
        try {
            await deleteInvite({ inviteId });
            setDeleteInviteError(false);
            setOpenPalsModal(false);
        } catch {
            setDeleteInviteError(true);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            setShowListPals?.(false);
            setOpenPalsModal((prev) => !prev);
        }
    }, [isSuccess, setShowListPals]);

    useEffect(() => {
        if (isError) {
            setDeleteInviteError(true);
        }
    }, [isError]);

    const onCloseModal = () => setOpenPalsModal(false);

    const currentTrainingPals = trainingPals.length > 4 ? trainingPals.slice(0, 4) : trainingPals;

    return (
        <div className={styles.pals}>
            <Typography.Title level={4} className={styles.title}>
                Мои партнёры по тренировкам
            </Typography.Title>
            {trainingPals.length > 0 ? (
                <Space className={styles['pals-list']} onClick={() => setOpenPalsModal(true)}>
                    <List
                        dataSource={currentTrainingPals}
                        renderItem={(pal, index) => (
                            <UserCard pal={pal} index={index} type={TypeCards.PAL} />
                        )}
                    />
                </Space>
            ) : (
                <Typography.Text type='secondary'>
                    У вас пока нет партнёров для совместных тренировок
                </Typography.Text>
            )}
            <ModalPals
                open={openPalsModal}
                onClose={onCloseModal}
                cancelTraining={cancelTraining}
            />
            <ModalNotification
                type='training-error-save'
                open={deleteInviteError}
                onClickButton={() => setDeleteInviteError(false)}
            />
        </div>
    );
};
