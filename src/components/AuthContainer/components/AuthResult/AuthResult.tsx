import { Button, Result } from 'antd';
import { push } from 'redux-first-history';

import { Paths } from '@routes/constants/Paths';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { RESULTS } from './constants/results';

import styles from './AuthResult.module.scss';

interface ClassMap {
    [key: string]: string;
}

export const AuthResult = ({ statusCode }: { statusCode: number | string }) => {
    const dispatch = useAppDispatch();

    const matchingResult = RESULTS.find((el) => el.statusCode === statusCode);

    const redirectPage = () => {
        if (matchingResult) dispatch(push(matchingResult.redirect));
    };

    const classMap: ClassMap = {
        [Paths.AUTH_SUB_RESULT_ERROR_CHECK_EMAIL_NO_EXIST]: styles['auth-check-no-exist'],
        [Paths.AUTH_SUB_RESULT_ERROR_CHECK_EMAIL]: styles['auth-check-error'],
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
                    extra={[
                        <Button
                            type='primary'
                            key='button-result'
                            size='large'
                            onClick={redirectPage}
                            data-test-id={matchingResult.testId}
                        >
                            {matchingResult.button}
                        </Button>,
                    ]}
                />
            )}
        </>
    );
};
