import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { Paths } from './constants/Paths';
import { LOGIN, REGISTRATION } from '@constants/authConstants/auth';
import { AuthStatus } from '@constants/authConstants/authStatus';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { authUserSelector } from '@redux/selectors';

import { NotFoundPage } from '@pages/NotFoundPage';
import { MainPage } from '@pages/MainPage';
import { AuthenticatorPage } from '@pages/AuthenticatorPage';
import { LayoutAuthPage } from '@layouts/LayoutAuthPage';
import { ConfirmEmail } from '@components/AuthContainer/components/ConfirmEmail';
import { AuthResult } from '@components/AuthContainer/components/AuthResult';
import { ChangePasswordForm } from '@components/AuthContainer/components/ChangePasswordForm';
import { LayoutMainPage } from '@layouts/LayoutMainPage';

export const AppRouter = () => {
    const isAuthUser = useAppSelector(authUserSelector);

    const location = useLocation();
    const isRedirect = location.state?.fromRedirect;

    return (
        <Routes>
            <Route index element={<Navigate to={Paths.AUTH_MAIN} />} />

            <Route path={Paths.MAIN} element={<LayoutMainPage />}>
                <Route
                    index
                    element={isAuthUser ? <MainPage /> : <Navigate to={Paths.AUTH_MAIN} replace />}
                />
            </Route>

            <Route
                path={Paths.AUTH_MAIN}
                element={isAuthUser ? <Navigate to={Paths.MAIN} replace /> : <LayoutAuthPage />}
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
                    ) : isAuthUser ? (
                        <Navigate to={Paths.MAIN} replace />
                    ) : (
                        <Navigate to={Paths.AUTH_MAIN} replace />
                    )
                }
            >
                <Route
                    path={Paths.AUTH_SUB_RESULT_409}
                    element={<AuthResult statusCode={AuthStatus.STATUS_ERROR_409} />}
                />
                <Route
                    path={Paths.AUTH_SUB_RESULT_ERROR}
                    element={<AuthResult statusCode={AuthStatus.STATUS_ERROR} />}
                />
                <Route
                    path={Paths.AUTH_SUB_RESULT_SUCCESS}
                    element={<AuthResult statusCode={AuthStatus.STATUS_SUCCESS} />}
                />
                <Route
                    path={Paths.AUTH_SUB_RESULT_ERROR_LOGIN}
                    element={<AuthResult statusCode={AuthStatus.STATUS_ERROR_LOGIN} />}
                />
                <Route
                    path={Paths.AUTH_SUB_RESULT_ERROR_CHECK_EMAIL}
                    element={<AuthResult statusCode={AuthStatus.STATUS_ERROR_CHECK_EMAIL} />}
                />
                <Route
                    path={Paths.AUTH_SUB_RESULT_ERROR_CHECK_EMAIL_NO_EXIST}
                    element={
                        <AuthResult statusCode={AuthStatus.STATUS_ERROR_CHECK_EMAIL_NO_EXIST} />
                    }
                />
                <Route
                    path={Paths.AUTH_SUB_RESULT_ERROR_CHANGE_PASSWORD}
                    element={<AuthResult statusCode={AuthStatus.STATUS_ERROR_CHANGE_PASSWORD} />}
                />
                <Route
                    path={Paths.AUTH_SUB_RESULT_SUCCESS_CHANGE_PASSWORD}
                    element={<AuthResult statusCode={AuthStatus.STATUS_SUCCESS_CHANGE_PASSWORD} />}
                />
            </Route>

            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    );
};
