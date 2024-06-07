const path = require('path');

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

    const datos = req.body

    console.log(datos)

    res.json({status: 'ok', respuesta:datos})

}

module.exports = {

    registroHTML, registroJS, registrar

};