import { AuthContainer } from '@components/AuthContainer';
import { Loader } from '@components/ui/Loader';

import { isLoadingSelector } from '@redux/selectors';
import { useAppSelector } from '@hooks/reduxHooks';
import { AuthComponentTypes } from '@src/types/auth';

export const AuthenticatorPage = ({ type }: { type: AuthComponentTypes }) => {
    const isLoading = useAppSelector(isLoadingSelector);

    return (
        <>
            {isLoading && <Loader />}
            <AuthContainer type={type} />
        </>
    );
};
