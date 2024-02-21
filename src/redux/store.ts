import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { authSlice } from './slice/authSlice';
import reducer from './slice/userInfoSlice';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
    savePreviousLocations: 1,
});

export const store = configureStore({
    reducer: combineReducers({
        router: routerReducer,
        userInfoSlice: reducer,
        [authSlice.reducerPath]: authSlice.reducer,
    }),
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(routerMiddleware)
            .concat(authSlice.middleware);
    }
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
