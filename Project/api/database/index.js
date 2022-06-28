// get the client
const mysql = require('mysql2');
const config = require('config');

const HOST = config.database ? config.database.host : 'localhost';
const USER = config.database ? config.database.user : 'root';
const DATABASE = config.database ? config.database.database : 'mysql';
const PASSWORD = config.database ? config.database.password : '';
// create the connection to database
const connection = mysql.createConnection({
    host: HOST,
    user: USER,
    database: DATABASE,
    password: PASSWORD
});

module.exports = connection;