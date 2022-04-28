#!/usr/bin/env node

/**
 * Module dependencies.
 */
var http = require('http');
const getRoutes = require('../src/routers');
require('dotenv').config()
const routers = require('../src/routers/routerContant')
/**
 * Get port from environment and store in Express.
 */

var port = process.env.PORT || 8000
// const {} = require('../src/helpers/errorCodes')
/**
 * Create HTTP server.
 */

var server = http.createServer(function (req, res) {
    getRoutes(req, res, routers)
});

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, '0.0.0.0', () => {
    console.log('server listening on port: ', port);
});