const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

function conectar(){

    try{

        const config = {
            host: process.env.HOST_DB,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.NOMBRE_DB,
            connectionLimit: 5
        };
    
        const conectar = mysql.createConnection(config)
    
        return conectar

    }catch(error){

        console.error('Error al conectar a la base de datos:', error);
        throw error;

    }

}


module.exports = {
    conectar
};