import { useEffect, useState } from 'react';
import { push } from 'redux-first-history';
import { WorkoutsHeader } from '@components/page-headers/workouts-header';
import { ModalNotification } from '@components/ui/modal-notification';
import { WorkoutsContent } from '@components/workouts-content';
import { TRAINING_STATUS_ERROR } from '@constants/training/training-status-constants';
import { TRAINING_ERROR_CATALOG } from '@constants/training/training-types-error-modal';
import { useAppDispatch } from '@hooks/redux-hooks';
import { useLazyGetCatalogTrainingListQuery } from '@redux/api/catalogs.api';
import { useLazyGetUserTrainingDataQuery } from '@redux/api/training.api';
import { setUserTrainingList, setUserTrainingListError } from '@redux/slice/training-slice';
import { Paths } from '@routes/constants/router-paths';

import styles from './workouts-page.module.less';

export const WorkoutsPage = () => {
    const [
        getUserTrainingList,
        { isSuccess: isSuccessUserTrainingList, isError: isErrorUserTrainingList },
    ] = useLazyGetUserTrainingDataQuery();

    const [
        getCatalogTrainingList,
        { isSuccess: isSuccessCatalogTrainingList, isError: isErrorCatalogTrainingList },
    ] = useLazyGetCatalogTrainingListQuery();

    const [catalogTrainingError, setCatalogTrainingError] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        getUserTrainingList();
    }, [getUserTrainingList]);

    useEffect(() => {
        if (isErrorUserTrainingList) {
            dispatch(push(Paths.MAIN));
            dispatch(setUserTrainingListError(TRAINING_STATUS_ERROR));
        }

        if (isSuccessUserTrainingList) {
            getCatalogTrainingList();
        }
    }, [dispatch, getCatalogTrainingList, isErrorUserTrainingList, isSuccessUserTrainingList]);

    useEffect(() => {
        if (isErrorCatalogTrainingList) {
            setCatalogTrainingError(true);
        }
        if (isSuccessCatalogTrainingList) {
            setCatalogTrainingError(false);
        }
    }, [
        dispatch,
        isErrorCatalogTrainingList,
        getCatalogTrainingList,
        isSuccessCatalogTrainingList,
    ]);

    const closeModalErrorTraining = () => {
        dispatch(setUserTrainingList([]));
        setCatalogTrainingError(false);
    };

    const retryFetchCatalogTrainingList = () => getCatalogTrainingList();

    return (
        <div className={styles['workouts-wrapper']}>
            <WorkoutsHeader />
            <WorkoutsContent />
            <ModalNotification
                type={TRAINING_ERROR_CATALOG}
                open={catalogTrainingError}
                onCancel={closeModalErrorTraining}
                onClickButton={retryFetchCatalogTrainingList}
                maskStyle={{ backdropFilter: 'blur(12px)', background: 'rgb(100 104 109)' }}
            />
        </div>
    );
};
