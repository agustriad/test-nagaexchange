export enum GlobalErrorCode {
    VALIDATION_ERROR = 'TN_0101',
    FAILED_INSERT_DATA = 'TN_0103',
    FAILED_UPDATE_DATA = 'TN_0104',
    FAILED_DELETE_DATA = 'TN_0105',
    // auth
    FAILED_LOGIN_DATA_INCORRECT = 'TN_0106',
    FAILED_LOGIN_REGISTERED = 'TN_0107',
}
export enum GlobalErrorMessage {
    VALIDATION_ERROR = 'Validation Error',
    FAILED_INSERT_DATA = 'Failed Insert Data',
    FAILED_UPDATE_DATA = 'Failed Update Data',
    FAILED_DELETE_DATA = 'Failed Delete Data',
    // auth
    FAILED_LOGIN_DATA_INCORRECT = 'Email or password incorrect',
    FAILED_LOGIN_REGISTERED = 'Email already registered',
}
