const { update, find } = require("../../../database/service");
const { ERROR_CODE_CREDENTIAL_NOT_EXIST, ERROR_CODE_FORBIDDEN } = require("../../helpers/errorCodes");
const { USERS } = require("../../helpers/message");
const {genPrivateKey} =  require('../../helpers/utils')

async function fetchLogin(credentials) {
    try {
        let { username, password } = credentials;

        let user = await find({
            attributes: [],
            table: 'user',
            where: `username = '${username}'`,
        })
        if (!user) {
            // return user not exist
            return {
                error: true,
                code: ERROR_CODE_FORBIDDEN,
                message: USERS['2000'],
            };
        }
        
        if (!user.deletedAt) {
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
            fullName: user.firstName + user.lastName,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone ? user.phone : null,
            birthday: user.birthday,
            gender: user.gender,
            pk: user.pk,
            isAdmin: user.isAdmin
        };

        return {
            success: true,
            data: {
                pk: pk,
                profile,
            },
            message: USERS['2013']
        }
    } catch (e) {
        logger.error(`authService fetchLogin Dang nhap bang username (SDT) : ${e.stack || JSON.stringify(e)}`);
        const { errors = [] } = e;
        const [error = {}] = errors;
        return {
            error: true,
            code: ERROR_CODE_SYSTEM_ERROR,
            message: `${e.message}: ${_.get(error, 'message', '')}`
        }
    }
}
    

module.exports = {
    fetchLogin
}