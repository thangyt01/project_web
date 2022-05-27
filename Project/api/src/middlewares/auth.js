const { find } = require("../../database/service");

async function authenticate(req, res){
    try {
        const auth =  req.headers ? req.headers.authorization : '{}'
        const token =  JSON.parse(auth)
        let user = await find({
            attributes: ['id', 'username', 'isAdmin', 'firstname', 'lastname', 'address', 'phone', 'email'],
            table: 'user',
            where: `id = ${token.user_id} AND privateKey = ${token.pk}`
        })
        if (!user.length){ // không tìm thấy user nào
            return 0
        }
        req.user = user[0]
        return 1;
        
    } catch (error) {
        console.log(error)
    }
}

function authorizationAdmin(req, res){
    try {
        return req.user ? req.user.isAdmin : 0
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    authenticate,
    authorizationAdmin
}