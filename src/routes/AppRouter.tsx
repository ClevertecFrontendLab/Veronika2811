import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { AuthenticatorPage } from '@pages/AuthenticatorPage';
import { FeedbacksPage } from '@pages/FeedbacksPage';
import { MainPage } from '@pages/MainPage';
import { NotFoundPage } from '@pages/NotFoundPage';
import { LayoutAuthPage } from '@layouts/LayoutAuthPage';
import { LayoutMainPage } from '@layouts/LayoutMainPage';
import { ChangePasswordForm } from '@components/AuthContainer/components/ChangePasswordForm';
import { ConfirmEmail } from '@components/AuthContainer/components/ConfirmEmail';
import { ResultCustom } from '@components/ResultCustom';

import { AuthRedirectHandler } from './components/AuthRedirectHandler';
import { Paths } from './constants/Paths';

import { accessTokenSelector } from '@redux/selectors';
import { useAppSelector } from '@hooks/reduxHooks';
import { LOGIN, REGISTRATION } from '@constants/auth/authConstants';
import { AuthStatus } from '@constants/auth/authStatusConstants';

export const AppRouter = () => {
    const accessToken = useAppSelector(accessTokenSelector);

    const location = useLocation();
    const isRedirect = location.state?.fromRedirect;

    return (
        <Routes>
            <Route
                path={Paths.ROOT}
                element={<AuthRedirectHandler element={<Navigate to={Paths.MAIN} replace />} />}
            />

            <Route path={Paths.MAIN} element={<LayoutMainPage />}>
                <Route
                    index
                    element={accessToken ? <MainPage /> : <Navigate to={Paths.AUTH_MAIN} replace />}
                />
            </Route>

            <Route path={Paths.FEEDBACKS} element={<LayoutMainPage />}>
                <Route
                    index
                    element={
                        accessToken ? <FeedbacksPage /> : <Navigate to={Paths.AUTH_MAIN} replace />
                    }
                />
            </Route>

            <Route
                path={Paths.AUTH_MAIN}
                element={accessToken ? <Navigate to={Paths.MAIN} replace /> : <LayoutAuthPage />}
            >
                <Route index element={<AuthenticatorPage type={LOGIN} />} />
                <Route
                    path={Paths.AUTH_SUB_REGISTRATION}
                    element={<AuthenticatorPage type={REGISTRATION} />}
                />
                <Route path={Paths.AUTH_SUB_CONFIRM_EMAIL} element={<ConfirmEmail />} />
                <Route path={Paths.AUTH_SUB_CHANGE_PASSWORD} element={<ChangePasswordForm />} />
            </Route>

            <Route
                path={Paths.AUTH_MAIN_RESULTS}
                element={
                    isRedirect ? (
                        <LayoutAuthPage />
                    ) : accessToken ? (
                        <Navigate to={Paths.MAIN} replace />
                    ) : (
                        <Navigate to={Paths.AUTH_MAIN} replace />
                    )
                }
            >
                <Route
                    path={Paths.AUTH_SUB_RESULT_409}
                    element={<ResultCustom statusCode={AuthStatus.STATUS_ERROR_409} />}
                />
                <Route
                    path={Paths.AUTH_SUB_RESULT_ERROR}
                    element={<ResultCustom statusCode={AuthStatus.STATUS_ERROR} />}
                />
                <Route
                    path={Paths.AUTH_SUB_RESULT_SUCCESS}
                    element={<ResultCustom statusCode={AuthStatus.STATUS_SUCCESS} />}
                />
                <Route
                    path={Paths.AUTH_SUB_RESULT_ERROR_LOGIN}
                    element={<ResultCustom statusCode={AuthStatus.STATUS_ERROR_LOGIN} />}
                />
                <Route
                    path={Paths.AUTH_SUB_RESULT_ERROR_CHECK_EMAIL}
                    element={<ResultCustom statusCode={AuthStatus.STATUS_ERROR_CHECK_EMAIL} />}
                />
                <Route
                    path={Paths.AUTH_SUB_RESULT_ERROR_CHECK_EMAIL_NO_EXIST}
                    element={
                        <ResultCustom statusCode={AuthStatus.STATUS_ERROR_CHECK_EMAIL_NO_EXIST} />
                    }
                />
                <Route
                    path={Paths.AUTH_SUB_RESULT_ERROR_CHANGE_PASSWORD}
                    element={<ResultCustom statusCode={AuthStatus.STATUS_ERROR_CHANGE_PASSWORD} />}
                />
                <Route
                    path={Paths.AUTH_SUB_RESULT_SUCCESS_CHANGE_PASSWORD}
                    element={
                        <ResultCustom statusCode={AuthStatus.STATUS_SUCCESS_CHANGE_PASSWORD} />
                    }
                />
            </Route>

            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    );
};
