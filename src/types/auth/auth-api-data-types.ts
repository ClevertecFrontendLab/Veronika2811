import { ErrorTypeResponse } from '../error-types';

export type LoginResponse = ErrorTypeResponse & {
    accessToken: string;
};

export type CheckEmailResponse = ErrorTypeResponse & {
    email: string;
    message: string;
};
