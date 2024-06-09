const path = require('path');
const {conectar} = require('../config/db');

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

    // Registrando al usuario

    try{

        const pool = await conectar;

        const query = 'INSERT INTO Usuarios (nombre, apellido, dni, mail, password) VALUES (?, ?, ?, ?, ?)';
        const values = [datos.nombre, datos.apellido, datos.dni, datos.email, datos.pass];

        await pool.query(query, values);

        await pool.end()
        res.json({ message: `El email: ${datos.email} se ha registrado correctamente` });


    }catch(error){

        return res.status(500).json({message: 'Error interno del servidor'});

    }

};

module.exports = {

    registroHTML, registroJS, registrar

};