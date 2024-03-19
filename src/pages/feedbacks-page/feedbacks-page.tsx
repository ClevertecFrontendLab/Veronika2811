import { useCallback, useEffect, useState } from 'react';
import { push } from 'redux-first-history';
import { FeedbacksContent } from '@components/feedbacks-content';
import { ResultCustom } from '@components/result-custom';
import { ModalCustom } from '@components/ui/modal-custom';
import { FeedbacksStatus } from '@constants/feedbacks/feedbacks-constants';
import { ACCESS_TOKEN_KEY } from '@constants/storage-keys';
import { useAppDispatch } from '@hooks/redux-hooks';
import { useLazyGetFeedbacksQuery } from '@redux/api/feedbacks.api';
import { setIsLoading } from '@redux/slice/main-slice';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Paths } from '@routes/constants/paths';

import styles from './feedbacks-page.module.less';

export const FeedbacksPage = () => {
    const [fetchFeedbacks, { data: feedbacksList, error, isLoading, isFetching }] =
        useLazyGetFeedbacksQuery();

    const dispatch = useAppDispatch();

    const [openErrorModal, setOpenErrorModal] = useState(false);

    useEffect(() => {
        fetchFeedbacks();
    }, [fetchFeedbacks]);

    const handleFeedbacksError = useCallback(
        (fetchError: FetchBaseQueryError | SerializedError | undefined) => {
            if (fetchError) {
                if (
                    'status' in fetchError &&
                    fetchError.status === FeedbacksStatus.STATUS_ERROR_403
                ) {
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
