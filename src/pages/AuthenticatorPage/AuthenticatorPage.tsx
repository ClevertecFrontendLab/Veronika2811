import { RootState } from '@redux/store';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { AuthTypes } from 'src/type/auth/authTypes';

import { AuthContainer } from '@components/AuthContainer';
import { Loader } from '@components/ui/Loader';

export const AuthenticatorPage = ({ type }: { type: AuthTypes }) => {
    const isLoading = useAppSelector((state: RootState) => state.userInfoSlice.isLoading);

    return (
        <>
            <AuthContainer type={type} />
            {isLoading && <Loader />}
        </>
    );
};
