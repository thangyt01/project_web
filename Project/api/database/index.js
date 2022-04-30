// get the client
const mysql = require('mysql2');
const config = require('config');

const HOST = config.database ? config.database.host : '';
const USER = config.database ? config.database.user : '';
const DATABASE = config.database ? config.database.database : '';
// create the connection to database
const connection = mysql.createConnection({
    host: HOST,
    user: USER,
    database: DATABASE
});

module.exports = connection;