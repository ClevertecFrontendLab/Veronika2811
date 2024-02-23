import { AuthContainer } from '@components/AuthContainer';
import { Loader } from '@components/ui/Loader';

import { isLoadingSelector } from '@redux/selectors';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { AuthTypes } from '@type/auth/authTypes';

export const AuthenticatorPage = ({ type }: { type: AuthTypes }) => {
    const isLoading = useAppSelector(isLoadingSelector);

    return (
        <>
            <AuthContainer type={type} />
            {isLoading && <Loader />}
        </>
    );
};
