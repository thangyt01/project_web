const querystring = require('querystring');
const url = require('url');

async function setBodyRequest(req){
    let data;
    await req.on('data', chunk => {
        data = chunk
    });
    req.body = JSON.parse(data.toString());
}

function setQueryAndPathNameRequest(req){
    const parsed = url.parse(req.url);
    const query  = querystring.parse(parsed.query);
    req.url = parsed.pathname;
    req.query = query;
}

module.exports = {
    setBodyRequest,
    setQueryAndPathNameRequest
}