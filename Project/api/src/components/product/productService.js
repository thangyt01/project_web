const { update, find, create, destroy } = require("../../../database/service");
const { ERROR_CODE_CREDENTIAL_NOT_EXIST, ERROR_CODE_FORBIDDEN, ERROR_CODE_INCORRECT_PASSWORD, ERROR_CODE_SYSTEM_ERROR, ERROR_CODE_ITEM_NOT_EXIST, ERROR_CODE_UPLOAD_ERROR } = require("../../helpers/errorCodes");
const { USERS } = require("../../helpers/message");
const { genPrivateKey } = require('../../helpers/utils')


async function fetchGetListProducts(query) {
    // Ví dụ một đường dẫn đầy đủ filter: localhost:8000/api/product/get_list_products?page=0&limit=10&where=price>10000,price<5000000&groupBy=price, discount&having=discount!=0&orderBy=price&asc=1
    let sql_query = {};
    var { page,
        offset,
        limit,
        groupBy,
        having,
        orderBy,
        priceFrom,
        priceTo,
        color,
        ...others
    } = query
    if (page) sql_query.page = page;
    if (limit) sql_query.limit = limit;
    if (offset) sql_query.offset = offset;
    if (groupBy && having) {
        groupBy = groupBy.split(",")
        having = having.split(",")

        sql_query.groupBy = groupBy;
        sql_query.having = having;
    }
    if (orderBy) {
        orderByArr = orderBy.split(",")
        sql_query.orderBy = {};
        sql_query.orderBy[orderByArr[0]] = orderByArr[1];

    }
    sql_query.attributes = ['id', 'name', 'detail', 'descripion', 'price', 'color', 'createdAt']
    // sql_query.includes = [{
    //     attributes: ['path'],
    //     table: 'image',
    //     on: 'product.id = image.product_id',
    //     type: 'inner join'
    // }]
    if (priceFrom && priceTo) {
        sql_query.where = 'price >= ' + priceFrom + ' and price <= ' + priceTo;
        if (color) sql_query.where += ` and color = \'${color}\'`;
    } else if (color) sql_query.where = `color = \'${color}\'`;
    sql_query.table = 'product'


    try {
        let data = await find(sql_query)
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
        for (const i in data) {
            let detail = data[i].detail;
            if (detail) data[i].detail = detail.split("@@@")
            let color = data[i].color;
            if (color) data[i].color = color.split("@@@")
            let descripion = data[i].descripion;
            if (descripion) data[i].descripion = descripion.split("\n  ")

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
            // attributes: ['id', 'name', 'detail', 'descripion', 'price', 'color', 'createdAt'],
            attributes: [],
            table: 'product',
            where: `id = '${query.id}'`,
        })
        if (data.length == 0) {
            return {
                error: true,
                code: ERROR_CODE_ITEM_NOT_EXIST,
                message: USERS['2031']
            }
        }
        let imageData = await find({
            attributes: [],
            table: 'image',
            where: `product_id = '${query.id}'`,
        })
        if (imageData.length == 0) {
            return {
                error: true,
                code: ERROR_CODE_ITEM_NOT_EXIST,
                message: USERS['2032']
            }
        }
        data = data[0]


        if (!data || !imageData) {
            return {
                error: true,
                code: ERROR_CODE_ITEM_NOT_EXIST,
                message: USERS['2021']
            }
        }
        if (data && imageData) {
            let imagePath = [];
            for (i in imageData) {
                imagePath.push(imageData[i].path)
            }
            data.image_path = imagePath;
            let detail = data.detail;
            if (detail) data.detail = detail.split("@@@")
            let color = data.color;
            if (color) data.color = color.split("@@@")
            let descripion = data.descripion;
            if (descripion) data.descripion = descripion.split("\n  ")
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
        let data = await find({
            // attributes: ['id', 'name', 'detail', 'descripion', 'price', 'color', 'createdAt'],
            attributes: [],
            table: 'product',
            where: `id = '${req.query.id}'`,
        })
        if (data.length == 0) {
            return {
                error: true,
                code: ERROR_CODE_ITEM_NOT_EXIST,
                message: USERS['2031']
            }
        }
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
        let data = await find({
            attributes: [],
            table: 'product',
            where: `id = '${query.id}'`,
        })
        if (data.length == 0) {
            return {
                error: true,
                code: ERROR_CODE_ITEM_NOT_EXIST,
                message: USERS['2031']
            }
        }
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

async function fetchCreateProduct(req) {
    // console.log(req.body)
    let { image_path, id, ...data } = req.body
    data.detail = data.detail.join('@@@')
    data.color = data.color.join('@@@')
    data.descripion = data.descripion.join('\n  ')

    try {
        if (data.name.length == 0) {
            // return user not exist
            return {
                error: true,
                code: ERROR_CODE_UPLOAD_ERROR,
                message: USERS['2025'],
            };
        }
        console.log(data.detail.length)
        if (data.detail.length == 0) {
            // return user not exist
            return {
                error: true,
                code: ERROR_CODE_UPLOAD_ERROR,
                message: USERS['2026'],
            };
        }
        if (data.descripion.length == 0) {
            // return user not exist
            return {
                error: true,
                code: ERROR_CODE_UPLOAD_ERROR,
                message: USERS['2027'],
            };
        }
        if (data.price.length == 0) {
            // return user not exist
            return {
                error: true,
                code: ERROR_CODE_UPLOAD_ERROR,
                message: USERS['2028'],
            };
        }
        if (data.color.length == 0) {
            // return user not exist
            return {
                error: true,
                code: ERROR_CODE_UPLOAD_ERROR,
                message: USERS['2029'],
            };
        }
        if (image_path.length == 0) {
            // return user not exist
            return {
                error: true,
                code: ERROR_CODE_UPLOAD_ERROR,
                message: USERS['2030'],
            };
        }
        let dataProduct = await create({
            table: 'product',
            data: data
        })
        const dataID = await find({
            table: 'product',
            attributes: ['id'],
            orderBy: { id: 'desc' },
            limit: 1
        })
        for (let i in image_path) {
            let dataImage = await create({
                table: 'image',
                data: {
                    path: image_path[i],
                    product_id: dataID[0].id
                }
            })
        }
        // console.log(data)
        return {
            success: true,
            data: dataProduct,
            message: USERS['2024']
        }
    } catch (error) {
        return {
            error: true,
            code: ERROR_CODE_SYSTEM_ERROR,
            message: `${error.message}: ${error['message'] || ''}`
        }
    }




    return 1;
}

module.exports = {
    fetchGetListProducts,
    fetchGetProduct,
    fetchUpdateProduct,
    fetchDeleteProduct,
    fetchGetRecommendProduct,
    fetchCreateProduct
}
