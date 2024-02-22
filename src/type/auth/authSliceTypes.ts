import { AuthError } from './authForm';

interface EmailData {
    email: string;
}

interface LoginSuccessResponse {
    accessToken: string;
}

export type LoginResponse = LoginSuccessResponse | AuthError;

interface CheckEmailSuccessResponse extends EmailData {
    message: string;
}

export type CheckEmailResponse = CheckEmailSuccessResponse | AuthError;

export interface EmailVerificationData extends EmailData {
    code: string;
}

export interface PasswordConfirmationData {
    password: string;
    confirmPassword: string;
}
