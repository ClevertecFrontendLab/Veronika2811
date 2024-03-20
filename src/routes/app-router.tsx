import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useSearchParams } from 'react-router-dom';
import { ChangePasswordForm } from '@components/auth-container/components/change-password-form';
import { ConfirmEmail } from '@components/auth-container/components/confirm-email';
import { ResultCustom } from '@components/result-custom';
import { LOGIN, REGISTRATION } from '@constants/auth/auth-constants';
import { AuthStatus } from '@constants/auth/auth-status-constants';
import { ACCESS_TOKEN_KEY } from '@constants/storage-keys';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import { LayoutAuthPage } from '@layouts/layout-auth-page';
import { LayoutMainPage } from '@layouts/layout-main-page';
import { AuthenticatorPage } from '@pages/authenticator-page';
import { CalendarPage } from '@pages/calendar-page';
import { FeedbacksPage } from '@pages/feedbacks-page';
import { MainPage } from '@pages/main-page';
import { NotFoundPage } from '@pages/not-found-page';
import { ProfilePage } from '@pages/profile-page';
import { WorkoutsPage } from '@pages/workouts-page';
import { authSelector } from '@redux/selectors';
import { setAccessToken } from '@redux/slice/auth-slice';

import { Paths } from './constants/router-paths';

export const AppRouter = () => {
    const { accessToken } = useAppSelector(authSelector);

    const location = useLocation();
    const [searchParams] = useSearchParams();
    const isRedirect = location.state?.fromRedirect;

    const dispatch = useAppDispatch();

    useEffect(() => {
        const accessTokenGoogle = searchParams.get('accessToken');

        if (accessTokenGoogle) {
            localStorage.setItem(ACCESS_TOKEN_KEY, accessTokenGoogle);
            dispatch(setAccessToken(accessTokenGoogle));
        }
    }, [dispatch, searchParams]);

    const checkAccessTokenAndNavigate = () => {
        if (accessToken) {
            return <Navigate to={Paths.ROOT} replace={true} />;
        }

        return <Navigate to={Paths.AUTH_MAIN} replace={true} />;
    };

    return (
        <Routes>
            <Route
                path={Paths.ROOT}
                element={
                    accessToken ? (
                        <LayoutMainPage />
                    ) : (
                        <Navigate to={Paths.AUTH_MAIN} replace={true} />
                    )
                }
            >
                <Route index={true} element={<Navigate to={Paths.MAIN} />} />
                <Route path={Paths.MAIN} element={<MainPage />} />
                <Route path={Paths.FEEDBACKS} element={<FeedbacksPage />} />
                <Route path={Paths.CALENDAR} element={<CalendarPage />} />
                <Route path={Paths.WORKOUTS} element={<WorkoutsPage />} />
                <Route path={Paths.PROFILE} element={<ProfilePage />} />
            </Route>

            <Route
                path={Paths.AUTH_MAIN}
                element={
                    accessToken ? <Navigate to={Paths.ROOT} replace={true} /> : <LayoutAuthPage />
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
