import { FC } from 'react';
import { AuthContainer } from '@components/auth-container';

import { AuthComponentTypes } from '@/types/auth';

export const AuthenticatorPage: FC<{ type: AuthComponentTypes }> = ({ type }) => (
    <AuthContainer type={type} />
);
