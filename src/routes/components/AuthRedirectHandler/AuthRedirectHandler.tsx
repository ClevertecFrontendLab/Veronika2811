import { ReactNode, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { setAccessToken } from '@redux/slice/authSlice';
import { useAppDispatch } from '@hooks/reduxHooks';
import { ACCESS_TOKEN_KEY } from '@constants/storageKeys';

export const AuthRedirectHandler = ({ element }: { element: ReactNode }) => {
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const accessToken = searchParams.get('accessToken');

        if (accessToken) {
            localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
            dispatch(setAccessToken(accessToken));
        }
    }, [dispatch, searchParams]);

    return element;
};
