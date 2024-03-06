import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';

import { authApi } from './api/auth.api';
import { feedbacksApi } from './api/feedbacks.api';
import reducer from './slice/authSlice';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
    savePreviousLocations: 1,
});

export const store = configureStore({
    reducer: combineReducers({
        router: routerReducer,
        authSlice: reducer,
        [authApi.reducerPath]: authApi.reducer,
        [feedbacksApi.reducerPath]: feedbacksApi.reducer,
    }),
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(routerMiddleware)
            .concat(authApi.middleware)
            .concat(feedbacksApi.middleware);
    },
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
