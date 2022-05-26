const {ERROR_CODE_SYSTEM_ERROR} = require('../../helpers/errorCodes')
const {respondWithError, respondItemSuccess} = require('../../helpers/messageResponse');
const { fetchLogin } = require('./authService');

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

function register(req, res){
    res.end('register')
}

module.exports = {
    login,
    register
}