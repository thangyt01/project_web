const { update, find, destroy} = require("../../../database/service");
const { ERROR_CODE_SYSTEM_ERROR, ERROR_CODE_ITEM_NOT_EXIST, ERROR_CODE_OLD_PASSWORD_NOT_CORRECT } = require("../../helpers/errorCodes");
const { USERS } = require("../../helpers/message");
const Log = require('../../../hac/util/log')
const log = new Log()

async function fetchGetListUsers(credentials) {
    let { 
        page = 0,
        limit = 10,
        sortTime = 0,
        name
    } = credentials

    try {
        let query = {
            attributes: [],
            table: 'user',
            limit: limit,
            offset: page,
            orderBy: `createdAt ASC`
        }
        if(!sortTime){
            query.orderBy = `createdAt DESC`
        }
        if(name){
            query.where = `lastname LIKE '%${name}%' or firstname LIKE '%${name}%'`
        }
            
        var data = await find(query) 

        return {
            success: true,
            data: data,
            message: USERS['2024']
        }
    } catch(error){
        log.error('userService fetchGetListUsers có lỗi khi thực thi', error)
        return {
            error: true,
            code: ERROR_CODE_SYSTEM_ERROR,
            message: `${error.message}: ${error['message'] || ''}`
        }
    }
}

async function fetchGetUser(credentials) {
    try {
        let { id } = credentials
        let data = await find({
            attributes: [],
            table: 'user',
            where: `id = '${id}'`,
        })
        
        if(data.length < 1){
            return {
                error: true,
                code: ERROR_CODE_ITEM_NOT_EXIST,
                message: USERS['2015']
            }
        }
        data = data[0]

        return{
            success: true,
            data: data,
            message: USERS['2024']
        }
    } catch (error) {
        log.error('userService fetchGetUser có lỗi khi thực thi', error)
        return {
            error: true,
            code:ERROR_CODE_SYSTEM_ERROR,
            message: `${error.message}: ${error['message'] || ''}`
        }
    }
}

async function fetchUpdateUser(credentials) {
    let { 
        id,
        phone,
        lastname,
        firstname,
        address, 
        password,
        re_password,
        old_password,
    } = credentials

    try {
        let user = await find({
            attributes: [],
            table: 'user',
            where: `id = '${id}'`,
        })

        if(user.length < 1){
            return {
                error: true,
                code: ERROR_CODE_ITEM_NOT_EXIST,
                message: USERS['2015']
            }
        }

        let data = {}
        if(phone && phone != ''){
            data.phone = phone
        }
        if(lastname && lastname != ''){
            data.lastname = lastname
        }
        if(firstname && firstname != ''){
            data.firstname = firstname
        }
        if(address && address != ''){
            data.address = address
        }
        if(password && password != ''){
            if(old_password != user[0].password){
                return {
                    error:true,
                    code: ERROR_CODE_OLD_PASSWORD_NOT_CORRECT,
                    message: `Mật khẩu cũ không đúng.`
                }
            }
            if(password != re_password){
                return {
                    error:true,
                    code: ERROR_CODE_OLD_PASSWORD_NOT_CORRECT,
                    message: `Mật khẩu mới không trùng khớp.`
                }
            }
            data.password = password
        }
        await update ({
            table: 'user',
            data: data,
            where: `id = '${id}'`
        })

        return {
            success: true,
            data: {},
            message: 'Cập nhật thông tin người dùng thành công'
        }
    } catch(error) {
        log.error('userService fetchUpdateUser có lỗi khi thực thi', error)
        return {
            error:true,
            code: ERROR_CODE_SYSTEM_ERROR,
            message: `${error.message}: ${error['message'] || ''}`
        }
    }
}

async function fetchDeleteUser(credentials) {
    let{
        id
    } = credentials
    try {
        let findUser = await find({
            table: 'user',
            where: `id = ${id}`
        })
        if (findUser.length < 1){
            return {
                success: true,
                data: {},
                message: USERS['2015']
            }
        }
        await destroy({
        table: 'user',
        where: `id = ${id}`
        })  
        return {
            success: true,
            data: {},
            message: 'Xóa tài khoản thành công'
        }
        
    } catch(error) {
        log.error('userService fetchDeleteUser có lỗi khi thực thi', error)
        return {
            error: true,
            code: ERROR_CODE_SYSTEM_ERROR,
            message: `${error.message}: ${error['message'] || ''}`
        }
    }
}

module.exports = {
    fetchGetListUsers,
    fetchGetUser,
    fetchUpdateUser,
    fetchDeleteUser
}