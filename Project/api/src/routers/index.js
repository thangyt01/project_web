const { ERROR_CODE_API_NOT_FOUND, ERROR_CODE_UNAUTHORIZED, ERROR_CODE_INVALID_PARAMETER, ERROR_CODE_FORBIDDEN } = require("../helpers/errorCodes");
const { respondWithError } = require("../helpers/messageResponse");

async function getRoutes(req, res, routers){
    let checkApi = 0 //0 không có api nào phù hợp
    for(let router of routers){
        if(router && router.listApi && router.listApi.length > 0){
            for(let api of router.listApi){
                if(req.url === '/api' + router.mainUrl + api.url && req.method === api.method){
                    console.time(`\x1b[37m${req.method}` + " - " + `\x1b[33m${'/api' + router.mainUrl + api.url}` + `  \x1b[32m${''}`)
                    if(api.authenticate && !await api.authenticate(req, res)){
                        res.writeHead(ERROR_CODE_FORBIDDEN, { "Content-Type": "application/json" })
                        res.end(respondWithError(ERROR_CODE_FORBIDDEN, 'Bạn phải đăng nhập vào hệ thống!!', {}))
                        console.timeEnd(`\x1b[37m${req.method}` + " - " + `\x1b[33m${'/api' + router.mainUrl + api.url}` + `  \x1b[32m${''}`)
                        console.log(`\x1b[37m${''}`)
                        return 
                    }
                    if(api.authenticate && !api.authorization(req, res)){
                        res.writeHead(ERROR_CODE_UNAUTHORIZED, { "Content-Type": "application/json" })
                        res.end(respondWithError(ERROR_CODE_UNAUTHORIZED, 'Bạn không có quyền truy cập API này!!', {}))
                        console.timeEnd(`\x1b[37m${req.method}` + " - " + `\x1b[33m${'/api' + router.mainUrl + api.url}` + `  \x1b[32m${''}`)
                        console.log(`\x1b[37m${''}`)
                        return 
                    }
                    if(api.validator && !api.validator(req, res)){
                        res.writeHead(ERROR_CODE_INVALID_PARAMETER, { "Content-Type": "application/json" })
                        res.end(respondWithError(ERROR_CODE_INVALID_PARAMETER, 'Tham số truyền vào không chính xác!!', {}))
                        console.timeEnd(`\x1b[37m${req.method}` + " - " + `\x1b[33m${'/api' + router.mainUrl + api.url}` + `  \x1b[32m${''}`)
                        console.log(`\x1b[37m${''}`)
                        return 
                    }
                    if(api.handle){
                        res.writeHead(ERROR_CODE_INVALID_PARAMETER, { "Content-Type": "application/json" })
                        api.handle(req, res)
                        console.timeEnd(`\x1b[37m${req.method}` + " - " + `\x1b[33m${'/api' + router.mainUrl + api.url}` + `  \x1b[32m${''}`)
                        console.log(`\x1b[37m${''}`)
                        return 
                    }
                }
            }
        }
    }
    if(!checkApi){
        res.writeHead(ERROR_CODE_API_NOT_FOUND, { "Content-Type": "application/json" })
        res.end(respondWithError(ERROR_CODE_API_NOT_FOUND, "API không tồn tại!!", {}))
    } 
}

module.exports = getRoutes