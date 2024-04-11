import { createReduxHistoryContext } from 'redux-first-history';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';

import emptyApi from './api/empty-api';
import reducerAuth from './slice/auth-slice';
import reducerCatalogs from './slice/catalogs-slice';
import reducerInvite from './slice/invite-slice';
import reducerMain from './slice/main-slice';
import reducerProfile from './slice/profile-slice';
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
        profileSlice: reducerProfile,
        inviteSlice: reducerInvite,
        [emptyApi.reducerPath]: emptyApi.reducer,
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(emptyApi.middleware, routerMiddleware),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
