import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';

import { store } from '@redux/store';
import { AppRouter } from './routes/AppRouter';

import 'antd/dist/antd.css';
import './styles/constants.scss';
import './styles/base.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <AppRouter />
        </Provider>
    </React.StrictMode>,
);
