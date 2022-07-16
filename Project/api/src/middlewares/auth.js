const { find } = require("../../database/service");

async function authenticate(req, res){
    try {
        const auth =  req.headers ? req.headers.authorization : '{}'
        const token =  JSON.parse(auth)
        console.log(token)
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
        return 0
    }
}

async function authenticateV2(req, res){
    try {
        if(!(req.headers && req.headers.authorization)){
            req.user = {}
            return 1
        } 
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
        return 0
    }
}

function authorizationAdmin(req, res){
    try {
        return req.user ? req.user.isAdmin : 0
    } catch (error) {
        return 0
    }
}

function authorizationMyUser(req, res){
    try {
        if(req.user && req.user.isAdmin) return 1
        const id = req.query ? req.query.id : null
        return req.user.id == id
    } catch (error) {
        return 0
    }
}

module.exports = {
    authenticate,
    authorizationAdmin,
    authorizationMyUser,
    authenticateV2
}