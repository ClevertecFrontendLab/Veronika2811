import { AuthContainer } from '@components/AuthContainer';
import { AuthTypes } from '@type/auth/authTypes';

export const AuthenticatorPage = ({ type }: {type: AuthTypes}) => (
    <AuthContainer type={type} />
);
