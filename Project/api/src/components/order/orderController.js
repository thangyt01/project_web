const {ERROR_CODE_SYSTEM_ERROR} = require('../../helpers/errorCodes')
const {respondWithError, respondItemSuccess} = require('../../helpers/messageResponse')
const { fetchGetListTotalOrder, fetchGetOrder, fetchUpdateOrder, fetchDeleteOrder, fetchStatsOrder, fetchCreateOrder } = require('./orderService')

async function getListTotalOrder(req, res) {
    let query = req.query;
    try {
        const results = await fetchGetListTotalOrder(query);
        if(results.success) res.end(respondItemSuccess(results.data, results.message))
        else res.end(respondWithError(results.code, results.message, {}))
    } catch (error) {
        res.end(respondWithError(ERROR_CODE_SYSTEM_ERROR, error.message, error))
    }
}

async function getOrder(req, res) {
    let query = req.query;
    try {
        const results = await fetchGetOrder(query);
        if(results.success) res.end(respondItemSuccess(results.data, results.message))
        else res.end(respondWithError(results.code, results.message, {}))
    } catch (error) {
        res.end(respondWithError(ERROR_CODE_SYSTEM_ERROR, error.message, error))
    }
}

async function updateOrder(req, res) {
    try {
        const results = await fetchUpdateOrder(req);
        if(results.success) res.end(respondItemSuccess(results.data, results.message))
        else res.end(respondWithError(results.code, results.message, {}))
    } catch (error) {
        res.end(respondWithError(ERROR_CODE_SYSTEM_ERROR, error.message, error))
    }
}

async function deleteOrder(req, res) {
    let query = req.query;
    try {
        const results = await fetchDeleteOrder(query);
        if(results.success) res.end(respondItemSuccess(results.data, results.message))
        else res.end(respondWithError(results.code, results.message, {}))
    } catch (error) {
        res.end(respondWithError(ERROR_CODE_SYSTEM_ERROR, error.message, error))
    }
}

async function statsOrder(req, res) {
    let query = req.query;
    try {
        const results = await fetchStatsOrder(query);
        if(results.success) res.end(respondItemSuccess(results.data, results.message))
        else res.end(respondWithError(results.code, results.message, {}))
    } catch (error) {
        res.end(respondWithError(ERROR_CODE_SYSTEM_ERROR, error.message, error))
    }
}

async function createOrder(req, res) {
    try {
        const results = await fetchCreateOrder(req.body);
        if(results.success) res.end(respondItemSuccess(results.data, results.message))
        else res.end(respondWithError(results.code, results.message, {}))
    } catch (error) {
        res.end(respondWithError(ERROR_CODE_SYSTEM_ERROR, error.message, error))
    }
}

module.exports = {
    getListTotalOrder,
    getOrder,
    updateOrder,
    deleteOrder,
    statsOrder,
    createOrder
}