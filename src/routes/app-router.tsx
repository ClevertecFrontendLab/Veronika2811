import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ChangePasswordForm } from '@components/auth-container/components/change-password-form';
import { ConfirmEmail } from '@components/auth-container/components/confirm-email';
import { ResultCustom } from '@components/result-custom';
import { LOGIN, REGISTRATION } from '@constants/auth/auth-constants';
import { AuthStatus } from '@constants/auth/auth-status-constants';
import { useAppSelector } from '@hooks/redux-hooks';
import { LayoutAuthPage } from '@layouts/layout-auth-page';
import { LayoutMainPage } from '@layouts/layout-main-page';
import { AuthenticatorPage } from '@pages/authenticator-page';
import { CalendarPage } from '@pages/calendar-page';
import { FeedbacksPage } from '@pages/feedbacks-page';
import { MainPage } from '@pages/main-page';
import { NotFoundPage } from '@pages/not-found-page';
import { accessTokenSelector } from '@redux/selectors';

import { AuthRedirectHandler } from './components/auth-redirect-handler';
import { Paths } from './constants/paths';

export const AppRouter = () => {
    const accessToken = useAppSelector(accessTokenSelector);

    const location = useLocation();
    const isRedirect = location.state?.fromRedirect;

    function checkAccessTokenAndNavigate() {
        if (accessToken) {
            return <Navigate to={Paths.MAIN} replace={true} />;
        }

        return <Navigate to={Paths.AUTH_MAIN} replace={true} />;
    }

    return (
        <Routes>
            <Route
                path={Paths.ROOT}
                element={
                    <AuthRedirectHandler element={<Navigate to={Paths.MAIN} replace={true} />} />
                }
            />

            <Route path={Paths.MAIN} element={<LayoutMainPage />}>
                <Route
                    index={true}
                    element={
                        accessToken ? (
                            <MainPage />
                        ) : (
                            <Navigate to={Paths.AUTH_MAIN} replace={true} />
                        )
                    }
                />
            </Route>

            <Route path={Paths.FEEDBACKS} element={<LayoutMainPage />}>
                <Route
                    index={true}
                    element={
                        accessToken ? (
                            <FeedbacksPage />
                        ) : (
                            <Navigate to={Paths.AUTH_MAIN} replace={true} />
                        )
                    }
                />
            </Route>

            <Route path={Paths.CALENDAR} element={<LayoutMainPage />}>
                <Route
                    index={true}
                    element={
                        accessToken ? (
                            <CalendarPage />
                        ) : (
                            <Navigate to={Paths.AUTH_MAIN} replace={true} />
                        )
                    }
                />
            </Route>

            <Route
                path={Paths.AUTH_MAIN}
                element={
                    accessToken ? <Navigate to={Paths.MAIN} replace={true} /> : <LayoutAuthPage />
                }
            >
                <Route index={true} element={<AuthenticatorPage type={LOGIN} />} />
                <Route
                    path={Paths.AUTH_SUB_REGISTRATION}
                    element={<AuthenticatorPage type={REGISTRATION} />}
                />
                <Route path={Paths.AUTH_SUB_CONFIRM_EMAIL} element={<ConfirmEmail />} />
                <Route path={Paths.AUTH_SUB_CHANGE_PASSWORD} element={<ChangePasswordForm />} />
            </Route>

            <Route
                path={Paths.AUTH_MAIN_RESULTS}
                element={isRedirect ? <LayoutAuthPage /> : checkAccessTokenAndNavigate()}
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
