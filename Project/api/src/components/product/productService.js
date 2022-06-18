const { update, find, create, destroy } = require("../../../database/service");
const { ERROR_CODE_SYSTEM_ERROR, ERROR_CODE_ITEM_NOT_EXIST, ERROR_CODE_UPLOAD_ERROR } = require("../../helpers/errorCodes");
const { PRODUCTS } = require("../../helpers/message");


async function fetchGetListProducts(query) {
    let sql_query = {};
    var { page = 0,
        sort,
        limit = 16,
        priceFrom,
        priceTo,
        color,
        name,
    } = query
    sort = parseInt(sort, 10)
    sql_query ={
        attributes: ['id', 'name', 'detail', 'descripion', 'price', 'color', 'createdAt'],
        table: 'product',
        includes: [{
            attributes : ['path'],
            table: 'image',
            type: 'left join',
            on: 'product.id = image.product_id',
        }],
        where: '1=1',
        orderBy: 'createdAt desc'

    }
    if (sort==2) {
        sql_query.orderBy = 'createdAt asc'
    }
    if (priceFrom ) {
        sql_query.where += ' and price >= ' + priceFrom
    }
    if (priceTo ) {
        sql_query.where += ' and price <= ' + priceTo
    }
    if (color ) {
        sql_query.where += ` and color like '%${color}%'`
    }
    if (name ) {
        sql_query.where += ` and name like '%${name}%'`
    }
       
    try {
        let data = await find(sql_query)
        productData = []
        for (let i of data) {
            const index = productData.findIndex(e => e.id === i.id);
           if(index < 0){
            i.path = [i.path]
            i.detail = i.detail.split('@@@')
            i.descripion = i.descripion.split('\n')
            i.color = i.color.split('@@@')
            i.price = i.price.replace('₫', '').replace('.', '').replace('₫', '').replace('.', '')
            productData.push(i)
           }else{
            productData[index].path.push(i.path)
           }
            
        }
        if(sort == 3){
            productData.sort((a, b)=> parseInt(a.price.split(' - ')[0])  - parseInt(b.price.split(' - ')[0]))
        }
        if(sort == 4){
            productData.sort((a, b)=> parseInt(b.price.split(' - ')[0])  - parseInt(a.price.split(' - ')[0]))
        }
        let numPage = Math.ceil(productData.length / limit)
        console.log(productData.length)
        productData = productData.slice(page * limit, page * limit + limit)
        return {
            success: true,
            data: {
                numPage,
                productData
            },
            message: PRODUCTS['2020']
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
        if (data.length == 0) {
            return {
                error: true,
                code: ERROR_CODE_ITEM_NOT_EXIST,
                message: PRODUCTS['2031']
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
                message: PRODUCTS['2032']
            }
        }
        data = data[0]


        if (!data || !imageData) {
            return {
                error: true,
                code: ERROR_CODE_ITEM_NOT_EXIST,
                message: PRODUCTS['2021']
            }
        }
        if (data && imageData) {
            let imagePath = [];
            for (i in imageData) {
                imagePath.push(imageData[i].path)
            }
            data.image_path = imagePath;
            data.detail = data.detail.split("@@@")
            data.color = data.color.split("@@@")
            data.price = data.price.replace('₫', '').replace('₫', '').replace('.', '')
            data.descripion = data.descripion.split("\n")
            return {
                success: true,
                data: data,
                message: PRODUCTS['2020']
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
    dataUpdate.updatedBy = req.user.id
    try {
        let data = await find({
            attributes: [],
            table: 'product',
            where: `id = '${req.query.id}'`,
        })
        if (data.length == 0) {
            return {
                error: true,
                code: ERROR_CODE_ITEM_NOT_EXIST,
                message: PRODUCTS['2031']
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
            message: PRODUCTS['2023']
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
                message: PRODUCTS['2031']
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
            message: PRODUCTS['2022']
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
    let type = query.type || 0
    try {
        let sql_query ={
            attributes : ['product_id', "sum(quantity) as 'total_quantity'"],
            limit: query.limit || 4,
            table: '`order`',
            groupBy: ['product_id'],
            tableAttributes: 0,
            orderBy: ` sum(quantity) desc`
        }
        if(type) sql_query.attributes = ['product_id', "sum(total_cost) as 'total_cost'"]
        let listProduct = await find(sql_query)

        sql_query = {
            attributes : [],
            includes: [{
                attributes : ['path'],
                table: 'image',
                type: 'left join',
                on: 'product.id = image.product_id',
            }],
            table: '`product`',
            where: `product.id IN(${listProduct.map(i=>i.product_id).join(', ')})`
        }
        listProduct = []
        let data = await find(sql_query)
        for (let i of data) {
            const index = listProduct.findIndex(e => e.id === i.id);
           if(index < 0){
            i.path = [i.path]
            i.detail = i.detail.split('@@@')
            i.descripion = i.descripion.split('\n')
            i.color = i.color.split('@@@')
            i.price = i.price.replace('₫', '').replace('₫', '').replace('.', '')
            listProduct.push(i)
           }else{
            listProduct[index].path.push(i.path)
           }
            
        }
        return {
            success: true,
            data: listProduct,
            message: PRODUCTS['2020']
        }
    } catch (error) {
        return {
            error: true,
            code: ERROR_CODE_SYSTEM_ERROR,
            message: `${error.message}: ${error['message'] || ''}`
        }
    }
}

async function fetchCreateProduct(req) {
    let { image_path, id, ...data } = req.body
    data.detail = data.detail.join('@@@')
    data.color = data.color.join('@@@')
    data.descripion = data.descripion.join('\n  ')

    try {
        if (data.name.length == 0) {
            return {
                error: true,
                code: ERROR_CODE_UPLOAD_ERROR,
                message: PRODUCTS['2025'],
            };
        }
        if (data.detail.length == 0) {
            return {
                error: true,
                code: ERROR_CODE_UPLOAD_ERROR,
                message: PRODUCTS['2026'],
            };
        }
        if (data.descripion.length == 0) {
            return {
                error: true,
                code: ERROR_CODE_UPLOAD_ERROR,
                message: PRODUCTS['2027'],
            };
        }
        if (data.price.length == 0) {
            return {
                error: true,
                code: ERROR_CODE_UPLOAD_ERROR,
                message: PRODUCTS['2028'],
            };
        }
        if (data.color.length == 0) {
            return {
                error: true,
                code: ERROR_CODE_UPLOAD_ERROR,
                message: PRODUCTS['2029'],
            };
        }
        if (image_path.length == 0) {
            return {
                error: true,
                code: ERROR_CODE_UPLOAD_ERROR,
                message: PRODUCTS['2030'],
            };
        }
        let dataProduct = await create({
            table: 'product',
            data: {createdBy: req.user.id,...data}
        })
        for (let i in image_path) {
            let dataImage = await create({
                table: 'image',
                data: {
                    path: image_path[i],
                    product_id: dataProduct.insertId
                }
            })
        }
        return {
            success: true,
            data: dataProduct,
            message: PRODUCTS['2024']
        }
    } catch (error) {
        return {
            error: true,
            code: ERROR_CODE_SYSTEM_ERROR,
            message: `${error.message}: ${error['message'] || ''}`
        }
    }
}

module.exports = {
    fetchGetListProducts,
    fetchGetProduct,
    fetchUpdateProduct,
    fetchDeleteProduct,
    fetchGetRecommendProduct,
    fetchCreateProduct
}
