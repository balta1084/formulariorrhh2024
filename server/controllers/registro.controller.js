const path = require('path');
const {conectar} = require('../config/db');
const {encrypt} = require('../modulos/funciones')

// Funcion para enviar los archivos estaticos

function registroHTML(req,res){

    const ruta = path.join(__dirname, '../../public/html/registro.html');

    res.sendFile(ruta);

}

function registroJS(req,res){

    const ruta = path.join(__dirname, '../../public/js/registro.js');

    res.sendFile(ruta);

}

async function registrar(req,res){

    const datos = req.body;

    // Validando que esten todos los datos completos

    for(const dato in datos){

        if(datos[dato] == ''){

            return res.status(400).json({message: 'Error: Completa todos los datos por favor'});

        }

    };

    // Validando la cantidad de digitos del DNI

    if(datos.dni.length < 7){

        return res.status(400).json({message: 'Error: El numero es demasiado corto para un DNI'});

    }else if (datos.dni.length > 8){

        return res.status(400).json({message: 'Error: El numero es demasiado largo para un DNI'});

    };

    // Confirmacion de password

    if(datos.pass !== datos.confirmarPass){

        return res.status(400).json({message: 'Error: Las contraseñas no coinciden'});

    };

    //Encriptando la pass
    const hashPassword = await encrypt(datos.pass);

    // Registrando al usuario

    try{

        const pool = await conectar();

        const queryRead = `SELECT mail FROM usuarios WHERE mail = ?`
        const queryRead2 = `SELECT dni FROM usuarios WHERE dni = ?`

        const emails = await pool.query(queryRead, datos.email);

        if(emails[0][0]){

            await pool.end();
            return res.status(409).json({message: 'Este mail o dni ya estan registrado'});

        };

        const dnis = await pool.query(queryRead2, datos.dni);

        if(dnis[0][0]){

            await pool.end();
            return res.status(409).json({message: 'Este mail o dni ya estan registrado'});

        }

        const query = 'INSERT INTO Usuarios (nombre, apellido, dni, mail, password, rol) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [datos.nombre, datos.apellido, datos.dni, datos.email, hashPassword, 'User'];

        await pool.query(query, values);

        await pool.end()
        res.status(201).json({ message: `El email: ${datos.email} se ha registrado correctamente`, href: '/login' });


    }catch(error){

        return res.status(500).json({message: 'Error interno del servidor'});

    }

};

module.exports = {

    registroHTML, registroJS, registrar

};