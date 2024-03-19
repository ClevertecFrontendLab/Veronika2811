import { FC, ReactNode, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ACCESS_TOKEN_KEY } from '@constants/storage-keys';
import { useAppDispatch } from '@hooks/redux-hooks';
import { setAccessToken } from '@redux/slice/auth-slice';

export const AuthRedirectHandler: FC<{ element: ReactNode }> = ({ element }) => {
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
