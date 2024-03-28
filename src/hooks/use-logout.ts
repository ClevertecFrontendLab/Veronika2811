import { push } from 'redux-first-history';
import { setAccessToken } from '@redux/slice/auth-slice';
import { resetCurrentUserInfo } from '@redux/slice/profile-slice';
import { Paths } from '@routes/constants/router-paths';

import { useAppDispatch } from './redux-hooks';

export const useLogout = () => {
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        localStorage.clear();

        dispatch(setAccessToken(''));
        dispatch(resetCurrentUserInfo());
        dispatch(push(Paths.AUTH_MAIN));
    };

    return handleLogout;
};
