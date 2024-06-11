const path = require('path');
const {conectar} = require('../config/db');
const { comparar } = require('../modulos/funciones');

// Funcion para enviar los archivos estaticos

function loginHTML(req,res){

    const ruta = path.join(__dirname, '../../public/html/login.html');

    res.sendFile(ruta);

}

function loginJS(req,res){

    const ruta = path.join(__dirname, '../../public/js/login.js');

    res.sendFile(ruta);

}

async function logIn(req,res){

    const data = req.body;

    if(data.email == ''){

        return res.status(400).json({message:'Por favor ingrese su usuario para ingresar'})

    }

    if(data.pass == ''){

        return res.status(400).json({message:'Por favor ingrese su contraseña para ingresar'})

    }

    try{

        const pool = await conectar();

        const query = `SELECT mail, password FROM usuarios WHERE mail = ?`;

        const resultado = await pool.query(query, data.email);

        await pool.close()

        if(!resultado[0][0]){

            return res.status(400).json({message: 'Usuario o contraseña incorrectos'})

        }

        // Comparando la pass ingresada con la pass encriptada

        const encryptPassword = resultado[0][0].password;

        const verificar = await comparar(data.pass, encryptPassword)

        if(verificar){

            return res.status(200).json({message: `Bienvenido ${data.email}`, href: '/'})

        }else{

            return res.status(400).json({message: 'Usuario o contraseña incorrectos'})

        }


    }catch(error){

        return console.error('Error: ', error)

    }

}

module.exports = {

    loginHTML, loginJS, logIn

};