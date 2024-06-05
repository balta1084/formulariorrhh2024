const path = require('path');

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

    const data = req.body

    return res.json({status: 'ok', respuesta: `Ingresaste: ${data.email} ${data.pass}, funcion en construccion`})

}

module.exports = {

    loginHTML, loginJS, logIn

};