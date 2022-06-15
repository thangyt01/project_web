const { update, find, create, destroy } = require("../../../database/service");
const { ERROR_CODE_CREDENTIAL_NOT_EXIST, ERROR_CODE_FORBIDDEN, ERROR_CODE_INCORRECT_PASSWORD, ERROR_CODE_SYSTEM_ERROR, ERROR_CODE_ITEM_NOT_EXIST, ERROR_CODE_UPLOAD_ERROR } = require("../../helpers/errorCodes");
const { PRODUCTS } = require("../../helpers/message");
const { genPrivateKey } = require('../../helpers/utils')


async function fetchGetListProducts(query) {
    // Ví dụ một đường dẫn đầy đủ filter: localhost:8000/api/product/get_list_products?page=0&limit=10&where=price>10000,price<5000000&groupBy=price, discount&having=discount!=0&orderBy=price&asc=1
    let sql_query = {};
    var { page = 0,
        sort,
        limit = 16,
        priceFrom,
        priceTo,
        color,
        name,
    } = query
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
        limit,
        offset: page * limit,
        orderBy: 'createdAt desc'

    }
    if (page) sql_query.offset = page * 16;
    if (sort==2) {
        sql_query.orderBy = 'createdAt asc'
    }
    // sql_query.includes = [{
    //     attributes: ['path'],
    //     table: 'image',
    //     on: 'product.id = image.product_id',
    //     type: 'inner join'
    // }]
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
            i.price = i.price.replace('₫', '').replace('₫', '').replace('.', '')
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
        return {
            success: true,
            data: productData,
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
            // attributes: ['id', 'name', 'detail', 'descripion', 'price', 'color', 'createdAt'],
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
    try {
        let data = await find({
            attributes: [],
            table: 'product',
        })
        // console.log(data)
        return {
            success: true,
            data: data,
            message: PRODUCTS['2020']
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
                message: PRODUCTS['2025'],
            };
        }
        console.log(data.detail.length)
        if (data.detail.length == 0) {
            // return user not exist
            return {
                error: true,
                code: ERROR_CODE_UPLOAD_ERROR,
                message: PRODUCTS['2026'],
            };
        }
        if (data.descripion.length == 0) {
            // return user not exist
            return {
                error: true,
                code: ERROR_CODE_UPLOAD_ERROR,
                message: PRODUCTS['2027'],
            };
        }
        if (data.price.length == 0) {
            // return user not exist
            return {
                error: true,
                code: ERROR_CODE_UPLOAD_ERROR,
                message: PRODUCTS['2028'],
            };
        }
        if (data.color.length == 0) {
            // return user not exist
            return {
                error: true,
                code: ERROR_CODE_UPLOAD_ERROR,
                message: PRODUCTS['2029'],
            };
        }
        if (image_path.length == 0) {
            // return user not exist
            return {
                error: true,
                code: ERROR_CODE_UPLOAD_ERROR,
                message: PRODUCTS['2030'],
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
            message: PRODUCTS['2024']
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
