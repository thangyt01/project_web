const { ERROR_CODE_SYSTEM_ERROR } = require('../../helpers/errorCodes')
const { respondWithError, respondItemSuccess } = require('../../helpers/messageResponse');
const { fetchGetListProducts, fetchGetProduct, fetchUpdateProduct, fetchDeleteProduct, fetchGetRecommendProduct } = require('./productService');

async function getListProducts(req, res) {
    let query = req.query;
    try {
        const results = await fetchGetListProducts(query);
        if (results.success) res.end(respondItemSuccess(results.data, results.message))
        else res.end(respondWithError(results.code, results.message, {}))

    } catch (error) {
        res.end(respondWithError(ERROR_CODE_SYSTEM_ERROR, error.message, error))
    }
}

async function getProduct(req, res) {
    let query = req.query;
    try {
        const results = await fetchGetProduct(query);
        if (results.success) res.end(respondItemSuccess(results.data, results.message))
        else res.end(respondWithError(results.code, results.message, {}))

    } catch (error) {
        res.end(respondWithError(ERROR_CODE_SYSTEM_ERROR, error.message, error))
    }
}

async function updateProduct(req, res) {
    try {
        const results = await fetchUpdateProduct(req);
        if (results.success) res.end(respondItemSuccess(results.data, results.message))
        else res.end(respondWithError(results.code, results.message, {}))

    } catch (error) {
        res.end(respondWithError(ERROR_CODE_SYSTEM_ERROR, error.message, error))
    }
}

async function deleteProduct(req, res) {
    let query = req.query;
    try {
        const results = await fetchDeleteProduct(query);
        if (results.success) res.end(respondItemSuccess(results.data, results.message))
        else res.end(respondWithError(results.code, results.message, {}))

    } catch (error) {
        res.end(respondWithError(ERROR_CODE_SYSTEM_ERROR, error.message, error))
    }
}

async function getRecommendProduct(req, res) {
    let query = req.query;
    try {
        const results = await fetchGetRecommendProduct(query);
        if (results.success) res.end(respondItemSuccess(results.data, results.message))
        else res.end(respondWithError(results.code, results.message, {}))

    } catch (error) {
        res.end(respondWithError(ERROR_CODE_SYSTEM_ERROR, error.message, error))
    }
}


module.exports = {
    getListProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    getRecommendProduct
}