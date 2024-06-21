const path = require('path');
const {verificarUser, obtenerRol} = require('../modulos/funciones');
const JsonWebToken = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Funcion para enviar los archivos estaticos

function cssGeneral(req,res){

    const ruta = path.join(__dirname, '../../public/css/index.css');

    res.sendFile(ruta);

};

function carritoJS(req,res){

    const ruta = path.join(__dirname, '../../public/js/carrito.js');

    res.sendFile(ruta);

};

function menuJS(req,res){

    const ruta = path.join(__dirname, '../../public/js/menu.js');
    
    res.sendFile(ruta);

};

function verificarJS(req,res){

    const ruta = path.join(__dirname, '../../public/js/verificar.js');

    res.sendFile(ruta);

}

async function verificar(req,res){

    const autenticar = await verificarUser(req);

    const rol = await obtenerRol(req);

    if(autenticar){

        const cookie = req.headers.cookie.split('; ').find(cookie => cookie.startsWith('jwt=')).slice(4);

        const decodificar = JsonWebToken.verify(cookie,process.env.JWT_SECRET);

        return res.json({auth: autenticar, nombre: decodificar.nombre, rol: rol})

    }

    return res.json({auth: autenticar, rol: rol})

}

module.exports = {

    cssGeneral, carritoJS, menuJS,verificar, verificarJS

};