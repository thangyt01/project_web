const { update, find, create, destroy } = require("../../../database/service");
const { ERROR_CODE_SYSTEM_ERROR, ERROR_CODE_ITEM_NOT_EXIST } = require("../../helpers/errorCodes");
const { ORDER } = require("../../helpers/message");
const moment = require('moment')

async function fetchGetListTotalOrder(query) {
    try {
        let {
            page = 0,
            limit = 10,
            user,
            productName,
            productId,
            fromDay,
            toDay,
        } = query

        let sql = {
            attributes: [],
            table: '`order`',
            limit,
            offset: limit * page,
            where: `1 = 1`,
        }
        if (user) {
            sql.where += ` AND (firstname LIKE '%${user}%' OR lastname LIKE '%${user}%' OR phone LIKE '%${user}%') `
        }
        if (productName) {
            const listProduct = await find({
                attributes: [],
                table: 'product',
                where: `name LIKE '${productName}'`,
            })
            if (listProduct.length > 0) sql.where += ` AND product_id IN(${listProduct.map(i => i.id).join(',')}) `
        }
        if(productId) sql.where += ` AND product_id = ${productId} `
        if(fromDay) sql.where += ` AND createdAt >= ${fromDay} `
        if(toDay) sql.where += ` AND createdAt <= ${toDay} `
        const result = await find(sql)
        return {
            success: true,
            data: result,
            message: ORDER['2028']
        }
    } catch (error) {
        return {
            error: true,
            code: ERROR_CODE_SYSTEM_ERROR,
            message: `${error.message}: ${error['message'] || ''}`
        }
    }
}

async function fetchGetOrder(query) {
    try {
        let data = await find({
            attributes: [],
            table: '`order`',
            where: `id = '${query.id}'`,
        })

        if (data.length < 1) {
            return {
                error: true,
                code: ERROR_CODE_ITEM_NOT_EXIST,
                message: ORDER['2024']
            }
        }

        data = data[0]

        return {
            success: true,
            data: data,
            message: ORDER['2025']
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
    try {
        await update({
            table: '`order`',
            data: req.body,
            where: `id = '${req.query.id}'`,
        })

        return {
            success: true,
            data: {},
            message: ORDER['2026']
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
            table: '`order`',
            where: `id = ${query.id}`
        })
        return {
            success: true,
            data: {},
            message: ORDER['2027']
        }
    } catch (error) {
        return {
            error: true,
            code: ERROR_CODE_SYSTEM_ERROR,
            message: `${error.message}: ${error['message'] || ''}`
        }
    }
}

async function fetchCreateOrder(credentials) {
    try {
        await create({
            table: '`order`',
            data: {user_id: credentials.user.id || null,...credentials.body}
        })
        return {
            success: true,
            data: {},
            message: ORDER['2030']
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
/**
 * 
 * @param {*} query = {fromDay, toDay, type}
 * fromDay, toDay dạng YYYY-MM-DD
 * type = 1 thống kê theo ngày
 * type = 2 thống kê theo tháng
 * type = 3 thống kê theo năm
 * @returns 
 */
async function fetchStatsOrder(query) {
    try {
        let {
            fromDay,
            toDay,
            type = 2
        } = query
        let from = moment(fromDay).format('YYYY-MM-DD')
        let to = moment(toDay).format('YYYY-MM-DD')

        let querySql = {
            attributes: ['sum(total_cost) as total_cost', 'sum(quantity) as quantity'],
            table: "`order`",
            tableAttributes: 0,
            where: `createdAt >= '${from}' AND createdAt <= '${to}'`,
            groupBy: [],
        }

        if (type == 1) {
            querySql.groupBy = ['date', 'month', 'year']
            querySql.attributes = [...querySql.attributes, 'date', 'month', 'year']
        }
        if (type == 2) {
            querySql.groupBy = ['month', 'year']
            querySql.attributes = [...querySql.attributes, 'month', 'year']
        }
        if (type == 3) {
            querySql.groupBy = ['year']
            querySql.attributes = [...querySql.attributes, 'year']
        }

        const result = await find(querySql)

        return {
            success: true,
            data: result,
            message: ORDER['2029']
        }
    } catch (e) {
        const { errors = [] } = e;
        const [error = {}] = errors;
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
    fetchStatsOrder,
    fetchCreateOrder
}