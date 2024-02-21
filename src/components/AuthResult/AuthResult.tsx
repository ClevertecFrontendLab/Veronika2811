import { Button, Result } from 'antd';
import { push } from 'redux-first-history';
// import { useSelector } from 'react-redux';

import { RESULTS } from './constants/results';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';

import styles from './AuthResult.module.scss';
// import { RootState } from '@redux/store';

export const AuthResult = ({ statusCode }: { statusCode: number | string }) => {
    const dispatch = useAppDispatch();

    const resultObj = RESULTS.find((el) => el.statusCode === statusCode);

    const redirectPage = () => {
        if (resultObj) dispatch(push(resultObj.redirect));
    };

    return (
        <>
            {resultObj && (
                <Result
                    className={styles['auth-result']}
                    status={resultObj.status}
                    title={resultObj.title}
                    subTitle={resultObj.subtitle}
                    extra={[
                        <Button
                            type='primary'
                            key='button-result'
                            block
                            size='large'
                            onClick={redirectPage}
                            data-test-id={resultObj.testId}
                        >
                            {resultObj.button}
                        </Button>,
                    ]}
                />
            )}
        </>
    );
};
