const bcryptjs = require('bcryptjs');
const dotenv = require('dotenv');
const JsonWebToken = require('jsonwebtoken');
const {conectar} = require('../config/db');


dotenv.config()

// Funcion para encriptar la contraseña de registro
async function encrypt(pass){

    const salt = await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(pass,salt)

    return hashpassword

};

// Funcion para comparar la contraseña ingresada en el login y la contraseña encriptada

async function comparar(pass, passEncrypt){

    const verificar = await bcryptjs.compare(pass, passEncrypt)

    return verificar

}

// Funcion para autenticar al usuario por medio de la cookie

async function verificarUser(req){

    if(!req.headers.cookie){

        return false

    }

    // Se obtiene la cookie del navegador y de allí el mail para buscarlo en la db

    const cookieJWT = req.headers.cookie.split('; ').find(cookie => cookie.startsWith('jwt=')).slice(4);

    const cookieDecodificada = JsonWebToken.verify(cookieJWT,process.env.JWT_SECRET);

    const mail = cookieDecodificada.mail;

    // Me conecto con la db para buscar a ese usuario, si hay resultado retorno un true, sino un false

    const pool = await conectar();

    const query = `SELECT mail FROM usuarios WHERE mail = ?`;

    const busqueda = await pool.query(query, mail);

    await pool.end()

    if(busqueda[0][0]){

        return true

    }else{

        return false

    }

}

async function obtenerIDUser(req){

    if(!req.headers.cookie){
    
        return false

    }
    // Se obtiene la cookie del navegador y de allí el mail para buscarlo en la db

    const cookieJWT = req.headers.cookie.split('; ').find(cookie => cookie.startsWith('jwt=')).slice(4);

    const cookieDecodificada = JsonWebToken.verify(cookieJWT,process.env.JWT_SECRET);

    const mail = cookieDecodificada.mail;

    // Me conecto con la db para buscar a ese usuario, si hay resultado retorno un true, sino un false

    const pool = await conectar();

    const query = `SELECT id FROM usuarios WHERE mail = ?`;

    const busqueda = await pool.query(query, mail);

    const id = busqueda[0][0].id

    await pool.end()

    return id

}

async function obtenerRol(req){

    
    if(!req.headers.cookie){
    
        return false

    }

    // Se obtiene la cookie del navegador y de allí el mail para buscarlo en la db

    const cookieJWT = req.headers.cookie.split('; ').find(cookie => cookie.startsWith('jwt=')).slice(4);

    const cookieDecodificada = JsonWebToken.verify(cookieJWT,process.env.JWT_SECRET);

    const mail = cookieDecodificada.mail;

    // Me conecto con la db para buscar a ese usuario, si hay resultado retorno un true, sino un false

    const pool = await conectar();

    const query = `SELECT rol FROM usuarios WHERE mail = ?`;

    const busqueda = await pool.query(query, mail);

    const rol = busqueda[0][0].rol

    await pool.end()

    return rol

}

module.exports = {

    encrypt, comparar, verificarUser, obtenerIDUser, obtenerRol

}