import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';

import { authApi } from './api/auth.api';
import { catalogsApi } from './api/catalogs.api';
import { feedbacksApi } from './api/feedbacks.api';
import { trainingApi } from './api/training.api';
import reducerAuth from './slice/authSlice';
import reducerCatalogs from './slice/catalogsSlice';
import reducerMain from './slice/mainSlice';
import reducerTraining from './slice/trainingSlice';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
    savePreviousLocations: 1,
});

export const store = configureStore({
    reducer: combineReducers({
        router: routerReducer,
        authSlice: reducerAuth,
        mainSlice: reducerMain,
        trainingSlice: reducerTraining,
        catalogSlice: reducerCatalogs,
        [authApi.reducerPath]: authApi.reducer,
        [feedbacksApi.reducerPath]: feedbacksApi.reducer,
        [trainingApi.reducerPath]: trainingApi.reducer,
        [catalogsApi.reducerPath]: catalogsApi.reducer,
    }),
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat([
            routerMiddleware,
            authApi.middleware,
            feedbacksApi.middleware,
            trainingApi.middleware,
            catalogsApi.middleware,
        ]);
    },
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
