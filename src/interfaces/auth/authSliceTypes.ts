import { AuthError } from './authForm';

interface EmailData {
    email: string;
}

export interface LoginResponse extends AuthError {
    accessToken: string;
}

export interface CheckEmailResponse extends EmailData, AuthError {
    message: string;
}

export interface EmailVerificationData extends EmailData {
    code: string;
}

export interface PasswordConfirmationData {
    password: string;
    confirmPassword: string;
}
