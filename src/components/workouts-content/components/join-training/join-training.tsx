import { useEffect, useState } from 'react';
import { ModalNotification } from '@components/ui/modal-notification';
import { getPopularTypeTraining } from '@components/workouts-content/utils/get-favourite-training';
import { useAppSelector } from '@hooks/redux-hooks';
import {
    useGetCatalogsTrainingPalsQuery,
    useLazyGetCatalogsUserJoinTrainingListQuery,
} from '@redux/api/catalogs.api';
import { catalogSelector, trainingSelector } from '@redux/selectors';

import { JoinTrainingDescription } from './components/join-training-description';
import { JoinTrainingCards } from './components/join-traning-cards/join-traning-cards';
import { JointTrainingInvitationsList } from './components/joint-training-invitations-list';
import { PalsList } from './components/pals-list';
import styles from './join-training.module.less';

import { Nullebel } from '@/types/nullebel';

export const JoinTraining = () => {
    const [getUserJoinTrainingList, { isError }] = useLazyGetCatalogsUserJoinTrainingListQuery();

    useGetCatalogsTrainingPalsQuery();

    const { userJoinTrainingList } = useAppSelector(catalogSelector);
    const { userTrainingList } = useAppSelector(trainingSelector);

    const [showListPals, setShowListPals] = useState(false);

    const [userJoinError, setUserJoinError] = useState<Nullebel<string>>(null);
    const [showJointList, setShowJointList] = useState(false);

    const onClickRandomSelection = async () => {
        try {
            await getUserJoinTrainingList({});
            setUserJoinError(null);
            setShowJointList(true);
        } catch {
            setUserJoinError('random');
        }
    };

    const choosingFriend = async () => {
        const trainingType = getPopularTypeTraining(userTrainingList);

        getUserJoinTrainingList({ trainingType });
        setShowJointList(true);
    };

    const closeUserJoinError = () => setUserJoinError(null);

    useEffect(() => {
        if (isError) {
            setUserJoinError('choose');
        }
    }, [isError]);

    if (userJoinTrainingList && showJointList && !isError) {
        return <JoinTrainingCards setShowJointList={setShowJointList} />;
    }

    if (showListPals) {
        return <PalsList setShowListPals={setShowListPals} />;
    }

    return (
        <div className={styles.wrapper}>
            <JointTrainingInvitationsList setShowListPals={setShowListPals} />
            <JoinTrainingDescription
                onClickRandomSelection={onClickRandomSelection}
                choosingFriend={choosingFriend}
            />
            <PalsList setShowListPals={setShowListPals} />
            <ModalNotification
                type='training-error-catalog'
                open={!!userJoinError}
                onCancel={closeUserJoinError}
                onClickButton={userJoinError === 'random' ? onClickRandomSelection : choosingFriend}
            />
        </div>
    );
};
