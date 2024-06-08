const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.HOST_DB,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.NOMBRE_DB,
    connectionLimit: 5
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Database connected as ID ' + connection.threadId);
    connection.release(); // Liberar la conexión una vez que esté hecha
});

module.exports = {
    pool
};