const { update, find, create, destroy } = require("../../../database/service");
const { ERROR_CODE_CREDENTIAL_NOT_EXIST, ERROR_CODE_FORBIDDEN, ERROR_CODE_INCORRECT_PASSWORD, ERROR_CODE_SYSTEM_ERROR, ERROR_CODE_ITEM_NOT_EXIST } = require("../../helpers/errorCodes");
const { USERS } = require("../../helpers/message");
const { genPrivateKey } = require('../../helpers/utils')


async function fetchGetListProducts(query) {
    // Ví dụ một đường dẫn đầy đủ filter: localhost:8000/api/product/get_list_products?page=0&limit=10&where=price>10000,price<5000000&groupBy=price, discount&having=discount!=0&orderBy=price&asc=1
    var { page,
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
    // console.log(page)
    // console.log(limit)
    // console.log(orderBy)
    // console.log(groupBy)
    // console.log(having)
    // console.log(asc)
    // console.log(where)

    try {
        if (!groupBy || !having) {
            var data = await find({
                attributes: [],
                table: 'product',
                limit: query.limit || 999,
                where: where,
                orderBy: orderBy || 1
            })
        } else if (groupBy && having) {
            var data = await find({
                attributes: [],
                table: 'product',
                limit: query.limit || 999,
                having: having,
                groupBy: groupBy,
                where: where,
                orderBy: orderBy || 1
            })
        }

        for (const i in data) {
            var imageArr = []
            let imageData = await find({
                attributes: [],
                table: 'image',
                where: `product_id = '${data[i].id}'`
            })
            for (const j in imageData) {
                imageArr = [imageData[j].path, ...imageArr]
            }
            data[i].image_path = imageArr
        }

        return {
            success: true,
            data: data,
            message: USERS['2020']
        }
    } catch (error) {
        return {
            error: true,
            code: ERROR_CODE_SYSTEM_ERROR,
            message: `${error.message}: ${error['message'] || ''}`
        }
    }
}

async function fetchGetProduct(query) {
    try {
        let data = await find({
            attributes: [],
            table: 'product',
            where: `id = '${query.id}'`,
        })
        let imageData = await find({
            attributes: [],
            table: 'image',
            where: `product_id = '${query.id}'`,
        })

        data = data[0]
        imageData = imageData[0]

        if (!data || !imageData) {
            return {
                error: true,
                code: ERROR_CODE_ITEM_NOT_EXIST,
                message: USERS['2021']
            }
        }
        if (data && imageData) {
            data.image_path = imageData.path;
            return {
                success: true,
                data: data,
                message: USERS['2020']
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

async function fetchUpdateProduct(req) {
    console.log(req.body)
    let { image_path, ...dataUpdate } = req.body

    try {
        await update({
            table: 'product',
            data: dataUpdate,
            where: `id = '${req.query.id}'`,
        })

        if (image_path) await update({
            table: 'image',
            data: { path: image_path },
            where: `id = '${req.query.id}'`,
        })
        return {
            success: true,
            data: {},
            message: USERS['2023']
        }
    } catch (error) {
        return {
            error: true,
            code: ERROR_CODE_SYSTEM_ERROR,
            message: `${error.message}: ${error['message'] || ''}`
        }
    }
}

async function fetchDeleteProduct(query) {
    try {
        await destroy({
            table: 'image',
            where: `product_id = ${query.id}`
        })

        await destroy({
            table: 'product',
            where: `id = ${query.id}`
        })
        return {
            success: true,
            data: {},
            message: USERS['2022']
        }
    } catch (error) {
        return {
            error: true,
            code: ERROR_CODE_SYSTEM_ERROR,
            message: `${error.message}: ${error['message'] || ''}`
        }
    }
}

async function fetchGetRecommendProduct(query) {
    try {
        let data = await find({
            attributes: [],
            table: 'product',
        })
        // console.log(data)
        return {
            success: true,
            data: data,
            message: USERS['2020']
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
    fetchGetListProducts,
    fetchGetProduct,
    fetchUpdateProduct,
    fetchDeleteProduct,
    fetchGetRecommendProduct
}