const { update, find, create, destroy } = require("../../../database/service");
const { ERROR_CODE_SYSTEM_ERROR, ERROR_CODE_ITEM_NOT_EXIST } = require("../../helpers/errorCodes");
const { ORDER } = require("../../helpers/message");
const { orderResponseFormat } = require('./orderConstant')
const moment = require('moment')
const Log = require('../../../hac/util/log')
const log = new Log()

async function fetchGetListTotalOrder(query) {
    try {
        let {
            page = 0,
            limit = 10,
            user,
            status,
            fromDay,
            toDay,
        } = query

        let sql = {
            attributes: [],
            includes: [
                {
                    attributes: ['name'],
                    table: 'product',
                    on: '`order`.product_id = `product`.id',
                    type: 'LEFT JOIN'
                }
            ],
            table: '`order`',
            limit,
            offset: limit * page,
            where: `1 = 1`,
        }
        if (user) {
            sql.where += ` AND (firstname LIKE '%${user}%' OR lastname LIKE '%${user}%' OR phone LIKE '%${user}%') `
        }
        if (status) {
            sql.where += ` AND (status LIKE '${status}')  `
        }
        if (fromDay) sql.where += ` AND createdAt >= ${fromDay} `
        if (toDay) sql.where += ` AND createdAt <= ${toDay} `
        const list_order = await find(sql)
        let rs = []
        for (let e of list_order) {
            const index = rs.findIndex(i => i.order.order_id === e.order_id)
            if (index < 0) {
                rs.push(orderResponseFormat(e))
            } else {
                rs[index].order.detail.push({
                    product_id: e.product_id,
                    name: e.name,
                    color: e.color,
                    quantity: e.quantity,
                    total_cost: e.total_cost
                })
                rs[index].order.total_cost += e.total_cost
            }
        }
        return {
            success: true,
            data: rs,
            message: ORDER['2028']
        }
    } catch (error) {
        log.error('orderService fetchGetListTotalOrder có lỗi khi thực thi', error)
        return {
            error: true,
            code: ERROR_CODE_SYSTEM_ERROR,
            message: `${error.message}: ${error['message'] || ''}`
        }
    }
}

async function fetchGetOrder(req) {
    try {
        let data = await find({
            attributes: [],
            table: '`order`',
            includes: [
                {
                    attributes: ['name'],
                    table: 'product',
                    on: '`order`.product_id = `product`.id',
                    type: 'LEFT JOIN'
                }
            ],
            where: `order_id = '${req.query.id}'`,
        })

        if (data.length < 1) {
            return {
                error: true,
                code: ERROR_CODE_ITEM_NOT_EXIST,
                message: ORDER['2024']
            }
        }

        if (!(req.user.id == data[0].user_id || req.user.isAdmin)) {
            return {
                error: true,
                code: ERROR_CODE_SYSTEM_ERROR,
                message: `Bạn không có quyền truy cập api này`
            }
        }

        let rs = orderResponseFormat(data[0])
        for (let i = 1; i < data.length; i++) {
            rs.order.detail.push({
                product_id: data[i].product_id,
                name: data[i].name,
                color: data[i].color,
                quantity: data[i].quantity,
                total_cost: data[i].total_cost
            })
            rs.order.total_cost += data[i].total_cost
        }

        return {
            success: true,
            data: rs,
            message: ORDER['2025']
        }
    } catch (error) {
        log.error('orderService fetchGetOrder có lỗi khi thực thi', error)
        return {
            error: true,
            code: ERROR_CODE_SYSTEM_ERROR,
            message: `${error.message}: ${error['message'] || ''}`
        }
    }
}
async function fetchGetUserOrder(req) {
    try {
        let data = await find({
            attributes: [],
            table: '`order`',
            includes: [
                {
                    attributes: ['name'],
                    table: 'product',
                    on: '`order`.product_id = `product`.id',
                    type: 'LEFT JOIN'
                }
            ],
            where: `user_id = '${req.user.id}'`,
        })
        product_arr = []
        data.map(item => product_arr.push(item.product_id))
        product_arr = product_arr.join(', ')
        let data_image_path = await find({
            attributes: ["product_id", "max(path)"],
            tableAttributes: 0,
            table: '`image`',
            where: `product_id in (${product_arr})`,
            groupBy: ['product_id']
        })
        data_image_path.map((item) => {
            index = data.findIndex(e => e.product_id === item.product_id)
            data[index].image = item['max(path)']
        })
        if (data.length < 1) {
            return {
                error: true,
                code: ERROR_CODE_ITEM_NOT_EXIST,
                message: ORDER['2024']
            }
        }
        rs = {
            user_id: data[0].user_id,
            firstname: data[0].firstname,
            lastname: data[0].lastname,
            phone: data[0].phone,
            address: data[0].address,
            orders: []
        }
        for (let e of data) {
            const index = rs.orders.findIndex(i => i.order_id === e.order_id)
            if (index < 0) {
                rs.orders.push({
                    status: e.status,
                    order_id: e.order_id,
                    date: e.date,
                    month: e.month,
                    year: e.year,
                    createdAt: e.createdAt,
                    updatedAt: e.updatedAt,
                    total_cost: e.total_cost,
                    detail: [
                        {
                            product_id: e.product_id,
                            image: e.image,
                            name: e.name,
                            quantity: e.quantity,
                            color: e.color,
                            total_cost: e.total_cost,
                        }
                    ]
                })
            } else {
                rs.orders[index].detail.push({
                    product_id: e.product_id,
                    name: e.name,
                    image: e.image,
                    quantity: e.quantity,
                    color: e.color,
                    total_cost: e.total_cost,
                })
                rs.orders[index].total_cost += e.total_cost
            }
        }

        return {
            success: true,
            data: rs,
            message: ORDER['2025']
        }
    } catch (error) {
        log.error('orderService fetchGetUserOrder có lỗi khi thực thi', error)
        return {
            error: true,
            code: ERROR_CODE_SYSTEM_ERROR,
            message: `${error.message}: ${error['message'] || ''}`
        }
    }
}

async function fetchUpdateOrder(req) {
    try {
        let order = await find({
            attributes: [],
            table: '`order`',
            where: `order_id = '${req.query.id}'`,
        })
        if (order.length == 0) return {
            success: true,
            data: {},
            message: ORDER['2024']
        }
        await update({
            table: '`order`',
            data: req.body,
            where: `order_id = '${req.query.id}'`,
        })

        return {
            success: true,
            data: {},
            message: ORDER['2026']
        }

    } catch (error) {
        log.error('orderService fetchUpdateOrder có lỗi khi thực thi', error)
        return {
            error: true,
            code: ERROR_CODE_SYSTEM_ERROR,
            message: `${error.message}: ${error['message'] || ''}`
        }
    }
}

async function fetchDeleteOrder(query) {
    try {
        let order = await find({
            attributes: [],
            table: '`order`',
            where: `order_id = '${query.id}'`,
        })
        if (order.length == 0) return {
            success: true,
            data: {},
            message: ORDER['2024']
        }
        await destroy({
            table: '`order`',
            where: `order_id = ${query.id}`
        })
        return {
            success: true,
            data: {},
            message: ORDER['2027']
        }
    } catch (error) {
        log.error('orderService fetchDeleteOrder có lỗi khi thực thi', error)
        return {
            error: true,
            code: ERROR_CODE_SYSTEM_ERROR,
            message: `${error.message}: ${error['message'] || ''}`
        }
    }
}

async function fetchCreateOrder(credentials) {

    try {
        let order = await find({
            attributes: [],
            table: '`order`',
            // tableAttributes: 0,
            orderBy: 'order_id desc'
        })
        order_id = order[0].order_id
        for (const key of credentials.order) {
            const order_insert = {
                order_id: order_id + 1,
                date: credentials.date,
                month: credentials.month,
                year: credentials.year,
                ...key
            }
            if (credentials.user_id) order_insert.user_id = credentials.user_id
            if (credentials.firstname) order_insert.firstname = credentials.firstname
            if (credentials.lastname) order_insert.lastname = credentials.lastname
            if (credentials.phone) order_insert.phone = credentials.phone
            if (credentials.address) order_insert.address = credentials.address
            // console.log(order_insert)
            await create({
                table: '`order`',
                data: order_insert
            })
        }

        return {
            success: true,
            data: {},
            message: ORDER['2030']
        }
    } catch (error) {
        log.error('orderService fetchCreateOrder có lỗi khi thực thi', error)
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
        let to = moment(toDay).add(1, 'day').format('YYYY-MM-DD')

        let querySql = {
            attributes: ['sum(total_cost) as total_cost', 'sum(quantity) as quantity'],
            table: "`order`",
            tableAttributes: 0,
            where: `createdAt >= '${from}' AND createdAt <= '${to}' AND status != 'Hủy'`,
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
        log.error('orderService fetchCreateOrder có lỗi khi thực thi',  `${e.stack || JSON.stringify(e)}`)
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
    fetchCreateOrder,
    fetchGetUserOrder
}