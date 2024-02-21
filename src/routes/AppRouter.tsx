import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { NotFoundPage } from '@pages/NotFoundPage';
import { MainPage } from '@pages/MainPage';
import { LayoutAuthPage } from '@layouts/LayoutAuthPage';
import { AuthenticatorPage } from '@pages/AuthenticatorPage';
import { AuthResult } from '@components/AuthResult';
import { RootState } from '@redux/store';
import { Paths } from './constants/Paths';
import { auth, authStatus } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';

export const AppRouter = () => {
    const location = useLocation();

    const userAuth = useAppSelector((state: RootState) => state.userInfoSlice.userAuth);

    const isRedirect = location.state?.fromRedirect;

    return (
        <Routes>
            <Route>
                <Route index element={<Navigate to={Paths.AUTH_MAIN} />} />
                <Route
                    path={Paths.MAIN}
                    element={userAuth ? <MainPage /> : <Navigate to={Paths.AUTH_MAIN} replace />}
                />

                <Route
                    path={Paths.AUTH_MAIN}
                    element={userAuth ? <Navigate to={Paths.MAIN} replace /> : <LayoutAuthPage />}
                >
                    <Route index element={<AuthenticatorPage type={auth.LOGIN} />} />
                    <Route
                        path={Paths.AUTH_SUB_REGISTRATION}
                        element={<AuthenticatorPage type={auth.REGISTRATION} />}
                    />
                </Route>

                <Route
                    path={Paths.AUTH_MAIN_RESULTS}
                    element={
                        isRedirect ? (
                            <LayoutAuthPage />
                        ) : userAuth ? (
                            <Navigate to={Paths.MAIN} replace />
                        ) : (
                            <Navigate to={Paths.AUTH_MAIN} replace />
                        )
                    }
                >
                    <Route
                        path={Paths.AUTH_SUB_RESULT_409}
                        element={<AuthResult statusCode={authStatus.STATUS_ERROR_409} />}
                    />
                    <Route
                        path={Paths.AUTH_SUB_RESULT_ERROR}
                        element={<AuthResult statusCode={authStatus.STATUS_ERROR} />}
                    />
                    <Route
                        path={Paths.AUTH_SUB_RESULT_SUCCESS}
                        element={<AuthResult statusCode={authStatus.STATUS_SUCCESS} />}
                    />
                    <Route
                        path={Paths.AUTH_SUB_RESULT_ERROR_LOGIN}
                        element={<AuthResult statusCode={authStatus.STATUS_ERROR_LOGIN} />}
                    />
                </Route>
                <Route path='*' element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};
