import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AlertApp } from '@components/ui/alert-app';
import { LoaderApp } from '@components/ui/loader-app';
import { ACCESS_TOKEN_KEY } from '@constants/storage-keys';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import { useLazyGetCurrentUserInfoQuery } from '@redux/api/profile.api';
import { mainSelector, previousLocationSelector } from '@redux/selectors';
import { setAccessToken } from '@redux/slice/auth-slice';
import { AppRouter } from '@routes/app-router';
import { Paths } from '@routes/constants/router-paths';

export const App = () => {
    const [searchParams] = useSearchParams();

    const [getCurrentUserInfo, { data: currentUserInfo }] = useLazyGetCurrentUserInfoQuery();

    const previousLocations = useAppSelector(previousLocationSelector);
    const { isLoading, alertApp } = useAppSelector(mainSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const currentPath = previousLocations?.[0]?.location?.pathname;

        if (
            !currentUserInfo?.email &&
            currentPath &&
            !currentPath.includes(Paths.AUTH_MAIN) &&
            !currentPath.includes(Paths.AUTH_MAIN_RESULTS)
        ) {
            getCurrentUserInfo();
        }
    }, [currentUserInfo?.email, getCurrentUserInfo, previousLocations]);

    useEffect(() => {
        const accessTokenGoogle = searchParams.get('accessToken');

        if (accessTokenGoogle) {
            localStorage.setItem(ACCESS_TOKEN_KEY, accessTokenGoogle);
            dispatch(setAccessToken(accessTokenGoogle));
        }
    }, [dispatch, searchParams]);

    return (
        <React.Fragment>
            {isLoading && <LoaderApp />}
            {alertApp && (
                <AlertApp
                    message={alertApp.message}
                    type={alertApp.type}
                    testIds={alertApp.testIds}
                    container={alertApp.container}
                />
            )}
            <AppRouter />
        </React.Fragment>
    );
};
