import { useCallback, useEffect, useState } from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { push } from 'redux-first-history';

import { FeedbacksContent } from '@components/FeedbacksContent';
import { ResultCustom } from '@components/ResultCustom';
import { ModalCustom } from '@components/ui/ModalCustom';

import { useLazyGetFeedbacksQuery } from '@redux/api/feedbacks.api';
import { setIsLoading } from '@redux/slice/mainSlice';
import { useAppDispatch } from '@hooks/reduxHooks';
import { Paths } from '@routes/constants/Paths';
import { FeedbacksStatus } from '@constants/feedbacks/feedbacksConstants';
import { ACCESS_TOKEN_KEY } from '@constants/storageKeys';

import styles from './FeedbacksPage.module.less';

export const FeedbacksPage = () => {
    const [fetchFeedbacks, { data: feedbacksList, error, isLoading, isFetching }] =
        useLazyGetFeedbacksQuery();

    const dispatch = useAppDispatch();

    const [openErrorModal, setOpenErrorModal] = useState(false);

    useEffect(() => {
        fetchFeedbacks();
    }, [fetchFeedbacks]);

    const handleFeedbacksError = useCallback(
        (error: FetchBaseQueryError | SerializedError | undefined) => {
            if (error) {
                if ('status' in error && error.status === FeedbacksStatus.STATUS_ERROR_403) {
                    localStorage.removeItem(ACCESS_TOKEN_KEY);
                    dispatch(push(Paths.AUTH_MAIN));
                } else {
                    setOpenErrorModal(true);
                }
            }
        },
        [dispatch],
    );

    useEffect(() => {
        handleFeedbacksError(error);
    }, [error, handleFeedbacksError]);

    useEffect(() => {
        dispatch(setIsLoading(isLoading || isFetching));
    }, [isLoading, isFetching, dispatch]);

    return (
        <div className={styles['feedbacks-page']}>
            {feedbacksList && (
                <FeedbacksContent feedbacksList={feedbacksList} refetch={fetchFeedbacks} />
            )}
            <ModalCustom open={openErrorModal}>
                <ResultCustom statusCode={FeedbacksStatus.STATUS_ERROR_SERVER} />
            </ModalCustom>
        </div>
    );
};
