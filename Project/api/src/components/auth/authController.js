const {ERROR_CODE_SYSTEM_ERROR} = require('../../helpers/errorCodes')
const {respondWithError, respondItemSuccess} = require('../../helpers/messageResponse');
const { fetchLogin, fetchRegister } = require('./authService');

async function login(req, res){
    try {
        const credentials = {
            username: req.body ? req.body.username : null,
            password: req.body ? req.body.password : null
        }
        const result = await fetchLogin(credentials);
        if(result.success) res.end(respondItemSuccess(result.data, result.message))
        else res.end(respondWithError(result.code, result.message, {}))
    } catch (error) {
        res.end(respondWithError(ERROR_CODE_SYSTEM_ERROR, error.message, error))
    }
}

async function register(req, res){
    try {
        const credentials = {
            username: req.body ? req.body.username : null,
            password: req.body ? req.body.password : null,
            re_password: req.body ? req.body.re_password : null,
            email: req.body ? req.body.email : null,
            firstname: req.body ? req.body.firstname : null,
            lastname: req.body ? req.body.lastname : null,
            isAdmin: 0,
        }
        const result = await fetchRegister(credentials);
        if(result.success) res.end(respondItemSuccess(result.data, result.message))
        else res.end(respondWithError(result.code, result.message, {}))
    } catch (error) {
        res.end(respondWithError(ERROR_CODE_SYSTEM_ERROR, error.message, error))
    }
}

module.exports = {
    login,
    register
}