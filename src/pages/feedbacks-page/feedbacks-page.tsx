import { useCallback, useEffect, useState } from 'react';
import { push } from 'redux-first-history';
import { FeedbacksContent } from '@components/feedbacks-content';
import { BreadcrumbCustom } from '@components/page-headers/breadcrumb-custom';
import { ResultCustom } from '@components/result-custom';
import { ModalCustom } from '@components/ui/modal-custom';
import { FeedbacksStatus } from '@constants/feedbacks/feedbacks-constants';
import { ACCESS_TOKEN_KEY } from '@constants/storage-keys';
import { useAppDispatch } from '@hooks/redux-hooks';
import { useLazyGetFeedbacksQuery } from '@redux/api/feedbacks.api';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Paths } from '@routes/constants/router-paths';

import styles from './feedbacks-page.module.less';

export const FeedbacksPage = () => {
    const [fetchFeedbacks, { data: feedbacksList, error }] = useLazyGetFeedbacksQuery();

    const dispatch = useAppDispatch();

    const [openErrorModal, setOpenErrorModal] = useState(false);

    useEffect(() => {
        fetchFeedbacks();
    }, [fetchFeedbacks]);

    const handleFeedbacksError = useCallback(
        (fetchError?: FetchBaseQueryError | SerializedError) => {
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

    return (
        <div className={styles['feedbacks-page']}>
            <BreadcrumbCustom />
            <div className={styles['feedbacks-content']}>
                {feedbacksList && <FeedbacksContent feedbacksList={feedbacksList} />}
                <ModalCustom open={openErrorModal}>
                    <ResultCustom statusCode={FeedbacksStatus.STATUS_ERROR_SERVER} />
                </ModalCustom>
            </div>
        </div>
    );
};
