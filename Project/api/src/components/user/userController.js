const { ERROR_CODE_SYSTEM_ERROR } = require("../../helpers/errorCodes");
const { respondItemSuccess, respondWithError } = require("../../helpers/messageResponse");
const { fetchGetListUsers, fetchGetUser, fetchUpdateUser, fetchDeleteUser } = require("./userService");

async function getListUsers(req, res){
    try {
        const credentials = {
            page: req.query ? req.query.page : null,
            limit: req.query ? req.query.limit : null,
            sortTime: req.query ? req.query.sortTime : null,
            name: req.query ? req.query.name : null,
        }
        const result = await fetchGetListUsers(credentials);
        if(result.success) res.end(respondItemSuccess(result.data, result.message))
        else res.end(respondWithError(result.code, result.message, {}))
    } catch (error) {
        res.end(respondWithError(ERROR_CODE_SYSTEM_ERROR, error.message, error))
    }
}

async function getUser(req, res){
    try {
        const credentials = {
            id: req.query ? req.query.id : null,
        }
        const result = await fetchGetUser(credentials);
        if(result.success) res.end(respondItemSuccess(result.data, result.message))
        else res.end(respondWithError(result.code, result.message, {}))
    } catch (error) {
        res.end(respondWithError(ERROR_CODE_SYSTEM_ERROR, error.message, error))
    }
}

async function updateUser(req, res){
    try {
        const credentials = {
            id: req.query ? req.query.id : null,
            phone: req.body ? req.body.phone : null,
            lastname: req.body ? req.body.lastname : null,
            firstname: req.body ? req.body.firstname : null,
            address: req.body ? req.body.address : null,
            password: req.body ? req.body.password : null,
        }
        const result = await fetchUpdateUser(credentials);
        if(result.success) res.end(respondItemSuccess(result.data, result.message))
        else res.end(respondWithError(result.code, result.message, {}))
    } catch (error) {
        res.end(respondWithError(ERROR_CODE_SYSTEM_ERROR, error.message, error))
    }
}

async function deleteUser(req, res){
    try {
        const credentials = {
            id: req.query ? req.query.id : null,
        }
        const result = await fetchDeleteUser(credentials);
        if(result.success) res.end(respondItemSuccess(result.data, result.message))
        else res.end(respondWithError(result.code, result.message, {}))
    } catch (error) {
        res.end(respondWithError(ERROR_CODE_SYSTEM_ERROR, error.message, error))
    }
}

module.exports = {
    getListUsers,
    getUser,
    updateUser,
    deleteUser
}