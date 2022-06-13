#!/usr/bin/env node

/**
 * Module dependencies.
 */
var http = require('http');
const { setBodyRequest, setQueryAndPathNameRequest } = require('../src/app');
const getRoutes = require('../src/routers');
require('dotenv').config()
const routers = require('../src/routers/routerContant')
/**
 * Get port from environment and store in Express.
 */

var port = process.env.PORT || 8000
/**
 * Create HTTP server.
 */
var server = http.createServer(async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    await setBodyRequest(req)
    setQueryAndPathNameRequest(req)
    getRoutes(req, res, routers)
});

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, '0.0.0.0', () => {
    console.log('server listening on port: ', port);
});