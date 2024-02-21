import { auth } from '@constants/index';

export enum Paths {
    MAIN = '/main',
    AUTH_MAIN = '/auth',
    AUTH_SUB_REGISTRATION = auth.REGISTRATION,
    AUTH_MAIN_RESULTS = '/result',
    AUTH_SUB_RESULT_409 = 'error-user-exist',
    AUTH_SUB_RESULT_ERROR = 'error',
    AUTH_SUB_RESULT_SUCCESS = 'success',
    AUTH_SUB_RESULT_ERROR_LOGIN = 'error-login',
}
