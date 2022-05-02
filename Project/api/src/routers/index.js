const { ERROR_CODE_API_NOT_FOUND, ERROR_CODE_UNAUTHORIZED, ERROR_CODE_INVALID_PARAMETER } = require("../helpers/errorCodes");
const { respondWithError } = require("../helpers/messageResponse");

async function getRoutes(req, res, routers){
    let checkApi = 0 //0 không có api nào phù hợp
    for(let router of routers){
        if(router && router.listApi && router.listApi.length > 0){
            for(let api of router.listApi){
                if(req.url === '/api' + router.mainUrl + api.url && req.method === api.method){
                    if(api.authenticate && !api.authenticate(req, res)){
                        res.writeHead(ERROR_CODE_UNAUTHORIZED, { "Content-Type": "application/json" })
                        res.end(respondWithError(ERROR_CODE_UNAUTHORIZED, 'Bạn không có quyền truy cập API này!!', {}))
                        return 
                    }
                    if(api.validator && !api.validator(req, res)){
                        res.writeHead(ERROR_CODE_INVALID_PARAMETER, { "Content-Type": "application/json" })
                        res.end(respondWithError(ERROR_CODE_INVALID_PARAMETER, 'Tham số truyền vào không chính xác!!', {}))
                        return 
                    }
                    if(api.handle){
                        res.writeHead(ERROR_CODE_INVALID_PARAMETER, { "Content-Type": "application/json" })
                        api.handle(req, res)
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