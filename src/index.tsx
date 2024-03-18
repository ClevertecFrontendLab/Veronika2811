import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HistoryRouter } from 'redux-first-history/rr6';

import { AppRouter } from './routes/AppRouter';

import { store } from '@redux/store';
import { history } from '@redux/store';

import './styles/index.less';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history}>
                <AppRouter />
            </HistoryRouter>
        </Provider>
    </React.StrictMode>,
);
