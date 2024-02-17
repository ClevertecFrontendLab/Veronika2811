import { Navigate, Route, Routes } from 'react-router-dom';
import { HistoryRouter } from 'redux-first-history/rr6';

import { Paths } from './constants/Paths';
import { NotFoundPage } from '@pages/NotFoundPage';
import { AuthenticatorPage } from '@pages/AuthenticatorPage';
import { MainPage } from '@pages/MainPage';
import { history } from '@redux/store';

export const AppRouter = () => (
    <HistoryRouter history={history}>
        <Routes>
            <Route>
                <Route path='*' element={<NotFoundPage />} />
                <Route path='/'>
                    <Route index element={<Navigate to={Paths.AUTH_PAGE} />} />
                    <Route path={Paths.AUTH_PAGE} element={<AuthenticatorPage />} />
                    <Route path={Paths.MAIN} element={<MainPage />} />
                </Route>
            </Route>
        </Routes>
    </HistoryRouter>
);
