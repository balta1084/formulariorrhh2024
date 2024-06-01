const path = require('path');

// Funcion para enviar los archivos estaticos

function indexHTML(req,res){

    const ruta = path.join(__dirname, '../../public/html/index.html');

    res.sendFile(ruta);

}

module.exports = {

    indexHTML

};