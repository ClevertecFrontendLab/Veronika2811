interface Credentials {
    email: string;
    password: string;
}

export interface RegistrationData extends Credentials {
    passwordConfirm?: string;
}

export interface LoginData extends Credentials {
    remember?: boolean;
}

export interface AuthData extends Credentials {
    passwordConfirm?: string;
    remember?: boolean;
}

export interface AuthError {
    status: number;
    data: {
        statusCode?: number;
        error?: string;
        message?: string;
    };
}
