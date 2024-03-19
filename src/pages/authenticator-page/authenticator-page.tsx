import React, { FC } from 'react';
import { AuthContainer } from '@components/auth-container';
import { LoaderApp } from '@components/ui/loader-app';
import { useAppSelector } from '@hooks/redux-hooks';
import { mainSlice } from '@redux/selectors';

import { AuthComponentTypes } from '@/types/auth';

export const AuthenticatorPage: FC<{ type: AuthComponentTypes }> = ({ type }) => {
    const { isLoading } = useAppSelector(mainSlice);

    return (
        <React.Fragment>
            {isLoading && <LoaderApp />}
            <AuthContainer type={type} />
        </React.Fragment>
    );
};
