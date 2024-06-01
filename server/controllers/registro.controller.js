const path = require('path');

// Funcion para enviar los archivos estaticos

function registroHTML(req,res){

    const ruta = path.join(__dirname, '../../public/html/registro.html');

    res.sendFile(ruta);

}

module.exports = {

    registroHTML

};