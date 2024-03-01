import { Button, Result } from 'antd';
import { push } from 'redux-first-history';
import classNames from 'classnames';

import { useAppDispatch } from '@hooks/reduxHooks';
import { Paths } from '@routes/constants/Paths';
import { FeedbacksStatus } from '@constants/feedbacks/feedbacksConstants';
import { RESULTS } from './constants/results';

import styles from './ResultCustom.module.scss';

type ResultClassMap = {
    [key: string]: string;
};

type ResultCustomProps = {
    statusCode: number | string;
    footer?: React.ReactNode;
    onClick?: () => void;
};

export const ResultCustom = ({ statusCode, footer, onClick }: ResultCustomProps) => {
    const dispatch = useAppDispatch();

    const matchingResult = RESULTS.find((el) => el.statusCode === statusCode);

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
    };

    const changeClasses = classMap[statusCode] || styles['auth-result'];

    return (
        <>
            {matchingResult && (
                <Result
                    className={changeClasses}
                    status={matchingResult.status}
                    title={matchingResult.title}
                    subTitle={matchingResult.subtitle}
                    extra={
                        !footer
                            ? [
                                  <Button
                                      type='primary'
                                      key='button-result'
                                      size='large'
                                      onClick={onClick ? onClick : redirectPage}
                                      data-test-id={matchingResult.testId}
                                  >
                                      {matchingResult.button}
                                  </Button>,
                              ]
                            : footer
                    }
                />
            )}
        </>
    );
};
