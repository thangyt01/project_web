const { update, find, create, destroy } = require("../../../database/service");
const { ERROR_CODE_CREDENTIAL_NOT_EXIST, ERROR_CODE_FORBIDDEN, ERROR_CODE_INCORRECT_PASSWORD, ERROR_CODE_SYSTEM_ERROR, ERROR_CODE_ITEM_NOT_EXIST } = require("../../helpers/errorCodes");
const { USERS } = require("../../helpers/message");
const {genPrivateKey} =  require('../../helpers/utils')

async function fetchGetListTotalOrder(query) {
    var {
        page,
        limit,
        orderBy,
        groupBy,
        having,
        asc,
        where,
        ...other
    } = query
    if (having) having = having.split(",")
    if (where) where = where.split(",").join(' and ');

    try {
        if(!groupBy || !having) {
            var data = await find({
                attributes: [],
                table: 'order',
                limit: query.limit || 999,
                where: where,
                orderBy: orderBy || 1
            })
        } else if(groupBy && having) {
            var data = await find({
                attributes: [],
                table: 'order',
                limit: query.limit || 999,
                having: having,
                groupBy: groupBy,
                where: where,
                orderBy: orderby || 1
            })
        }

        return {
            success: true,
            data: data,
            message: USERS['2028']
        }
    } catch (error) {
        return {
            error: true,
            code: ERROR_CODE_SYSTEM_ERROR,
            message: `${e.message}: ${error['message'] || ''}`
        }
    }
}

async function fetchGetOrder(query) {
    try {
        let data = await find({
            attributes: [],
            table: 'order',
            where: `id = '${query.id}`,
        })
        data = data[0]

        if (!data) {
            return {
                error: true,
                code: ERROR_CODE_ITEM_NOT_EXIST,
                message: USERS['2024']
            }
        }
        if (data) {
            return {
                success: true,
                data: data,
                message: USERS['2025']
            }
        }
    } catch (error) {
        return {
            error: true,
            code: ERROR_CODE_SYSTEM_ERROR,
            message: `${error.message}: ${error['message'] || ''}`
        }
    }
}

async function fetchUpdateOrder(req) {
    console.log(req.body)
    let { ...dataUpdate } = req.body
    try {
        await update({
            table: 'order',
            data: dataUpdate,
            where: `id = '${req.query.id}'`,
        })

        return {
            success: true,
            data: {},
            message: USERS['2026']
        }

    } catch (error) {
        return {
            error: true,
            code: ERROR_CODE_SYSTEM_ERROR,
            message: `${error.message}: ${error['message'] || ''}`
        }
    }
}

async function fetchDeleteOrder(query) {
    try {
        await destroy({
            table: 'order',
            where: `id = ${query.id}`
        })
        return {
            success: true,
            data: {},
            message: USERS['2027']
        }
    } catch (error) {
        return {
            error: true,
            code: ERROR_CODE_SYSTEM_ERROR,
            message: `${error.message}: ${error['message'] || ''}`
        }
    }
}
// Uncompleted!!
async function fetchStatsOrder(query) {
    try {
        

        return {
            success: true,
            data: data,
            message: USERS['2029']
        }
    } catch (error) {
        return {
            error: true,
            code: ERROR_CODE_SYSTEM_ERROR,
            message: `${e.message}: ${error['message'] || ''}`
        }
    }
}


module.exports = {
    fetchGetListTotalOrder,
    fetchGetOrder,
    fetchUpdateOrder,
    fetchDeleteOrder,
    fetchStatsOrder
}