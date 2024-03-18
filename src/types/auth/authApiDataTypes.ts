import { ErrorTypes } from '../errorTypes';

export type LoginResponse = ErrorTypes & {
    accessToken: string;
};

export type CheckEmailResponse = ErrorTypes & {
    email: string;
    message: string;
};
