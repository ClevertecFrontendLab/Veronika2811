import { ErrorTypes } from '../error-types';

export type LoginResponse = ErrorTypes & {
    accessToken: string;
};

export type CheckEmailResponse = ErrorTypes & {
    email: string;
    message: string;
};
