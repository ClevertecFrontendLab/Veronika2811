export type EmailData = {
    email: string;
}

type Credentials = EmailData & {
    password: string;
}

export type RegistrationData = Credentials & {
    passwordConfirm?: string;
}

export type LoginData = Credentials & {
    remember: boolean;
}

export type EmailVerificationData = EmailData & {
    code: string;
}

export type PasswordConfirmationData = {
    password: string;
    confirmPassword: string;
}

export type AuthData = RegistrationData & LoginData;
