const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const config = {
    host: process.env.HOST_DB,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.NOMBRE_DB,
    connectionLimit: 5
};

const conectar = mysql.createConnection(config)

module.exports = {
    conectar
};