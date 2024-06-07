const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({

    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: '',
    connectionLimit: 5
    

})

module.exports = pool;