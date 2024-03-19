import React from 'react';
import { AuthContainer } from '@components/auth-container';
import { LoaderApp } from '@components/ui/loader-app';
import { useAppSelector } from '@hooks/redux-hooks';
import { isLoadingSelector } from '@redux/selectors';

import { AuthComponentTypes } from '@/types/auth';

export const AuthenticatorPage = ({ type }: { type: AuthComponentTypes }) => {
    const isLoading = useAppSelector(isLoadingSelector);

    return (
        <React.Fragment>
            {isLoading && <LoaderApp />}
            <AuthContainer type={type} />
        </React.Fragment>
    );
};
