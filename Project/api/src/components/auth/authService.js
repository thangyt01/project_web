const { update, find, create } = require("../../../database/service");
const { ERROR_CODE_CREDENTIAL_NOT_EXIST, ERROR_CODE_FORBIDDEN, ERROR_CODE_INCORRECT_PASSWORD, ERROR_CODE_SYSTEM_ERROR } = require("../../helpers/errorCodes");
const { USERS } = require("../../helpers/message");
const {genPrivateKey} =  require('../../helpers/utils')
const Log = require('../../../hac/util/log')
const log = new Log()

async function fetchLogin(credentials) {
    try {
        let { username, password } = credentials;

        let user = await find({
            attributes: [],
            table: 'user',
            where: `username = '${username}'`,
            // logging: true
        })
        if (user.length === 0) {
            // return user not exist
            return {
                error: true,
                code: ERROR_CODE_FORBIDDEN,
                message: USERS['2000'],
            };
        }

        user = user[0]

        if (user.deletedAt) {
            return {
                error: true,
                code: ERROR_CODE_CREDENTIAL_NOT_EXIST,
                message: USERS['2015'],
            };
        }
        if (password !== user.password) {
            // return password not correct
            return {
                error: true,
                code: ERROR_CODE_INCORRECT_PASSWORD,
                message: USERS['2007'],
            };
        }

        //sign private key

        const pk = genPrivateKey(user.id)

        update({
            table: 'user',
            data: {
                'privateKey': pk
            },
            where: `id = ${user.id}`
        })

        const profile = {
            id: user.id,
            username: user.username,
            email: user.email ? user.email : null,
            fullName: user.firstname + " " + user.lastname,
            firstName: user.firstname,
            lastName: user.lastname,
            phone: user.phone ? user.phone : null,
            pk: user.pk,
            isAdmin: user.isAdmin,
            address: user.address,
            lastLogin: user.lastLogin
        };

        return {
            success: true,
            data: {
                token: {
                    pk,
                    user_id: user.id
                },
                profile,
            },
            message: USERS['2008']
        }
    } catch (e) {
        log.error(`authService fetchLogin Dang nhap bang username (SDT) : ${e.stack || JSON.stringify(e)}`);
        const { errors = [] } = e;
        const [error = {}] = errors;
        return {
            error: true,
            code: ERROR_CODE_SYSTEM_ERROR,
            message: `${e.message}: ${error['message'] || ''}`
        }
    }
}

async function fetchRegister(credentials) {
    try {
        let { 
            username,
            password,
            re_password,
            ...rest
        } = credentials;

        let user = await find({
            attributes: [],
            table: 'user',
            where: `username = '${username}'`,
            // logging: true
        })

        if (user.length > 0) {
            // return user not exist
            return {
                error: true,
                code: ERROR_CODE_FORBIDDEN,
                message: USERS['2017'],
            };
        }

        if (password !== re_password) {
            return {
                error: true,
                code: ERROR_CODE_INCORRECT_PASSWORD,
                message: USERS['2010'],
            };
        }

        await create({
            table: 'user',
            data: {
                username: username,
                password: password,
                ...rest
            },
        })

        return {
            success: true,
            data: {},
            message: USERS['2019']
        }
    } catch (e) {
        log.error(`authService fetchRegister Dang ky : ${e.stack || JSON.stringify(e)}`);
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
    fetchLogin,
    fetchRegister
}