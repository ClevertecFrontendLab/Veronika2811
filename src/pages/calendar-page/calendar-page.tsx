import { useEffect, useState } from 'react';
import { push } from 'redux-first-history';
import { CalendarCustom } from '@components/calendar-custom';
import { TrainingModalError } from '@components/calendar-custom/components/training-modal-error';
import { MainHeader } from '@components/main-header';
import { TRAINING_STATUS_ERROR } from '@constants/training/training-status-constants';
import { TYPE_ERROR_CATALOG } from '@constants/training/training-types-error-modal';
import { useAppDispatch } from '@hooks/redux-hooks';
import { useLazyGetCatalogTrainingListQuery } from '@redux/api/catalogs.api';
import { useLazyGetUserTrainingDataQuery } from '@redux/api/training.api';
import { setCatalogTrainingList } from '@redux/slice/catalogs-slice';
import { setUserTrainingList, setUserTrainingListError } from '@redux/slice/training-slice';
import { Paths } from '@routes/constants/paths';

import styles from './calendar-page.module.less';

export const CalendarPage = () => {
    const [getUserTrainingList, { data: userTrainingList, isError: isErrorUserTrainingList }] =
        useLazyGetUserTrainingDataQuery();

    const [
        getCatalogTrainingList,
        { data: catalogTrainingList, isError: isErrorCatalogTrainingList },
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
        if (userTrainingList) {
            dispatch(setUserTrainingList(userTrainingList));
            getCatalogTrainingList();
        }
    }, [userTrainingList, isErrorUserTrainingList, dispatch, getCatalogTrainingList]);

    useEffect(() => {
        if (isErrorCatalogTrainingList) {
            setCatalogTrainingError(true);
        }
        if (catalogTrainingList) {
            dispatch(setCatalogTrainingList(catalogTrainingList));
            setCatalogTrainingError(false);
        }
    }, [dispatch, isErrorCatalogTrainingList, catalogTrainingList]);

    const closeModalErrorTraining = () => {
        dispatch(setUserTrainingList([]));
        setCatalogTrainingError(false);
    };

    const retryFetchCatalogTrainingList = () => getCatalogTrainingList();

    return (
        <div className={styles['calendar-wrapper']}>
            <MainHeader />
            <CalendarCustom refetchUserTrainingList={getUserTrainingList} />
            <TrainingModalError
                type={TYPE_ERROR_CATALOG}
                open={catalogTrainingError}
                onCancel={closeModalErrorTraining}
                onClickButton={retryFetchCatalogTrainingList}
            />
        </div>
    );
};
