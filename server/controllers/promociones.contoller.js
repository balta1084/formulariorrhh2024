const path = require('path');

// Funcion para enviar los archivos estaticos

function promocionesHTML(req,res){

    const ruta = path.join(__dirname, '../../public/html/promociones.html');

    res.sendFile(ruta);

}

module.exports = {

    promocionesHTML

};