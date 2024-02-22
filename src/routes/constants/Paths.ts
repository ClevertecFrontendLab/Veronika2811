import { REGISTRATION } from '@constants/authConstants/auth';

export enum Paths {
    MAIN = '/main',
    AUTH_MAIN = '/auth',
    AUTH_SUB_REGISTRATION = REGISTRATION,
    AUTH_SUB_CONFIRM_EMAIL = 'confirm-email',
    AUTH_SUB_CHANGE_PASSWORD = 'change-password',
    AUTH_MAIN_RESULTS = '/result',
    AUTH_SUB_RESULT_409 = 'error-user-exist',
    AUTH_SUB_RESULT_ERROR = 'error',
    AUTH_SUB_RESULT_SUCCESS = 'success',
    AUTH_SUB_RESULT_ERROR_LOGIN = 'error-login',
    AUTH_SUB_RESULT_ERROR_CHECK_EMAIL = 'error-check-email',
    AUTH_SUB_RESULT_ERROR_CHECK_EMAIL_NO_EXIST = 'error-check-email-no-exist',
    AUTH_SUB_RESULT_ERROR_CHANGE_PASSWORD = 'error-change-password',
    AUTH_SUB_RESULT_SUCCESS_CHANGE_PASSWORD = 'success-change-password',
}
