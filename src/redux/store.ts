import { createReduxHistoryContext } from 'redux-first-history';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';

import { authApi } from './api/auth.api';
import { catalogsApi } from './api/catalogs.api';
import { feedbacksApi } from './api/feedbacks.api';
import { trainingApi } from './api/training.api';
import reducerAuth from './slice/auth-slice';
import reducerCatalogs from './slice/catalogs-slice';
import reducerMain from './slice/main-slice';
import reducerTraining from './slice/training-slice';
import reducerWorkouts from './slice/workouts-slice';

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
        workoutsSlice: reducerWorkouts,
        [authApi.reducerPath]: authApi.reducer,
        [feedbacksApi.reducerPath]: feedbacksApi.reducer,
        [trainingApi.reducerPath]: trainingApi.reducer,
        [catalogsApi.reducerPath]: catalogsApi.reducer,
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            routerMiddleware,
            authApi.middleware,
            feedbacksApi.middleware,
            trainingApi.middleware,
            catalogsApi.middleware,
        ]),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
