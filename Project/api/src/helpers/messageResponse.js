const { ERROR_CODE_SUCCESS } = require('./errorCodes');

function respondItemSuccess(data, message = 'Success') {
    return JSON.stringify({
        code: ERROR_CODE_SUCCESS,
        message,
        data,
    });
}

function respondArraySuccess(data, totalItem, message = 'Success') {
    return JSON.stringify({
        code: ERROR_CODE_SUCCESS,
        message,
        data,
        totalItem,
    });
}

function respondWithError(errorCode, message = 'Error', data = {}) {
    return JSON.stringify({
        code: errorCode,
        message,
        errors: data,
    });
}

module.exports = {
    respondItemSuccess,
    respondArraySuccess,
    respondWithError
}