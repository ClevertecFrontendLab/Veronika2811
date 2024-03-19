import React from 'react';
import { push } from 'redux-first-history';
import { FeedbacksStatus } from '@constants/feedbacks/feedbacks-constants';
import { TRAINING_STATUS_ERROR } from '@constants/training/training-status-constants';
import { useAppDispatch } from '@hooks/redux-hooks';
import { Paths } from '@routes/constants/router-paths';
import { Button, Result } from 'antd';
import classNames from 'classnames';

import { DEFAULT_RESULT, RESULTS } from './constants/results';
import styles from './result-custom.module.less';

type ResultClassMap = Record<string, string>;

type ResultCustomProps = {
    statusCode: number | string;
    footer?: React.ReactNode;
    onClick?: () => void;
};

export const ResultCustom = ({ statusCode, footer, onClick }: ResultCustomProps) => {
    const dispatch = useAppDispatch();

    const matchingResult = RESULTS.find((el) => el.statusCode === statusCode) || DEFAULT_RESULT;

    const redirectPage = () => {
        if (matchingResult && matchingResult.redirect) {
            dispatch(push(matchingResult.redirect));
        }
    };

    const classMap: ResultClassMap = {
        [Paths.AUTH_SUB_RESULT_ERROR_CHECK_EMAIL_NO_EXIST]: styles['auth-check-no-exist'],
        [Paths.AUTH_SUB_RESULT_ERROR_CHECK_EMAIL]: styles['auth-check-error'],
        [FeedbacksStatus.STATUS_ERROR]: styles['feedback-result'],
        [FeedbacksStatus.STATUS_SUCCESS]: styles['feedback-result'],
        [FeedbacksStatus.STATUS_ERROR_SERVER]: classNames(
            styles['feedback-result'],
            'feedback-result-server',
        ),
        [TRAINING_STATUS_ERROR]: classNames(styles['feedback-result'], 'feedback-result-server'),
    };

    const changeClasses = classMap[statusCode] || styles['auth-result'];

    return (
        <Result
            className={changeClasses}
            status={matchingResult.status}
            title={matchingResult.title}
            subTitle={matchingResult.subtitle}
            extra={
                footer || [
                    <Button
                        type='primary'
                        key='button-result'
                        size='large'
                        onClick={onClick || redirectPage}
                        data-test-id={matchingResult.testId}
                    >
                        {matchingResult.button}
                    </Button>,
                ]
            }
        />
    );
};
